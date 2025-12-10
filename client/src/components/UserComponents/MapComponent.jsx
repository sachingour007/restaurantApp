import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

const MapComponent = () => {
  return (
    <MapContainer
      center={[25.2138, 75.8648]}
      zoom={7}
      style={{ width: "100%" }}
      className="mapContainer"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="© OpenStreetMap contributors"
      />
      <Marker position={[25.2138, 75.8648]}>
        <Popup>Kota Rajasthan - India</Popup>
      </Marker>
    </MapContainer>
  );
};

export default MapComponent;
