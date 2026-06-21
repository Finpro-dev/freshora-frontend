"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  createStoreAddressStore,
  StoreAddressStoreType,
} from "./store-address-store";

interface StoreAddressStoreProviderProps {
  children: React.ReactNode;
}

type StoreAddressStoreApi = ReturnType<typeof createStoreAddressStore>;

const StoreAddressStoreContext = createContext<StoreAddressStoreApi | null>(
  null,
);

function StoreAddressStoreProvider({
  children,
}: StoreAddressStoreProviderProps) {
  const userAddressRef =
    useRef<ReturnType<typeof createStoreAddressStore>>(null);

  if (!userAddressRef.current) {
    userAddressRef.current = createStoreAddressStore();
  }

  return (
    <StoreAddressStoreContext.Provider value={userAddressRef.current}>
      {children}
    </StoreAddressStoreContext.Provider>
  );
}

export const useStoreAddressStore = <T,>(
  selector: (store: StoreAddressStoreType) => T,
): T => {
  const storeAddressStoreContext = useContext(StoreAddressStoreContext);
  if (!storeAddressStoreContext) {
    throw new Error(
      `storeAddressStoreContext must be used within StoreAddressStoreProvider`,
    );
  }

  return useStore(storeAddressStoreContext, selector);
};

export default StoreAddressStoreProvider;
