import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = () => {
  return (
    <MapContainer
      center={[25.2138, 75.8648]} // default location (Delhi)
      zoom={7}
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[28.6139, 77.209]}>
        <Popup>Delhi - India 🇮🇳</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
