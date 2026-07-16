import express from "express";

import {compareProductOffers,} from "../controllers/comparison.controller.js";

import protect from "../middleware/auth.middleware.js";

const router = express.Router();

router.get("/:productId",protect,compareProductOffers);

export default router;