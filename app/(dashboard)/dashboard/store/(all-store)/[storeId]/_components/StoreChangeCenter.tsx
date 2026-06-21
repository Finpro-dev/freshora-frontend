import { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";

interface StoreChangeCenterProps {
  cords: LatLngExpression;
}

function StoreChangeCenter({ cords }: StoreChangeCenterProps) {
  const map = useMap();
  map.setView(cords);

  return null;
}

export default StoreChangeCenter;
