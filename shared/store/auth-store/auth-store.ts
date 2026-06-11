import { User } from "@/shared/types/user-type";
import { createStore } from "zustand";

export type AuthStates = {
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  avatar?: string;
};

export type AuthActions = {
  setAuth: (data: AuthStates) => void;
  clearAuth: () => void;
};

export const defaultAuthStoreState: AuthStates = {
  userId: "",
  firstName: "",
  lastName: "",
  email: "",
  avatar: "",
};

export type AuthStoreType = AuthStates & AuthActions;

export const createAuthStore = (
  initState: AuthStates = defaultAuthStoreState,
) => {
  return createStore<AuthStoreType>()((set) => ({
    ...initState,
    setAuth: (data) => set({ ...data }),
    clearAuth: () => set({ ...defaultAuthStoreState }),
  }));
};
