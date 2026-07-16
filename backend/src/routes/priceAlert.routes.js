import express from "express";

import {createOrUpdatePriceAlert, getUserPriceAlerts, deletePriceAlert, checkPriceAlert,} from "../controllers/priceAlert.controller.js";

import protect from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import {createPriceAlertSchema,} from "../validators/priceAlert.validator.js";

const router = express.Router();

router.post("/",protect,validate(createPriceAlertSchema),createOrUpdatePriceAlert);

router.get("/",protect,getUserPriceAlerts);

router.get("/:alertId/check",protect, checkPriceAlert);

router.delete("/:alertId",protect, deletePriceAlert);

export default router;