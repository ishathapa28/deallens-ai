import { z } from "zod";

const createPriceAlertSchema = z.object({
  productId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "Invalid product ID"
    ),

  targetPrice: z
    .number({
      required_error: "Target price is required",
    })
    .positive("Target price must be greater than zero"),
});

export {createPriceAlertSchema,};