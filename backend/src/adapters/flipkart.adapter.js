const extractFlipkartProduct = async (productUrl) => {
  return {
    productData: {
      title: "Mock Flipkart Product",
      normalizedTitle: "mock flipkart product",
      brand: "unknown",
      modelNumber: "",
      category: "",
      imageUrl: "",
      specifications: {},
    },

    offerData: {
      marketplace: "flipkart",
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

export default extractFlipkartProduct;