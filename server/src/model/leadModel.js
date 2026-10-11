import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    mobile: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    pujaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pujas",
    },
    isEmailVerified: {
      type: Boolean,
      default: false,
    },
    funnelStage: {
      type: String,
      enum: ["details_submitted", "otp_sent", "email_verified", "booking_submitted", "abandoned"],
      default: "details_submitted",
    },
    otpSentAt: {
      type: Date,
    },
    emailVerifiedAt: {
      type: Date,
    },
    bookingSubmittedAt: {
      type: Date,
    },
    lastActivityAt: {
      type: Date,
      default: Date.now,
    },
    bookingReference: {
      type: String,
    },
    notificationSent: {
      type: Boolean,
      default: false,
    },
    notificationSentAt: {
      type: Date,
    },
    notificationAttempts: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

leadSchema.index({ email: 1 });
leadSchema.index({ funnelStage: 1 });
leadSchema.index({ createdAt: 1 });

const leadModel = mongoose.model("leads", leadSchema);
export default leadModel;
