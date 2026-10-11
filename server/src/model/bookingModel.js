import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    bookingReference: {
      type: String,
      required: true,
      unique: true,
    },
    leadId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "leads",
    },
    pujaId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "pujas",
      required: true,
    },
    customerName: {
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
    samagriOption: {
      type: String,
      enum: ["with_samagri", "without_samagri"],
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    samagriPrice: {
      type: Number,
      default: 0,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      default: "INR",
    },
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "completed"],
      default: "pending",
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid", "failed"],
      default: "pending",
    },
    emailVerified: {
      type: Boolean,
      default: false,
    },
    scheduledDate: {
      type: Date,
    },
    scheduledTime: {
      type: String,
    },
    address: {
      type: String,
    },
    city: {
      type: String,
    },
    pincode: {
      type: String,
    },
    notes: {
      type: String,
    },
    confirmationEmailSent: {
      type: Boolean,
      default: false,
    },
    adminNotificationSent: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);


bookingSchema.index({ email: 1 });
bookingSchema.index({ mobile: 1 });
bookingSchema.index({ pujaId: 1 });
bookingSchema.index({ status: 1 });
bookingSchema.index({ createdAt: 1 });

const bookingModel = mongoose.model("bookings", bookingSchema);
export default bookingModel;
