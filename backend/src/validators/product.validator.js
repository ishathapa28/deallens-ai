import { z } from "zod";

const analyzeProductLinkSchema = z.object({
  productUrl: z
    .string({
      required_error: "Product URL is required",
    })
    .trim()
    .url("Please provide a valid product URL"),
});

export { analyzeProductLinkSchema, };