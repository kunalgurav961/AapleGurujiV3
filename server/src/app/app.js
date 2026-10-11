import express from "express";
import cors from "cors";
import { getPuja, getPujaById } from "../controller/appController.js";
import {
  createOrUpdateLead,
  updateLeadFunnelStage,
  markLeadAsAbandoned,
} from "../controller/leadController.js";
import { requestOTP, verifyOTPCode } from "../controller/otpController.js";
import { createBooking, getBookingByReference, calculatePrice } from "../controller/bookingController.js";
import { otpRateLimiter, leadRateLimiter, bookingRateLimiter } from "../middleware/rateLimiter.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is reachable");
});

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  }),
);

app.get("/api/pujas", getPuja);
app.get("/api/pujas/:id", getPujaById);

app.post("/api/leads", leadRateLimiter, createOrUpdateLead);
app.patch("/api/leads/stage", updateLeadFunnelStage);
app.post("/api/leads/abandon", markLeadAsAbandoned);

app.post("/api/otp/request", otpRateLimiter, requestOTP);
app.post("/api/otp/verify", otpRateLimiter, verifyOTPCode);

app.post("/api/bookings", bookingRateLimiter, createBooking);
app.get("/api/bookings/:reference", getBookingByReference);
app.post("/api/bookings/calculate-price", calculatePrice);

export default app;
