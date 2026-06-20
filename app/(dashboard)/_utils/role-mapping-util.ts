import { Role } from "@/shared/types/user-type";

export const ROLE_MAPPING: Record<Role, string> = {
  SUPER_ADMIN: "Super Admin",
  STORE_ADMIN: "Store Admin",
  CUSTOMER: "Customer",
};
