import { z } from "zod";

const phoneRegex = /^(?:\+62|62|08)[2-9]\d{7,11}$/;

export const createStoreSchema = z.object({
  name: z
    .string()
    .min(3, "Store name must be at least 3 characters long")
    .max(30, "Store name cannot exceed 30 characters")
    .optional(),

  address: z
    .string()
    .min(5, "Address must be at least 5 characters long")
    .max(100, "Address cannot exceed 100 characters")
    .optional(),

  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .min(9, { message: "Phone number is too short" })
    .max(15, { message: "Phone number cannot exceed 15 characters" })
    .regex(phoneRegex, {
      message: "Invalid phone number format. Use 08... or +62...",
    })
    .optional(),

  district: z
    .string()
    .min(1, "District name is too short")
    .max(50, "District cannot exceed 50 characters")
    .optional(),

  city: z
    .string()
    .min(2, "City name is too short")
    .max(50, "City cannot exceed 50 characters")
    .optional(),

  province: z
    .string()
    .min(2, "Province name is too short")
    .max(50, "Province cannot exceed 50 characters")
    .optional(),

  postalCode: z
    .string()
    .length(5, "Postal code must be exactly 5 digits")
    .regex(/^\d+$/, "Postal code must contain numbers only")
    .optional(),

  userId: z.uuid("Invalid User Id"),
});

export type CreateStoreInput = z.infer<typeof createStoreSchema>;
