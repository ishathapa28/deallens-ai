import Product from "../models/product.model.js";
import Offer from "../models/offer.model.js";
import AppError from "../utils/AppError.js";

const compareProductOffers = async (productId) => {
  const product = await Product.findById(productId);

  if (!product) {
    throw new AppError("Product not found", 404);
  }

  const offers = await Offer.find({
    product: productId,
    analysisStatus: "completed",
  }).lean();

  const calculatedOffers = offers.map((offer) => {
    const currentPrice = typeof offer.currentPrice === "number" ? offer.currentPrice : null;

    const deliveryCharge = typeof offer.deliveryCharge === "number" ? offer.deliveryCharge : 0;

    const totalCost =
      currentPrice === null ? null : currentPrice + deliveryCharge;

    return { ...offer, totalCost, isBestDeal: false,};
  });

  const availableOffers = calculatedOffers
    .filter((offer) => offer.totalCost !== null && offer.availability !== "out-of-stock")
    .sort((firstOffer, secondOffer) => {
      return firstOffer.totalCost - secondOffer.totalCost;
    });

  if (availableOffers.length > 0) {
    availableOffers[0].isBestDeal = true;
  }

  const unavailableOffers = calculatedOffers.filter(
    (offer) => offer.totalCost === null || offer.availability === "out-of-stock"
  );

  return {
    product,
    offers: [...availableOffers, ...unavailableOffers,],
    bestOffer: availableOffers.length > 0 ? availableOffers[0] : null,
  };
};

export { compareProductOffers, };