import { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";

interface ChangeCenterProps {
  cords: LatLngExpression;
}

function ChangeCenter({ cords }: ChangeCenterProps) {
  const map = useMap();
  map.setView(cords);

  return null;
}

export default ChangeCenter;
