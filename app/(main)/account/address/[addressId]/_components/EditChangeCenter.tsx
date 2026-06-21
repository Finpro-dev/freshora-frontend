import { LatLngExpression } from "leaflet";
import { useMap } from "react-leaflet";

interface EditChangeCenterProps {
  cords: LatLngExpression;
}

function EditChangeCenter({ cords }: EditChangeCenterProps) {
  const map = useMap();
  map.setView(cords);

  return null;
}

export default EditChangeCenter;
