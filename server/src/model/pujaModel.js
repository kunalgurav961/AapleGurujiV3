import mongoose from "mongoose";

const pujaSchema = new mongoose.Schema(
  {
    // Existing Puja records use string IDs. Declaring this explicitly prevents
    // Mongoose from casting route IDs to ObjectId values during findById().
    _id: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },

    name: {
      en: { type: String, required: true, trim: true },
      mr: { type: String, required: true, trim: true },
    },

    category: {
      type: String,
      required: true,
      trim: true,
    },

    shortDescription: {
      en: { type: String, default: "" },
      mr: { type: String, default: "" },
    },

    description: {
      en: { type: String, default: "" },
      mr: { type: String, default: "" },
    },

    benefits: [{ type: String, trim: true }],

    serviceHighlights: [{ type: String, trim: true }],

    images: {
      thumbnail: { type: String, default: "" },
      gallery: [{ type: String }],
    },

    samagri: {
      includedWithPackage: [{ type: String }],
      customerArrangedChecklist: [{ type: String }],
      householdRequirements: [{ type: String }],
    },

    packages: [
      {
        id: { type: String, required: true },
        name: {
          en: { type: String, required: true },
          mr: { type: String, default: "" },
        },
        price: { type: Number, required: true, min: 0 },
        currency: { type: String, default: "INR" },
        includesSamagri: { type: Boolean, required: true },
        advanceAmount: { type: Number, default: 0, min: 0 },
        advanceDeductedFromTotal: { type: Boolean, default: true },
        features: [{ type: String }],
        active: { type: Boolean, default: true },
      },
    ],

    booking: {
      advanceAmount: { type: Number, default: 0, min: 0 },
      advanceDeductedFromTotal: { type: Boolean, default: true },
      consultationAvailable: { type: Boolean, default: true },
      contactChannels: [{ type: String }],
    },

    availability: {
      active: { type: Boolean, default: true },
      locations: [{ type: String }],
    },

    displayOrder: { type: Number, default: 0 },
  },
  { timestamps: true },
);

const pujaModel = mongoose.model("pujas", pujaSchema);
export default pujaModel;
