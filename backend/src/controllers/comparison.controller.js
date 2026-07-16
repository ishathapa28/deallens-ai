import { compareProductOffers as compareProductOffersService, } from "../services/comparison.service.js";

const compareProductOffers = async (req, res, next) => {
  try {
    const result = await compareProductOffersService( req.params.productId);

    return res.status(200).json({
      success: true,
      message: "Product offers retrieved successfully",
      ...result,
    });
  } catch (error) {
    next(error);
  }
};

export { compareProductOffers, };