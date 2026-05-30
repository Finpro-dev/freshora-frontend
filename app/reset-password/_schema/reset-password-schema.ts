import { z } from "zod";

export const emailSchema = z.object({
  email: z
    .email("Invalid email format")
    .trim()
    .toLowerCase()
    .max(30, "Email must be at most 30 characters"),
});

export type EmailInput = z.infer<typeof emailSchema>;
