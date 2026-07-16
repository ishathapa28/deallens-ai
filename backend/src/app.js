import express from "express";
import cors from "cors";

import healthRoutes from "./routes/health.routes.js";
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import comparisonRoutes from "./routes/comparison.routes.js";
import priceHistoryRoutes from "./routes/priceHistory.routes.js";
import priceAlertRoutes from "./routes/priceAlert.routes.js";

import notFound from "./middleware/notFound.middleware.js";
import errorHandler from "./middleware/error.middleware.js";

const app = express();

app.use(cors());
app.use(express.json());

app.use("/health", healthRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/comparisons", comparisonRoutes);
app.use("/api/price-history",priceHistoryRoutes);
app.use("/api/alerts", priceAlertRoutes);

app.use(notFound);
app.use(errorHandler);

export default app;