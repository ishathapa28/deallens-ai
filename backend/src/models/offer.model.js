import mongoose from "mongoose";

const offerSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
      index: true,
    },

    marketplace: {
      type: String,
      required: [true, "Marketplace is required"],
      enum: ["amazon", "flipkart", "myntra", "ajio", "croma", "reliance-digital",],
      index: true,
    },

    sourceUrl: {
      type: String,
      required: [true, "Offer URL is required"],
      trim: true,
    },

    currentPrice: {
      type: Number,
      min: [0, "Current price cannot be negative"],
      default: null,
    },

    originalPrice: {
      type: Number,
      min: [0, "Original price cannot be negative"],
      default: null,
    },

    deliveryCharge: {
      type: Number,
      min: [0, "Delivery charge cannot be negative"],
      default: 0,
    },

    rating: {
      type: Number,
      min: [0, "Rating cannot be below zero"],
      max: [5, "Rating cannot exceed five"],
      default: null,
    },

    reviewCount: {
      type: Number,
      min: [0, "Review count cannot be negative"],
      default: 0,
    },

    availability: {
      type: String,
      enum: ["in-stock", "out-of-stock", "unknown"],
      default: "unknown",
    },

    analysisStatus: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
      index: true,
    },

    lastCheckedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

offerSchema.index(
  {
    marketplace: 1,
    sourceUrl: 1,
  },
  {
    unique: true,
  }
);

const Offer = mongoose.model("Offer", offerSchema);

export default Offer;