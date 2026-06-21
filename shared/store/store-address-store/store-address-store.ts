import { createStore } from "zustand";

export type StoreAddressStates = {
  lat: number;
  lng: number;
  error: string | null;
};

export type StoreAddressActions = {
  setCords: (data: { lat: number; lng: number }) => void;
  setError: (error: string | null) => void;
};

export const defaultStoreAddressState: StoreAddressStates = {
  lat: 43.21,
  lng: 0.123,
  error: null,
};

export type StoreAddressStoreType = StoreAddressStates & StoreAddressActions;

export const createStoreAddressStore = () => {
  return createStore<StoreAddressStoreType>()((set) => ({
    ...defaultStoreAddressState,
    setCords: (cords) => set({ ...cords }),
    setError: (error) => set({ error }),
  }));
};
