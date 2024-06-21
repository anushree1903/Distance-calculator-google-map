import React from "react";
import { GoogleMap, DirectionsRenderer, MarkerF } from "@react-google-maps/api";

interface MapProps {
  directions: google.maps.DirectionsResult | null;
}

const mapContainerStyle: React.CSSProperties = {
  width: "100%",
  height: "400px",
};

const center: google.maps.LatLngLiteral = {
  lat: 20.5937,
  lng: 78.9629,
};

const Map: React.FC<MapProps> = ({ directions }) => {
  return (
    <GoogleMap
      mapContainerStyle={mapContainerStyle}
      center={center}
      zoom={5}
      options={{ streetViewControl: false, mapTypeControl: false }}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default Map;
