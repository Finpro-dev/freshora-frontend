"use client";

import { useMapEvents } from "react-leaflet";

interface EditDetectClickProps {
  setCords: ({ lat, lng }: { lat: number; lng: number }) => void;
}

function EditDetectClick({ setCords }: EditDetectClickProps) {
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

export default EditDetectClick;
