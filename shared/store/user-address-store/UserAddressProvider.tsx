"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  createUserAddressStore,
  UserAddressStates,
  UserAddressStoreType,
} from "./user-address-store";

interface UserAddressStoreProviderProps {
  children: React.ReactNode;
}

type UserAddressStoreApi = ReturnType<typeof createUserAddressStore>;

const UserAddressStoreContext = createContext<UserAddressStoreApi | null>(null);

function UserAddressStoreProvider({ children }: UserAddressStoreProviderProps) {
  const userAddressRef =
    useRef<ReturnType<typeof createUserAddressStore>>(null);

  if (!userAddressRef.current) {
    userAddressRef.current = createUserAddressStore();
  }

  return (
    <UserAddressStoreContext.Provider value={userAddressRef.current}>
      {children}
    </UserAddressStoreContext.Provider>
  );
}

export const useUserAddressStore = <T,>(
  selector: (store: UserAddressStoreType) => T,
): T => {
  const userAddressStoreContext = useContext(UserAddressStoreContext);
  if (!userAddressStoreContext) {
    throw new Error(
      `userAddressStoreContext must be used within UserAddressStoreProvider`,
    );
  }

  return useStore(userAddressStoreContext, selector);
};

export default UserAddressStoreProvider;
