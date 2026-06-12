import { z } from "zod";

const GenderEnum = z.enum(["MALE", "FEMALE"]);
const phoneRegex = /^(?:\+62|62|08)[2-9]\d{7,11}$/;
const MAX_UPLOAD_SIZE = 1024 * 1024;
const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpg",
  "image/jpeg",
  "image/gif",
];

export const editCustomerProfileSchema = z.object({
  avatar: z
    .instanceof(File, { message: "Image is required." })
    .refine((file) => file.size > 0, "Image cannot be empty.")
    .refine((file) => file.size <= MAX_UPLOAD_SIZE, "Max image size is 1MB.")
    .refine(
      (file) => ACCEPTED_FILE_TYPES.includes(file.type),
      "Only .jpg, .jpeg, .png and .webp formats are supported.",
    )
    .optional()
    .nullable(),

  firstName: z
    .string()
    .min(1, "First name is required")
    .trim()
    .toLowerCase()
    .max(30, "First name must be at most 30 characters")
    .optional()
    .nullable(),

  lastName: z
    .string()
    .min(1, "Last name is required")
    .trim()
    .toLowerCase()
    .max(30, "Last name must be at most 30 characters")
    .optional()
    .nullable(),

  email: z
    .email("Invalid email format")
    .trim()
    .toLowerCase()
    .max(30, "Email must be at most 30 characters")
    .optional(),

  phone: z
    .string()
    .min(1, { message: "Phone number is required" })
    .min(9, { message: "Phone number is too short" })
    .max(15, { message: "Phone number cannot exceed 15 characters" })
    .regex(phoneRegex, {
      message: "Invalid phone number format. Use 08... or +62...",
    })
    .optional()
    .nullable(),

  gender: GenderEnum.optional(),
});

export type EditCustomerProfileInput = z.infer<
  typeof editCustomerProfileSchema
>;
