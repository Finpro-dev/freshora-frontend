"use client";

import Button from "@/shared/components/Button";
import { freshoraIcon } from "@/shared/statics/leaflet-icon-static";
import { useUserAddressStore } from "@/shared/store/user-address-store/UserAddressProvider";
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { useGeolocation } from "../../../../../../shared/hooks/use-geolocation";
import ChangeCenter from "./ChangeCenter";
import DetectClick from "./DetectClick";

function Map() {
  const {
    lat,
    lng,
    setCords,
    setError,
    error: latLngError,
  } = useUserAddressStore((state) => state);

  const {
    isLoading: isLoadingPosition,
    position: geolocationPosition,
    getPosition,
  } = useGeolocation();

  useEffect(() => {
    if (lat === 43.21 && lng === 0.123) {
      setError("Please pin your location on map!");
    } else {
      setError(null);
    }
  }, [lat, lng]);

  useEffect(() => {
    if (lat && lng) setCords({ lat, lng });
  }, [lat, lng]);

  useEffect(() => {
    if (geolocationPosition)
      setCords({ lat: geolocationPosition.lat, lng: geolocationPosition.lng });
  }, [geolocationPosition]);

  return (
    <>
      <div className="w-full">
        <MapContainer
          center={[lat, lng]}
          zoom={13}
          scrollWheelZoom={true}
          className="h-60 sm:h-100 w-full z-10">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[lat, lng]} icon={freshoraIcon}>
            <Popup>Your pinned location</Popup>
          </Marker>

          {/* get lat lng */}
          <DetectClick setCords={setCords} />

          {/* move view to the center after clicking */}
          <ChangeCenter cords={{ lat, lng }} />
        </MapContainer>
      </div>

      <section className="flex flex-col gap-5 sm:flex-row justify-between my-5">
        {/* error */}
        {latLngError && (
          <div>
            <p className="pt-2 text-xs text-red-700">{latLngError}</p>
          </div>
        )}

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

export default Map;
