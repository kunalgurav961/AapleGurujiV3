import mongoose from "mongoose";
import bookingModel from "../model/bookingModel.js";
import leadModel from "../model/leadModel.js";
import pujaModel from "../model/pujaModel.js";

const FUNNEL_STAGES = new Set([
  "details_submitted",
  "otp_sent",
  "email_verified",
  "booking_submitted",
  "abandoned",
]);

const SAMAGRI_FIELDS = [
  "includedWithPackage",
  "customerArrangedChecklist",
  "householdRequirements",
];

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const mobileRegex = /^[6-9]\d{9}$/;

const normalizeText = (value) => (typeof value === "string" ? value.trim() : "");

const normalizeStringList = (items) => {
  if (!Array.isArray(items)) return null;

  return [
    ...new Set(
      items
        .filter((item) => typeof item === "string")
        .map((item) => item.trim())
        .filter(Boolean),
    ),
  ];
};

const validateLeadFields = (values, { requireAll = false } = {}) => {
  const update = {};

  for (const field of ["name", "mobile", "email"]) {
    if (values[field] === undefined) continue;
    update[field] = normalizeText(values[field]);
  }

  if (requireAll && (!update.name || !update.mobile || !update.email)) {
    return { error: "Name, mobile, and email are required" };
  }

  if (update.email && !emailRegex.test(update.email)) {
    return { error: "Invalid email format" };
  }

  if (update.mobile && !mobileRegex.test(update.mobile)) {
    return { error: "Invalid mobile number" };
  }

  if (values.funnelStage !== undefined) {
    if (!FUNNEL_STAGES.has(values.funnelStage)) {
      return { error: "Invalid funnel stage" };
    }
    update.funnelStage = values.funnelStage;
  }

  if (values.isEmailVerified !== undefined) {
    if (typeof values.isEmailVerified !== "boolean") {
      return { error: "Email verification status must be true or false" };
    }
    update.isEmailVerified = values.isEmailVerified;
    update.emailVerifiedAt = values.isEmailVerified ? new Date() : undefined;
  }

  return { update };
};

const normalizeSamagri = (samagri) => {
  if (!samagri || typeof samagri !== "object") {
    return { error: "Samagri data is required" };
  }

  const normalized = {};

  for (const field of SAMAGRI_FIELDS) {
    if (!Array.isArray(samagri[field])) {
      return { error: `${field} must be an array` };
    }

    normalized[field] = normalizeStringList(samagri[field]);
  }

  return { samagri: normalized };
};

const validatePujaFields = (values, { requireAll = false } = {}) => {
  const payload = {};
  const name = values.name || {};

  if (values.slug !== undefined) payload.slug = normalizeText(values.slug).toLowerCase();
  if (values.category !== undefined) payload.category = normalizeText(values.category);
  if (values.displayOrder !== undefined) {
    const displayOrder = Number(values.displayOrder);
    if (!Number.isInteger(displayOrder) || displayOrder < 0) {
      return { error: "Display order must be a non-negative integer" };
    }
    payload.displayOrder = displayOrder;
  }

  if (values.name !== undefined) {
    payload.name = {
      en: normalizeText(name.en),
      mr: normalizeText(name.mr),
    };
  }

  for (const field of ["shortDescription", "description"]) {
    if (values[field] !== undefined) {
      payload[field] = {
        en: normalizeText(values[field]?.en),
        mr: normalizeText(values[field]?.mr),
      };
    }
  }

  if (values.images !== undefined) {
    if (typeof values.images !== "object") {
      return { error: "Images must be an object" };
    }
    const gallery = normalizeStringList(values.images.gallery || []);
    if (!gallery) return { error: "Image gallery must be an array" };
    payload.images = {
      thumbnail: normalizeText(values.images.thumbnail),
      gallery,
    };
  }

  for (const field of ["benefits", "serviceHighlights", "packages"]) {
    if (values[field] === undefined) continue;
    if (!Array.isArray(values[field])) {
      return { error: `${field} must be an array` };
    }
    payload[field] = field === "packages" ? values[field] : normalizeStringList(values[field]);
  }

  if (values.availability !== undefined) {
    if (typeof values.availability !== "object" || typeof values.availability.active !== "boolean") {
      return { error: "Availability must include an active true/false value" };
    }
    const locations = normalizeStringList(values.availability.locations || []);
    if (!locations) return { error: "Availability locations must be an array" };
    payload.availability = { active: values.availability.active, locations };
  }

  if (requireAll && (!payload.slug || !payload.name?.en || !payload.name?.mr || !payload.category)) {
    return { error: "Slug, English name, Marathi name, and category are required" };
  }

  return { payload };
};

export const getAdminUsers = async (req, res) => {
  try {
    const users = await leadModel.find().sort({ createdAt: -1 }).lean();

    res.status(200).json({ success: true, data: users });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to load users" });
  }
};

export const getAdminPujas = async (req, res) => {
  try {
    const pujas = await pujaModel.find().sort({ displayOrder: 1, "name.en": 1 }).lean();
    res.status(200).json({ success: true, data: pujas });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to load pujas" });
  }
};

