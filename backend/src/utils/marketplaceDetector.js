const supportedMarketplaces = {
    "amazon.in": "amazon", 
    "www.amazon.in": "amazon",

    "flipkart.com": "flipkart",
    "www.flipkart.com": "flipkart",
    
    "myntra.com": "myntra",
    "www.myntra.com": "myntra",
    
    "ajio.com": "ajio",
    "www.ajio.com": "ajio",
    
    "croma.com": "croma",
    "www.croma.com": "croma", 
    
    "reliancedigital.in": "reliance-digit",
    "www.reliancedigital.in": "reliance-digital",
};

const detectMarketplace = (productUrl) => {
    let parsedUrl;

    try {
        parsedUrl = new URL(productUrl);
    }
    catch {
        const error = new Error("Please provide a valid product URL");
        error.statusCode = 400;
        throw error;
    }

    const hostname = parsedUrl.hostname.toLowerCase();

    const marketplace = supportedMarketplaces[hostname];

    if(!marketplace) {
        const error = new Error(
            "This marketplace is currently not supported"
        );
        error.statusCode = 400;
        throw error;
    }

    return {
        marketplace, hostname, normalizedUrl: parsedUrl.toString(),
    };
};

export { supportedMarketplaces, detectMarketplace, }
