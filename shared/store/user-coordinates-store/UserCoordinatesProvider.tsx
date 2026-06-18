"use client";

import { createContext, useContext, useRef } from "react";
import { useStore } from "zustand";
import {
  createUserCoordinatesStore,
  UserCoordinatesStates,
  UserCoordinatesType,
} from "./user-coordinates-store";

interface UserCoordinatesStoreProviderProps {
  children: React.ReactNode;
  userCoords?: UserCoordinatesStates;
}

type UserCoordinatesStoreApi = ReturnType<typeof createUserCoordinatesStore>;

const UserCoordinatesStoreContext =
  createContext<UserCoordinatesStoreApi | null>(null);

function UserCoordinatesStoreProvider({
  children,
  userCoords,
}: UserCoordinatesStoreProviderProps) {
  const userCoordinatesRef =
    useRef<ReturnType<typeof createUserCoordinatesStore>>(null);

  if (!userCoordinatesRef.current) {
    userCoordinatesRef.current = createUserCoordinatesStore(userCoords);
  }

  return (
    <UserCoordinatesStoreContext.Provider value={userCoordinatesRef.current}>
      {children}
    </UserCoordinatesStoreContext.Provider>
  );
}

export const useUserCoordinatesStore = <T,>(
  selector: (store: UserCoordinatesType) => T,
): T => {
  const context = useContext(UserCoordinatesStoreContext);
  if (!context) {
    throw new Error(
      `userCoordinatesContext must be used within UserCoordinatesProvider`,
    );
  }

  return useStore(context, selector);
};

export default UserCoordinatesStoreProvider;
