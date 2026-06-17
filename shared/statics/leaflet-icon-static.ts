import L from "leaflet";
import freshoraLogo from "../../public/freshora-logo/freshora-logo-no-text.png";

export const freshoraIcon = L.icon({
  iconUrl: freshoraLogo.src,

  iconSize: [45, 45],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
});
