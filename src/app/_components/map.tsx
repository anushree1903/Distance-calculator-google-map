import React from 'react';
import { GoogleMap, DirectionsRenderer } from '@react-google-maps/api';

interface MapProps {
  directions: google.maps.DirectionsResult | null;
}

const center: google.maps.LatLngLiteral = {
  lat: 20.5937,
  lng: 78.9629,
};

const Map: React.FC<MapProps> = ({ directions }) => {
  return (
    <GoogleMap
      mapContainerClassName='w-[100%] h-[300px] md:h-[500px] border border-gray-400'
      center={center}
      zoom={5}
      options={{ streetViewControl: false, mapTypeControl: false }}
    >
      {directions && <DirectionsRenderer directions={directions} />}
    </GoogleMap>
  );
};

export default Map;
