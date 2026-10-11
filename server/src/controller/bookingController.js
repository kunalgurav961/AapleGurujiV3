import bookingModel from "../model/bookingModel.js";
import leadModel from "../model/leadModel.js";
import pujaModel from "../model/pujaModel.js";
import { generateBookingReference } from "../utils/otp.js";
import { sendBookingConfirmationEmail, sendAdminNotificationEmail } from "../config/email.js";

export const createBooking = async (req, res) => {
  try {
    const {
      name,
      mobile,
      email,
      pujaId,
      samagriOption,
      scheduledDate,
      scheduledTime,
      address,
      city,
      pincode,
      notes,
    } = req.body;

    if (!name || !mobile || !email || !pujaId || !samagriOption) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided",
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

    const puja = await pujaModel.findById(pujaId);
    if (!puja) {
      return res.status(404).json({
        success: false,
        message: "Puja not found",
      });
    }

    if (!puja.availability?.active) {
      return res.status(400).json({
        success: false,
        message: "This puja is currently not available for booking",
      });
    }

    const activePackage = puja.packages?.find((pkg) => pkg.active);
    if (!activePackage) {
      return res.status(400).json({
        success: false,
        message: "No active package available for this puja",
      });
    }

    const basePrice = activePackage.price;
    const samagriPrice = samagriOption === "with_samagri" && activePackage.includesSamagri ? 0 : 0;
    const totalPrice = basePrice + samagriPrice;

    // Check if email is verified
    const lead = await leadModel.findOne({ email });
    if (lead && !lead.isEmailVerified) {
      return res.status(400).json({
        success: false,
        message: "Please verify your email before booking",
      });
    }

    const bookingReference = generateBookingReference();



    const booking = await bookingModel.create({
      bookingReference,
      leadId: lead?._id,
      pujaId,
      customerName: name,
      mobile,
      email,
      samagriOption,
      basePrice,
      samagriPrice,
      totalPrice,
      currency: activePackage.currency || "INR",
      status: "pending",
      emailVerified: !!lead?.emailVerifiedAt,
      scheduledDate: scheduledDate ? new Date(scheduledDate) : undefined,
      scheduledTime,
      address,
      city,
      pincode,
      notes,
    });

    if (lead) {
      lead.funnelStage = "booking_submitted";
      lead.bookingReference = bookingReference;
      lead.bookingSubmittedAt = new Date();
      lead.lastActivityAt = new Date();
      await lead.save();
    }

    const pujaName = puja.name?.en || puja.name;

    const confirmationEmailResult = await sendBookingConfirmationEmail(email, {
      bookingReference,
      pujaName,
      totalPrice,
      createdAt: booking.createdAt,
    });

    if (confirmationEmailResult.success) {
      booking.confirmationEmailSent = true;
      await booking.save();
    }

    const adminNotificationResult = await sendAdminNotificationEmail(
      {
        name,
        email,
        mobile,
        pujaName,
      },
      {
        bookingReference,
        pujaName,
        samagriOption,
        totalPrice,
        status: booking.status,
      }
    );

    if (adminNotificationResult.success) {
      booking.adminNotificationSent = true;
      await booking.save();
    }

    res.status(201).json({
      success: true,
      message: "Booking created successfully",
      data: {
        bookingReference,
        pujaName,
        totalPrice,
        status: booking.status,
      },
    });
  } catch (error) {
    console.error("Error in createBooking:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getBookingByReference = async (req, res) => {
  try {
    const { reference } = req.params;

    const booking = await bookingModel
      .findOne({ bookingReference: reference })
      .populate("pujaId")
      .populate("leadId");

    if (!booking) {
      return res.status(404).json({
        success: false,
        message: "Booking not found",
      });
    }

    res.status(200).json({
      success: true,
      data: booking,
    });
  } catch (error) {
    console.error("Error in getBookingByReference:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const calculatePrice = async (req, res) => {
  try {
    const { pujaId, samagriOption } = req.body;

    if (!pujaId || !samagriOption) {
      return res.status(400).json({
        success: false,
        message: "Puja ID and samagri option are required",
      });
    }

    const puja = await pujaModel.findById(pujaId);

    if (!puja) {
      return res.status(404).json({
        success: false,
        message: "Puja not found",
      });
    }

    // Find the package based on samagri option
    const includesSamagri = samagriOption === "with_samagri";
    const selectedPackage = puja.packages?.find(
      (pkg) => pkg.active && pkg.includesSamagri === includesSamagri
    );

    if (!selectedPackage) {
      return res.status(400).json({
        success: false,
        message: "No active package available for this selection",
      });
    }

    const basePrice = selectedPackage.price;
    const samagriPrice = 0; // Samagri is included in the package price
    const totalPrice = basePrice + samagriPrice;

    res.status(200).json({
      success: true,
      data: {
        basePrice,
        samagriPrice,
        totalPrice,
        currency: selectedPackage.currency || "INR",
        packageName: selectedPackage.name?.en || selectedPackage.name,
      },
    });
  } catch (error) {
    console.error("Error in calculatePrice:", error);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
