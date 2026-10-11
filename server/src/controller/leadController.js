import leadModel from "../model/leadModel.js";
import pujaModel from "../model/pujaModel.js";
import { sendAdminNotificationEmail } from "../config/email.js";

export const createOrUpdateLead = async (req, res) => {
  try {
    const { name, mobile, email, pujaId } = req.body;

    if (!name || !mobile || !email) {
      return res.status(400).json({
        success: false,
        message: "Name, mobile, and email are required",
      });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: "Invalid email format",
      });
    }

    const mobileRegex = /^[6-9]\d{9}$/;
    if (!mobileRegex.test(mobile)) {
      return res.status(400).json({
        success: false,
        message: "Invalid mobile number (must be 10 digits starting with 6-9)",
      });
    }

    let pujaName = null;
    if (pujaId) {
      const puja = await pujaModel.findById(pujaId);
      if (puja) {
        pujaName = puja.name?.en || puja.name;
      }
    }

    const existingLead = await leadModel.findOne({ email });

    if (existingLead) {
      existingLead.name = name;
      existingLead.mobile = mobile;
      existingLead.pujaId = pujaId || existingLead.pujaId;
      existingLead.funnelStage = "details_submitted";
      existingLead.lastActivityAt = new Date();
      await existingLead.save();

      res.status(200).json({
        success: true,
        message: "Lead updated successfully",
        data: {
          ...existingLead.toObject(),
          needsVerification: !existingLead.isEmailVerified,
        },
      });
    } else {
      const lead = await leadModel.create({
        name,
        mobile,
        email,
        pujaId,
        funnelStage: "details_submitted",
        isEmailVerified: false,
      });

      const notificationResult = await sendAdminNotificationEmail({
        name,
        email,
        mobile,
        pujaName,
        funnelStage: "details_submitted",
        createdAt: lead.createdAt,
      });

      if (notificationResult.success) {
        lead.notificationSent = true;
        lead.notificationSentAt = new Date();
        await lead.save();
      } else {
        lead.notificationAttempts += 1;
        await lead.save();
      }

      res.status(201).json({
        success: true,
        message: "Lead created successfully",
        data: {
          ...lead.toObject(),
          needsVerification: !lead.isEmailVerified,
        },
      });
    }
  } catch (error) {
    console.error("Error in createOrUpdateLead:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const updateLeadFunnelStage = async (req, res) => {
  try {
    const { email, stage } = req.body;

    if (!email || !stage) {
      return res.status(400).json({
        success: false,
        message: "Email and stage are required",
      });
    }

    const lead = await leadModel.findOne({ email });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    lead.funnelStage = stage;
    lead.lastActivityAt = new Date();

    if (stage === "otp_sent") {
      lead.otpSentAt = new Date();
    } else if (stage === "email_verified") {
      lead.emailVerifiedAt = new Date();
      lead.isEmailVerified = true;
    } else if (stage === "booking_submitted") {
      lead.bookingSubmittedAt = new Date();
    }

    await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead stage updated successfully",
      data: lead,
    });
  } catch (error) {
    console.error("Error in updateLeadFunnelStage:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const markLeadAsAbandoned = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        success: false,
        message: "Email is required",
      });
    }

    const lead = await leadModel.findOne({ email });

    if (!lead) {
      return res.status(404).json({
        success: false,
        message: "Lead not found",
      });
    }

    if (lead.funnelStage !== "booking_submitted") {
      lead.funnelStage = "abandoned";
      lead.lastActivityAt = new Date();
      await lead.save();
    }

    res.status(200).json({
      success: true,
      message: "Lead marked as abandoned",
      data: lead,
    });
  } catch (error) {
    console.error("Error in markLeadAsAbandoned:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
