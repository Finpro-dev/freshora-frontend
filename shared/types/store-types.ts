export interface StoreType {
  address: string;
  avatar: string | null;
  city: string;
  cityId: number;
  district: string;
  districtId: number;
  latitude: number;
  longitude: number;
  name: string;
  phone: string;
  postalCode: string;
  province: string;
  provinceId: number;
  storeId: string;
  storeStatus: StoreStatus;
  user: {
    userId: string;
    avatar: string | null;
    firstName: string;
    lastName: string;
    isVerified: boolean;
  };
  userId: string;
}

export type StoreStatus = "PRIMARY" | "SECONDARY";
