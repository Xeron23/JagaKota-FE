import React, { useEffect, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import MapController from "./MapController";
import ClickCapture from "./ClickCapture";
import "../utils/leafletConfig";
import "leaflet/dist/leaflet.css";

const MapComponent = ({
  center,
  position,
  onLocationSelect,
  height = "h-80",
  zoom = 14,
  tileUrl = "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png",
  markerPopupContent,
  autoOpenPopup = false,
}) => {
  const markerRef = useRef(null);

  useEffect(() => {
    if (autoOpenPopup && markerRef.current) {
      // Open when marker or position updates
      markerRef.current.openPopup?.();
    }
  }, [autoOpenPopup, position]);

  return (
    <div className={`relative ${height} z-0 w-full`}>
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        className="h-full w-full"
      >
        <TileLayer url={tileUrl} />
        <ClickCapture onSelect={onLocationSelect} />
        <MapController position={position} />
        {position && (
          <Marker ref={markerRef} position={[position.lat, position.lng]}>
            {markerPopupContent && <Popup autoPan>{markerPopupContent}</Popup>}
          </Marker>
        )}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
