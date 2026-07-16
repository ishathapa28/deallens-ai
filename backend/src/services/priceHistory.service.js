import Offer from "../models/offer.model.js";
import PriceHistory from "../models/priceHistory.model.js";
import AppError from "../utils/AppError.js";

const recordPriceSnapshot = async (offerOrId) => {
  let offer = offerOrId;

  if (typeof offerOrId === "string") {
    offer = await Offer.findById(offerOrId);
  }

  if (!offer) {
    throw new AppError("Offer not found", 404);
  }

  if (typeof offer.currentPrice !== "number") {
    return null;
  }

  const deliveryCharge =
    typeof offer.deliveryCharge === "number" ? offer.deliveryCharge : 0;

  const totalCost = offer.currentPrice + deliveryCharge;

  const latestSnapshot = await PriceHistory.findOne({
    offer: offer._id,
  }).sort({
    recordedAt: -1,
  });

  const isSameAsLatest =
    latestSnapshot &&
    latestSnapshot.price === offer.currentPrice &&
    latestSnapshot.deliveryCharge === deliveryCharge &&
    latestSnapshot.availability === offer.availability;

  if (isSameAsLatest) {
    return latestSnapshot;
  }

  const snapshot = await PriceHistory.create({
    offer: offer._id,
    price: offer.currentPrice,
    deliveryCharge,
    totalCost,
    availability: offer.availability,
    recordedAt: new Date(),
  });

  return snapshot;
};

const getOfferPriceHistory = async (offerId, days = 30) => {
  const offer = await Offer.findById(offerId);

  if (!offer) {
    throw new AppError("Offer not found", 404);
  }

  const safeDays = Math.min(Math.max(Number(days) || 30, 1),365);

  const startDate = new Date();

  startDate.setDate(startDate.getDate() - safeDays);

  const history = await PriceHistory.find({
    offer: offerId,
    recordedAt: {
      $gte: startDate,
    },
  })
    .sort({
      recordedAt: 1,
    })
    .lean();

  return {offerId, periodDays: safeDays, history,};
};

export {recordPriceSnapshot, getOfferPriceHistory,};