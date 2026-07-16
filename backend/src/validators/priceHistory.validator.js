import { z } from "zod";

const priceHistoryParamsSchema = z.object({
  offerId: z
    .string()
    .regex(
      /^[0-9a-fA-F]{24}$/,
      "Invalid offer ID"
    ),
});

const priceHistoryQuerySchema = z.object({
  days: z
    .string()
    .regex(
      /^\d+$/,
      "Days must be a positive number"
    )
    .optional(),
});

export {priceHistoryParamsSchema, priceHistoryQuerySchema,};