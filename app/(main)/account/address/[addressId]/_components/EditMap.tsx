"use client";

import Button from "@/shared/components/Button";
import { useGeolocation } from "@/shared/hooks/use-geolocation";
import { freshoraIcon } from "@/shared/statics/leaflet-icon-static";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import EditChangeCenter from "./EditChangeCenter";
import EditDetectClick from "./EditDetectClick";

interface EditMapProps {
  lat: number;
  lng: number;
}

function EditMap({ lat, lng }: EditMapProps) {
  const [cords, setCords] = useState<{ lat: number; lng: number }>({
    lat,
    lng,
  });

  console.log("CORDS", cords);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  // sync on the first mount
  useEffect(() => {
    if (lat && lng) setCords({ lat, lng });
  }, []);

  useEffect(() => {
    if (geolocationPosition)
      setCords({ lat: geolocationPosition.lat, lng: geolocationPosition.lng });
  }, [geolocationPosition]);

  return (
    <>
      <div className="w-full">
        <MapContainer
          center={[cords.lat, cords.lng]}
          zoom={13}
          scrollWheelZoom={true}
          className="h-60 sm:h-100 w-full z-10">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[cords.lat, cords.lng]} icon={freshoraIcon}>
            <Popup>Your pinned location</Popup>
          </Marker>

          {/* get lat lng */}
          <EditDetectClick setCords={setCords} />

          {/* move view to the center after clicking */}
          <EditChangeCenter cords={{ lat: cords.lat, lng: cords.lng }} />
        </MapContainer>
      </div>

      <section className="flex flex-col sm:flex-row justify-end my-5">
        {/* button getLocation */}
        {!geolocationPosition && (
          <div className="flex w-full sm:w-50 justify-end">
            <div className="w-full">
              <Button
                btnType="secondary"
                onClick={getPosition}
                disabled={isLoadingPosition}
                pendingLabel="Loading...">
                Use your position
              </Button>
            </div>
          </div>
        )}
      </section>
    </>
  );
}

export default EditMap;
