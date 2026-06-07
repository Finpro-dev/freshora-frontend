import { z } from "zod";

export const searchRecommendationSchema = z.object({
  search: z.string().max(30, "User can only input 30 characters").optional(),
});

export type SearchRecommendationInput = z.infer<
  typeof searchRecommendationSchema
>;
