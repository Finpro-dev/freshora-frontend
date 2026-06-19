"use client";

import { useGeolocation } from "@/shared/hooks/use-geolocation";
import { useUserCoordinatesStore } from "@/shared/store/user-coordinates-store/UserCoordinatesProvider";
import { useEffect } from "react";
import { useGetNearestStore } from "../_hooks/use-get-nearest-store";

interface ProductLayoutProps {
  children: React.ReactNode;
}
function ProductLayout({ children }: ProductLayoutProps) {
  const { lat, lng, setCords, nearestStoreId } = useUserCoordinatesStore(
    (state) => state,
  );
  const { position, getPosition } = useGeolocation();

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    if (position) {
      setCords({ lat: position.lat, lng: position.lng });
    }
  }, [position]);

  useGetNearestStore(lat, lng);

  return <section>{children}</section>;
}

export default ProductLayout;
