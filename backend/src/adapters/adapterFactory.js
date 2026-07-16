import extractAmazonProduct from "./amazon.adapter.js";
import extractFlipkartProduct from "./flipkart.adapter.js";

const marketplaceAdapters = {
    amazon: extractAmazonProduct,
    flipkart: extractFlipkartProduct,
};

const getMarketplaceAdapter = (marketplace) => {
    const adapter = marketplaceAdapters[marketplace];

    if(!adapter){
        const error = new Error(`No adapter is available for marketplace: ${marketplace}`);
        error.statusCode = 400;
        throw error;
    }   

    return adapter;
};

export default getMarketplaceAdapter;