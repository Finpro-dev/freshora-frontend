"use client";

import { useMapEvents } from "react-leaflet";

interface DetectClickProps {
  setCords: ({ lat, lng }: { lat: number; lng: number }) => void;
}

function DetectClick({ setCords }: DetectClickProps) {
  useMapEvents({
    click: (e: any) => {
      //   console.log(e);
      setCords({
        lat: e.latlng.lat,
        lng: e.latlng.lng,
      });
    },
  });

  return null;
}

export default DetectClick;
