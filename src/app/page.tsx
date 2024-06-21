'use client';

import { useState } from 'react';
import { LoadScriptNext } from '@react-google-maps/api';
import PlacesAutocomplete from './_components/placesAutoComplete';
import Map from './_components/map';
import DistanceDisplay from './_components/distanceDisplay';

export default function Home() {
  const [origin, setOrigin] = useState<string>('');
  const [destination, setDestination] = useState<string>('');
  const [stops, setStops] = useState<string[]>([]);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>('');

  const calculateRoute = (): void => {
    if (origin && destination) {
      const directionsService = new google.maps.DirectionsService();
      directionsService.route(
        {
          origin: origin,
          destination: destination,
          waypoints: stops.map((stop) => ({ location: stop })),
          travelMode: google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK && result) {
            setDirections(result);
            const totalDistance = result.routes[0].legs.reduce(
              (total, leg) => total + (leg.distance?.value || 0),
              0
            );
            setDistance(`${(totalDistance / 1000).toFixed(2)} km`);
          }
        }
      );
    }
  };

  const addStop = (): void => {
    setStops([...stops, '']);
  };

  return (
    <LoadScriptNext
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ''}
      libraries={['places']}
    >
      <div className="mx-auto px-8 py-12 md:px-24 bg-blue-50 ">
        <h2 className="flex justify-center items-center text-sm p-4 text-blue-800 ">
          Let&apos;s calculate&nbsp;<strong>distance</strong>&nbsp;from Google
          maps
        </h2>
        <div className="flex flex-col-reverse md:flex-row md:pt-16 gap-4">
          <div className='flex-1'>
            <PlacesAutocomplete label="Origin" setSelected={setOrigin} />
            <PlacesAutocomplete
              label="Stop 1"
              setSelected={(value) => {
                const newStops = [...stops];
                newStops[0] = value;
                setStops(newStops);
              }}
            />
            {stops.slice(1).map((stop, index) => (
              <div key={`stop-${index + 2}`}>
                <PlacesAutocomplete
                  label={`Stop ${index + 2}`}
                  setSelected={(value) => {
                    const newStops = [...stops];
                    newStops[index + 1] = value;
                    setStops(newStops);
                  }}
                />
              </div>
            ))}
            <button
              className="text-xs ml-24 md:ml-30 -mt-6"
              onClick={addStop}
              aria-label="Add another stop"
            >
              <strong>+</strong> Add another Stop
            </button>
            <button
              className="bg-blue-800 hover:bg-blue-600 transition-all duration-300 text-white text-sm px-6 py-3 rounded-full ml-72 md:ml-44 "
              onClick={calculateRoute}
            >
              Calculate
            </button>
            <PlacesAutocomplete
              label="Destination"
              setSelected={setDestination}
            />
            {distance && (
              <DistanceDisplay
                distance={distance}
                origin={origin}
                destination={destination}
              />
            )}
          </div>
          <div className='flex-1'>
            <Map directions={directions} />
          </div>
        </div>
      </div>
    </LoadScriptNext>
  );
}
