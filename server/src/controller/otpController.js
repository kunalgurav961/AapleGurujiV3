import otpModel from "../model/otpModel.js";
import leadModel from "../model/leadModel.js";
import { generateOTP, hashOTP, verifyOTP } from "../utils/otp.js";
import { sendOTPEmail } from "../config/email.js";
import { updateLeadFunnelStage } from "./leadController.js";

const OTP_EXPIRY_MINUTES = parseInt(process.env.OTP_EXPIRY_MINUTES || "5");
const MAX_OTP_ATTEMPTS = parseInt(process.env.MAX_OTP_ATTEMPTS || "3");
const OTP_RESEND_COOLDOWN_SECONDS = parseInt(process.env.OTP_RESEND_COOLDOWN_SECONDS || "60");

export const requestOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const recentOTP = await otpModel.findOne({
      email,
      createdAt: { $gte: new Date(Date.now() - OTP_RESEND_COOLDOWN_SECONDS * 1000) },
    });

    if (recentOTP) {
      return res.status(429).json({
        success: false,
        message: `Please wait ${OTP_RESEND_COOLDOWN_SECONDS} seconds before requesting another OTP`,
      });
    }

    await otpModel.deleteMany({ email, verified: false });

    const otp = generateOTP();
    const otpHash = await hashOTP(otp);
    const expiresAt = new Date(Date.now() + OTP_EXPIRY_MINUTES * 60 * 1000);

    await otpModel.create({
      email,
      otpHash,
      expiresAt,
    });

    const emailResult = await sendOTPEmail(email, otp);

    if (!emailResult.success) {
      return res.status(500).json({
        success: false,
        message: "Failed to send OTP email",
      });
    }

    try {
      await updateLeadFunnelStage({ body: { email, stage: "otp_sent" } }, { status: () => {} });
    } catch (err) {
      console.error("Error updating lead stage:", err);
    }

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error in requestOTP:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const verifyOTPCode = async (req, res) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      return res.status(400).json({
        success: false,
        message: "Email and OTP are required",
      });
    }

    const otpRecord = await otpModel.findOne({
      email,
      verified: false,
      expiresAt: { $gt: new Date() },
    });

    if (!otpRecord) {
      return res.status(400).json({
        success: false,
        message: "Invalid or expired OTP",
      });
    }

    if (otpRecord.attempts >= MAX_OTP_ATTEMPTS) {
      await otpModel.deleteOne({ _id: otpRecord._id });
      return res.status(400).json({
        success: false,
        message: "Maximum OTP attempts exceeded. Please request a new OTP",
      });
    }

    const isValid = await verifyOTP(otp, otpRecord.otpHash);

    if (!isValid) {
      otpRecord.attempts += 1;
      await otpRecord.save();

      return res.status(400).json({
        success: false,
        message: `Invalid OTP. ${MAX_OTP_ATTEMPTS - otpRecord.attempts} attempts remaining`,
      });
    }

    otpRecord.verified = true;
    otpRecord.verifiedAt = new Date();
    await otpRecord.save();

    await otpModel.deleteMany({ email, _id: { $ne: otpRecord._id } });

    // Update lead's isEmailVerified to true
    try {
      const lead = await leadModel.findOne({ email });
      if (lead) {
        lead.isEmailVerified = true;
        lead.emailVerifiedAt = new Date();
        lead.funnelStage = "email_verified";
        lead.lastActivityAt = new Date();
        await lead.save();
      }
    } catch (err) {
      console.error("Error updating lead verification status:", err);
    }

    res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error in verifyOTPCode:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
