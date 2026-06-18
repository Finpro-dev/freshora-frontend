import { createStore } from "zustand";

export type UserCoordinatesStates = {
  lat: number;
  lng: number;
  error: string | null;
  isLoading: boolean;
};

export type UserCoordinatesActions = {
  setCords: (data: { lat: number; lng: number }) => void;
  setError: (error: string | null) => void;
  setIsLoading: (isLoading: boolean) => void;
};

export const defaultCoordsStates: UserCoordinatesStates = {
  lat: 0,
  lng: 0,
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
  }));
};
