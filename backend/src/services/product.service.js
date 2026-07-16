import Product from "../models/product.model.js";
import Offer from "../models/offer.model.js";

import { detectMarketplace } from "../utils/marketplaceDetector.js";
import getMarketplaceAdapter from "../adapters/adapterFactory.js";

import {recordPriceSnapshot,} from "./priceHistory.service.js";

const findCanonicalProduct = async (productData) => {
  if (productData.modelNumber && productData.brand) {
    const productByModel = await Product.findOne({
      brand: productData.brand.toLowerCase(),
      modelNumber: productData.modelNumber.toUpperCase(),
    });

    if (productByModel) {
      return productByModel;
    }
  }

  return Product.findOne({
    normalizedTitle: productData.normalizedTitle,
  });
};

const analyzeProductLink = async (productUrl) => {
  const marketplaceDetails = detectMarketplace(productUrl);

  const existingOffer = await Offer.findOne({
    marketplace: marketplaceDetails.marketplace,
    sourceUrl: marketplaceDetails.normalizedUrl,
  }).populate("product");

  if (existingOffer) {
    return {
      product: existingOffer.product,
      offer: existingOffer,
      isNewOffer: false,
    };
  }

  const adapter = getMarketplaceAdapter(
    marketplaceDetails.marketplace
  );

  const extractedData = await adapter(
    marketplaceDetails.normalizedUrl
  );

  let product = await findCanonicalProduct(
    extractedData.productData
  );

  if (!product) {
    product = await Product.create(
      extractedData.productData
    );
  }

  const offer = await Offer.create({
    ...extractedData.offerData,
    product: product._id,
    marketplace: marketplaceDetails.marketplace,
    sourceUrl: marketplaceDetails.normalizedUrl,
    analysisStatus: "completed",
    lastCheckedAt: new Date(),
  });

  await recordPriceSnapshot(offer);

  return { product, offer, isNewOffer: true,};
};

export { analyzeProductLink, };

/* 
This service contains business logic:
identify the marketplace
check for duplicates
create the product
decide what result to return 
*/