export const createAdminPuja = async (req, res) => {
  try {
    const { payload, error } = validatePujaFields(req.body, { requireAll: true });
    if (error) return res.status(400).json({ success: false, message: error });

    const existingPuja = await pujaModel.findOne({ slug: payload.slug });
    if (existingPuja) {
      return res.status(409).json({ success: false, message: "A Puja with this slug already exists" });
    }

    const puja = await pujaModel.create({
      _id: new mongoose.Types.ObjectId().toString(),
      ...payload,
      samagri: {
        includedWithPackage: [],
        customerArrangedChecklist: [],
        householdRequirements: [],
      },
      availability: payload.availability || { active: true, locations: [] },
      packages: payload.packages || [],
    });

    res.status(201).json({ success: true, data: puja });
  } catch (error) {
    const status = error?.code === 11000 ? 409 : 500;
    const message = status === 409 ? "A Puja with this slug already exists" : "Unable to create Puja";
    res.status(status).json({ success: false, message });
  }
};

export const updateAdminPuja = async (req, res) => {
  try {
    const { payload, error } = validatePujaFields(req.body);
    if (error) return res.status(400).json({ success: false, message: error });
    if (!Object.keys(payload).length) {
      return res.status(400).json({ success: false, message: "No editable Puja fields were provided" });
    }

    const puja = await pujaModel.findById(req.params.id);
    if (!puja) return res.status(404).json({ success: false, message: "Puja not found" });

    if (payload.slug && payload.slug !== puja.slug) {
      const duplicate = await pujaModel.findOne({ slug: payload.slug, _id: { $ne: puja._id } });
      if (duplicate) {
        return res.status(409).json({ success: false, message: "A Puja with this slug already exists" });
      }
    }

    Object.assign(puja, payload);
    await puja.save();
    res.status(200).json({ success: true, data: puja });
  } catch (error) {
    const status = error?.code === 11000 ? 409 : 500;
    const message = status === 409 ? "A Puja with this slug already exists" : "Unable to update Puja";
    res.status(status).json({ success: false, message });
  }
};

export const deleteAdminPuja = async (req, res) => {
  try {
    const puja = await pujaModel.findById(req.params.id);
    if (!puja) return res.status(404).json({ success: false, message: "Puja not found" });

    const bookingCount = await bookingModel.countDocuments({ pujaId: req.params.id });
    if (bookingCount) {
      return res.status(409).json({
        success: false,
        message: "Pujas with bookings cannot be deleted",
      });
    }

    await puja.deleteOne();
    res.status(200).json({ success: true, message: "Puja deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to delete Puja" });
  }
};

export const createAdminUser = async (req, res) => {
  try {
    const { update, error } = validateLeadFields(req.body, { requireAll: true });
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const existingUser = await leadModel.findOne({ email: update.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "A user with this email already exists",
      });
    }

    const user = await leadModel.create({
      ...update,
      funnelStage: update.funnelStage || "details_submitted",
      isEmailVerified: update.isEmailVerified || false,
    });

    res.status(201).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to create user" });
  }
};

export const updateAdminUser = async (req, res) => {
  try {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const { update, error } = validateLeadFields(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    if (!Object.keys(update).length) {
      return res.status(400).json({ success: false, message: "No editable fields were provided" });
    }

    const user = await leadModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    if (update.email && update.email !== user.email) {
      const duplicate = await leadModel.findOne({ email: update.email, _id: { $ne: user._id } });
      if (duplicate) {
        return res.status(409).json({
          success: false,
          message: "A user with this email already exists",
        });
      }
    }

    Object.assign(user, update, { lastActivityAt: new Date() });
    await user.save();

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to update user" });
  }
};

export const deleteAdminUser = async (req, res) => {
  try {
    if (!mongoose.isObjectIdOrHexString(req.params.id)) {
      return res.status(400).json({ success: false, message: "Invalid user ID" });
    }

    const user = await leadModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const bookingCount = await bookingModel.countDocuments({ leadId: user._id });
    if (bookingCount) {
      return res.status(409).json({
        success: false,
        message: "Users with bookings cannot be deleted",
      });
    }

    await user.deleteOne();
    res.status(200).json({ success: true, message: "User deleted" });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to delete user" });
  }
};

export const getAdminSamagri = async (req, res) => {
  try {
    const pujas = await pujaModel
      .find({}, { name: 1, slug: 1, availability: 1, samagri: 1 })
      .sort({ displayOrder: 1, "name.en": 1 })
      .lean();

    res.status(200).json({ success: true, data: pujas });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to load samagri" });
  }
};

export const updateAdminSamagri = async (req, res) => {
  try {
    const { samagri, error } = normalizeSamagri(req.body.samagri);
    if (error) {
      return res.status(400).json({ success: false, message: error });
    }

    const puja = await pujaModel.findByIdAndUpdate(
      req.params.id,
      { $set: { samagri } },
      { new: true, runValidators: true },
    );

    if (!puja) {
      return res.status(404).json({ success: false, message: "Puja not found" });
    }

    res.status(200).json({ success: true, data: puja });
  } catch (error) {
    res.status(500).json({ success: false, message: "Unable to update samagri" });
  }
};
