import mongoose from "mongoose";

const priceAlertSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
      index: true,
    },

    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: [true, "Product reference is required"],
      index: true,
    },

    targetPrice: {
      type: Number,
      required: [true, "Target price is required"],
      min: [0, "Target price cannot be negative"],
    },

    isActive: {
      type: Boolean,
      default: true,
      index: true,
    },

    isTriggered: {
      type: Boolean,
      default: false,
    },

    triggeredAt: {
      type: Date,
      default: null,
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

priceAlertSchema.index(
  {
    user: 1,
    product: 1,
  },
  {
    unique: true,
  }
);

const PriceAlert = mongoose.model("PriceAlert", priceAlertSchema);

export default PriceAlert;