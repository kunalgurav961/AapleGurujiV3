import express from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { getPuja, getPujaById } from "../controller/appController.js";
import {
  createOrUpdateLead,
  updateLeadFunnelStage,
  markLeadAsAbandoned,
} from "../controller/leadController.js";
import { requestOTP, verifyOTPCode } from "../controller/otpController.js";
import { createBooking, getBookingByReference, calculatePrice } from "../controller/bookingController.js";
import { otpRateLimiter, leadRateLimiter, bookingRateLimiter } from "../middleware/rateLimiter.js";
import adminRouter from "../router/adminRouter.js";

const app = express();

// ── Security & parsing middleware (MUST be before routes) ──
app.use(helmet());
app.use(compression());
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);
app.use(express.json({ limit: "1mb" }));
app.use(express.urlencoded({ extended: false, limit: "1mb" }));

// ── Health check ──
app.get("/", (req, res) => {
  res.send("Server is reachable");
});

// ── Puja routes ──
app.get("/api/pujas", getPuja);
app.get("/api/pujas/:id", getPujaById);

// ── Lead routes ──
app.post("/api/leads", leadRateLimiter, createOrUpdateLead);
app.patch("/api/leads/stage", updateLeadFunnelStage);
app.post("/api/leads/abandon", markLeadAsAbandoned);

// ── OTP routes ──
app.post("/api/otp/request", otpRateLimiter, requestOTP);
app.post("/api/otp/verify", otpRateLimiter, verifyOTPCode);

// ── Booking routes ──
app.post("/api/bookings", bookingRateLimiter, createBooking);
app.get("/api/bookings/:reference", getBookingByReference);
app.post("/api/bookings/calculate-price", calculatePrice);

// ── Admin routes ──
app.use("/api/admin", adminRouter);

// ── Global error handler (Express 5 forwards rejected promises here) ──
app.use((err, req, res, next) => {
  console.error("Unhandled error:", err);
  const statusCode = err.status || err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message:
      process.env.NODE_ENV === "production"
        ? "An unexpected error occurred"
        : err.message || "Internal Server Error",
  });
});

export default app;
