import { z } from "zod";

export const createAddressSchema = z.object({
  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address cannot exceed 100 characters")
    .nullable(),

  district: z
    .string()
    .min(2, "Please choose a correct district")
    .max(50, "Please choose a correct district")
    .nullable(),

  city: z
    .string()
    .min(2, "Please choose a correct city")
    .max(50, "Please choose a correct city")
    .nullable(),

  province: z
    .string()
    .min(2, "Please choose a correct province")
    .max(50, "Please choose a correct province")
    .nullable(),

  postalCode: z
    .string()
    .min(1, "Postal code is required")
    .regex(/^\d+$/, "Only numbers are allowed")
    .transform((val) => val.replace(/\D/g, "")) // delete non-digit
    .pipe(z.string().length(5, "Postal code only contains 5 digits")),
});

export type CreateAddressInput = z.infer<typeof createAddressSchema>;
