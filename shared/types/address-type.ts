export type AddressType = "PRIMARY" | "SECONDARY";

export interface Address {
  address: string;
  addressId: string;
  addressStatus: AddressType;
  city: string;
  cityId: number;
  district: string;
  districtId: number;
  latitude: number;
  longitude: number;
  postalCode: string;
  province: string;
  provinceId: number;
  userId: string;
}
