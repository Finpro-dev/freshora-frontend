"use client";

import { useEffect, useRef } from "react";
import { useUserCoordinatesStore } from "@/shared/store/user-coordinates-store/UserCoordinatesProvider";
import { useGeolocation } from "@/shared/hooks/use-geolocation";
import { useGetNearestStore } from "../_hooks/use-get-nearest-store";

export const useInitializeUserLocation = () => {
  const {
    lat,
    lng,
    setCords,
    nearestStoreId,
    isLoading: isStoreLoading,
  } = useUserCoordinatesStore((state) => state);

  const { position, getPosition, error: geoError } = useGeolocation();

  const isLocationInitialized = useRef(false);

  useEffect(() => {
    if (!isLocationInitialized.current) {
      getPosition();
    }
  }, [getPosition]);

  useEffect(() => {
    if (!isLocationInitialized.current && (position?.lat || geoError)) {
      if (position?.lat && position?.lng) {
        setCords({ lat: position.lat, lng: position.lng });
      } else if (geoError) {
        console.log("User rejected to use GPS");
      }

      isLocationInitialized.current = true;
    }
  }, [position, geoError, setCords]);

  const storeId = useGetNearestStore(lat, lng);

  const isLocating = isStoreLoading || !nearestStoreId;

  return {
    isLocating,
    geoError,
    coordinates: { lat, lng },
    nearestStoreId: storeId || nearestStoreId,
  };
};
