import { createStore } from "zustand";

export type UserCoordinatesStates = {
  lat: number;
  lng: number;
  nearestStoreId: string;
  error: string | null;
  isLoading: boolean;
};

export type UserCoordinatesActions = {
  setCords: (data: { lat: number; lng: number }) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
  setNearestStoreId: (storeId: string) => void;
};

export const defaultCoordsStates: UserCoordinatesStates = {
  lat: 0,
  lng: 0,
  nearestStoreId: "",
  error: null,
  isLoading: false,
};

export type UserCoordinatesType = UserCoordinatesStates &
  UserCoordinatesActions;

export const createUserCoordinatesStore = (
  initialCoords: UserCoordinatesStates = defaultCoordsStates,
) => {
  return createStore<UserCoordinatesType>()((set) => ({
    ...initialCoords,
    setCords: (cords) => set({ ...cords }),
    setError: (error) => set({ error }),
    setIsLoading: (isLoading) => set({ isLoading }),
    setNearestStoreId: (storeId) => set({ nearestStoreId: storeId }),
  }));
};
