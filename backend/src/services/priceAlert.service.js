import Product from "../models/product.model.js";
import Offer from "../models/offer.model.js";
import PriceAlert from "../models/priceAlert.model.js";
import AppError from "../utils/AppError.js";

const createOrUpdatePriceAlert = async ({userId,productId,targetPrice,}) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const alert = await PriceAlert.findOneAndUpdate(
    {
      user: userId,
      product: productId,
    },
    {
      targetPrice,
      isActive: true,
      isTriggered: false,
      triggeredAt: null,
    },
    {
      new: true,
      upsert: true,
      runValidators: true,
    }
  );

  return alert;
};

const getUserPriceAlerts = async (userId) => {
  const alerts = await PriceAlert.find({
    user: userId,
  })
    .populate(
      "product",
      "title brand modelNumber imageUrl"
    )
    .sort({
      createdAt: -1,
    });

  return alerts;
};

const deletePriceAlert = async ({userId, alertId,}) => {
  const alert = await PriceAlert.findOneAndDelete({_id: alertId, user: userId,});

  if (!alert) {
    throw new AppError("Price alert not found", 404);
  }

  return alert;
};

const checkPriceAlert = async (alertId) => {
  const alert = await PriceAlert.findById(alertId);

  if (!alert) {
    throw new AppError("Price alert not found", 404);
  }

  if (!alert.isActive) {
    return {
      alert,
      bestOffer: null,
      triggered: false,
      message: "Price alert is inactive",
    };
  }

  const offers = await Offer.find({
    product: alert.product,
    analysisStatus: "completed",
    availability: {
      $ne: "out-of-stock",
    },
    currentPrice: {
      $ne: null,
    },
  }).lean();

  let bestOffer = null;

  for (const offer of offers) {
    const deliveryCharge = typeof offer.deliveryCharge === "number" ? offer.deliveryCharge : 0;

    const totalCost = offer.currentPrice + deliveryCharge;

    if (!bestOffer || totalCost < bestOffer.totalCost) {
      bestOffer = {...offer, totalCost,};
    }
  }

  const triggered = bestOffer !== null && bestOffer.totalCost <= alert.targetPrice;

  alert.lastCheckedAt = new Date();

  if (triggered) {
    alert.isTriggered = true;
    alert.isActive = false;
    alert.triggeredAt = new Date();
  }

  await alert.save();

  return {
    alert,
    bestOffer,
    triggered,
    message: triggered ? "Target price reached" : "Target price not reached",
  };
};

export {createOrUpdatePriceAlert, getUserPriceAlerts, deletePriceAlert, checkPriceAlert,};