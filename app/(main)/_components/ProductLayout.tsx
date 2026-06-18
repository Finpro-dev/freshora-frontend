"use client";

import { useGeolocation } from "@/shared/hooks/use-geolocation";
import { useUserCoordinatesStore } from "@/shared/store/user-coordinates-store/UserCoordinatesProvider";
import { useEffect } from "react";

interface ProductLayoutProps {
  children: React.ReactNode;
}
function ProductLayout({ children }: ProductLayoutProps) {
  const { setCords } = useUserCoordinatesStore((state) => state);
  const { position, getPosition } = useGeolocation();

  useEffect(() => {
    getPosition();
  }, []);

  useEffect(() => {
    if (position) {
      setCords({ lat: position.lat, lng: position.lng });
    }
  }, [position]);

  return <section>{children}</section>;
}

export default ProductLayout;
