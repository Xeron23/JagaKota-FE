import React from "react";
import { MapContainer, TileLayer, Marker } from "react-leaflet";
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
  tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
  attribution = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
}) => {
  return (
    <div className={`relative ${height} w-full`}>
      <MapContainer
        center={center}
        zoom={zoom}
        style={{ height: "100%", width: "100%" }}
        zoomControl={false}
      >
        <TileLayer attribution={attribution} url={tileUrl} />
        <ClickCapture onSelect={onLocationSelect} />
        <MapController position={position} />
        {position && <Marker position={[position.lat, position.lng]} />}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
