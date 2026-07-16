import express from "express";

import {getOfferPriceHistory,} from "../controllers/priceHistory.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:offerId",protect,getOfferPriceHistory);

export default router;