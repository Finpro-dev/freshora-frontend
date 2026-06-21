import { createStore } from "zustand";

export type UserAddressStates = {
  lat: number;
  lng: number;
  error: string | null;
};

export type UserAddressActions = {
  setCords: (data: { lat: number; lng: number }) => void;
  setError: (error: string | null) => void;
};

export const defaultUserAddressState: UserAddressStates = {
  lat: 43.21,
  lng: 0.123,
  error: null,
};

export type UserAddressStoreType = UserAddressStates & UserAddressActions;

export const createUserAddressStore = () => {
  return createStore<UserAddressStoreType>()((set) => ({
    ...defaultUserAddressState,
    setCords: (cords) => set({ ...cords }),
    setError: (error) => set({ error }),
  }));
};
