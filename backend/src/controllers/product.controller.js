import { analyzeProductLink as analyzeProductLinkService, } from "../services/product.service.js";

const analyzeProductLink = async (req, res, next) => {
  try {
    const result = await analyzeProductLinkService(req.body.productUrl);

    const statusCode = result.isNewOffer ? 201 : 200;

    return res.status(statusCode).json({
      success: true,
      message: result.isNewOffer ? "Product offer analyzed successfully" : "Product offer already exists",
      product: result.product,
      offer: result.offer,
    });
  } catch (error) {
    next(error);
  }
};

export { analyzeProductLink, };