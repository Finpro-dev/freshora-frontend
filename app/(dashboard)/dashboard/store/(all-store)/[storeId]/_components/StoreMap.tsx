"use client";

import { freshoraIcon } from "@/shared/statics/leaflet-icon-static";
import { useStoreAddressStore } from "@/shared/store/store-address-store/StoreAddressProvider";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import StoreChangeCenter from "./StoreChangeCenter";
import StoreDetectClick from "./StoreDetectClick";

function StoreMap() {
  const { lat, lng, setCords } = useStoreAddressStore((state) => state);
  console.log(lat, lng);

  return (
    <div className="w-full">
      <MapContainer
        center={[lat, lng]}
        zoom={13}
        scrollWheelZoom={true}
        className="h-60 md:h-75 lg:h-dvh w-full z-0">
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[lat, lng]} icon={freshoraIcon}>
          <Popup>Your pinned location</Popup>
        </Marker>

        {/* get lat lng */}
        <StoreDetectClick setCords={setCords} />

        {/* move view to the center after clicking */}
        <StoreChangeCenter cords={{ lat, lng }} />
      </MapContainer>
    </div>
  );
}

export default StoreMap;
