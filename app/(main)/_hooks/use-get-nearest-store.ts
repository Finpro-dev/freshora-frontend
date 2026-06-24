// hooks/use-get-nearest-store.ts
"use client";

import { api } from "@/shared/lib/axios-instance";
import { useUserCoordinatesStore } from "@/shared/store/user-coordinates-store/UserCoordinatesProvider";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

export const useGetNearestStore = (lat: number, lng: number) => {
  const { setNearestStoreId, setIsLoading } = useUserCoordinatesStore(
    (state) => state,
  );

  const { data, isLoading } = useQuery({
    queryKey: ["nearest-store", lat, lng],
    queryFn: async () => {
      const { data } = await api.get(`/stores/nearest?lat=${lat}&lng=${lng}`);
      return data?.data?.storeId;
    },
  });

  useEffect(() => {
    setIsLoading(isLoading);
  }, [isLoading, setIsLoading]);

  useEffect(() => {
    if (data) {
      setNearestStoreId(data);
    }
  }, [data, setNearestStoreId]);

  return data;
};
