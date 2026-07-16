import {getOfferPriceHistory as getOfferPriceHistoryService,} from "../services/priceHistory.service.js";

const getOfferPriceHistory = async (req, res, next) => {
  try {
    const result = await getOfferPriceHistoryService(req.params.offerId, req.query.days);

    return res.status(200).json({
      success: true,
      message:
        "Price history retrieved successfully",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export {getOfferPriceHistory,};