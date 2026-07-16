const extractAmazonProduct = async (productUrl) => {
  return {
    productData: {
      title: "Mock Amazon Product",
      normalizedTitle: "mock amazon product",
      brand: "unknown",
      modelNumber: "",
      category: "",
      imageUrl: "",
      specifications: {},
    },

    offerData: {
      marketplace: "amazon",
      sourceUrl: productUrl,
      currentPrice: null,
      originalPrice: null,
      deliveryCharge: 0,
      rating: null,
      reviewCount: 0,
      availability: "unknown",
    },
  };
};

export default extractAmazonProduct;