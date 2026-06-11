"use client";

import { createContext, useContext, useRef, useState } from "react";
import { AuthStates, AuthStoreType, createAuthStore } from "./auth-store";
import { useStore } from "zustand";

interface AuthStoreProviderProps {
  children: React.ReactNode;
  initialAuth: AuthStates;
}

type AuthStoreApi = ReturnType<typeof createAuthStore>;

const AuthStoreContext = createContext<AuthStoreApi | null>(null);

function AuthStoreProvider({ children, initialAuth }: AuthStoreProviderProps) {
  const authRef = useRef<ReturnType<typeof createAuthStore>>(null);

  if (!authRef.current) {
    authRef.current = createAuthStore(initialAuth);
  }

  return (
    <AuthStoreContext.Provider value={authRef.current}>
      {children}
    </AuthStoreContext.Provider>
  );
}

export const useAuthStore = <T,>(selector: (store: AuthStoreType) => T): T => {
  const authStoreContext = useContext(AuthStoreContext);
  if (!authStoreContext) {
    throw new Error(`authStoreContext must be used within AuthStoreProvider`);
  }

  return useStore(authStoreContext, selector);
};

export default AuthStoreProvider;
