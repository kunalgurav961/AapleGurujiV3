import rateLimit from "express-rate-limit";

const isDevelopment = process.env.NODE_ENV !== "production";

export const otpRateLimiter = rateLimit({
  windowMs: isDevelopment ? 1 * 60 * 1000 : 15 * 60 * 1000, // 1 min dev, 15 min prod
  max: isDevelopment ? 20 : 5, // 20 requests dev, 5 requests prod
  message: {
    success: false,
    message: "Too many OTP requests, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const leadRateLimiter = rateLimit({
  windowMs: isDevelopment ? 10 * 60 * 1000 : 60 * 60 * 1000, // 10 min dev, 1 hour prod
  max: isDevelopment ? 50 : 10, // 50 requests dev, 10 requests prod
  message: {
    success: false,
    message: "Too many lead submissions, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

export const bookingRateLimiter = rateLimit({
  windowMs: isDevelopment ? 10 * 60 * 1000 : 60 * 60 * 1000, // 10 min dev, 1 hour prod
  max: isDevelopment ? 20 : 5, // 20 requests dev, 5 requests prod
  message: {
    success: false,
    message: "Too many booking attempts, please try again later",
  },
  standardHeaders: true,
  legacyHeaders: false,
});
