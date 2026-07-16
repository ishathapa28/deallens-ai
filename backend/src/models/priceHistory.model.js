import mongoose from "mongoose";

const priceHistorySchema = new mongoose.Schema(
  {
    offer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Offer",
      required: [true, "Offer reference is required"],
      index: true,
    },

    price: {
      type: Number,
      required: [true, "Price is required"],
      min: [0, "Price cannot be negative"],
    },

    deliveryCharge: {
      type: Number,
      min: [0, "Delivery charge cannot be negative"],
      default: 0,
    },

    totalCost: {
      type: Number,
      required: [true, "Total cost is required"],
      min: [0, "Total cost cannot be negative"],
    },

    availability: {
      type: String,
      enum: ["in-stock", "out-of-stock", "unknown"],
      default: "unknown",
    },

    recordedAt: {
      type: Date,
      default: Date.now,
      index: true,
    },
  },
  {
    timestamps: true,
  }
);

priceHistorySchema.index({offer: 1, recordedAt: -1,});

const PriceHistory = mongoose.model( "PriceHistory", priceHistorySchema);

export default PriceHistory;