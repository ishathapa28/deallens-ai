import express from "express";
import { analyzeProductLink, } from "../controllers/product.controller.js";
import protect from "../middleware/auth.middleware.js";
import validate from "../middleware/validate.middleware.js";

import { analyzeProductLinkSchema } from "../validators/product.validator.js";

const router = express.Router();

router.post("/analyze-link",protect,validate(analyzeProductLinkSchema), analyzeProductLink);

export default router;