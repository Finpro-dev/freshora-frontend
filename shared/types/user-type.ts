export type Gender = "MALE" | "FEMALE";
export type Role = "CUSTOMER" | "STORE_ADMIN" | "SUPER_ADMIN";

export interface User {
  avatar: string | null;
  email: string;
  firstName: string;
  gender: Gender;
  isVerified: boolean;
  lastName: string;
  myReferralCode: string;
  phone: string | null;
  role: Role;
  usedReferralCode: string | null;
  userId: string;

  storeId?: string | null;
}
