"use client";

import { useMapEvents } from "react-leaflet";

interface StoreDetectClickProps {
  setCords: ({ lat, lng }: { lat: number; lng: number }) => void;
}

function StoreDetectClick({ setCords }: StoreDetectClickProps) {
  useMapEvents({
    click: (e: any) => {
      setCords({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}

export default StoreDetectClick;
