// pages/index.tsx
"use client";

import { useState } from "react";
import { LoadScriptNext } from "@react-google-maps/api";
import PlacesAutocomplete from "../_components/placesAutoComplete";
import Map from "../_components/map";
import DistanceDisplay from "../_components/distanceDisplay";
import Navbar from "../_components/navbar";

export default function Home() {
  const [origin, setOrigin] = useState<string>("");
  const [destination, setDestination] = useState<string>("");
  const [stops, setStops] = useState<string[]>([]);
  const [directions, setDirections] =
    useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState<string>("");

  const calculateRoute = () => {
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

  const addStop = () => {
    setStops([...stops, ""]);
  };
  const deleteStop = (index: number) => {
    const newStops = stops.filter((_, i) => i !== index);
    setStops(newStops);
  };

  return (
    <LoadScriptNext
      googleMapsApiKey="AIzaSyARw8dnJRkpqB3hBQFhvYBBsA81LL6VmUw"
      libraries={["places"]}
    >
      <Navbar />
      <div className="container mx-auto px-4 py-6 bg-blue-50 ">
        <h2 className=" flex justify-center items-center text-sm p-4 text-blue-800 ">
          Let's calculate&nbsp;<strong>distance</strong>&nbsp;from Google maps
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10 md:ml-20 md:mr-20">
          <div>
            <PlacesAutocomplete label="Origin" setSelected={setOrigin} />

            <PlacesAutocomplete
              label={`Stop 1`}
              setSelected={(value) => {
                const newStops = [...stops];
                newStops[0] = value;
                setStops(newStops);
              }}
            />

            {stops.slice(1).map((stop, index) => (
              <div key={index + 1}>
                <PlacesAutocomplete
                  label={`Stop ${index + 2}`}
                  setSelected={(value) => {
                    const newStops = [...stops];
                    newStops[index + 1] = value;
                    setStops(newStops);
                  }}
                />
                <button
                  className="ml-2 text-xs text-red-500"
                  onClick={() => deleteStop(index)}
                >
                  Delete
                </button>
              </div>
            ))}

            <button className="text-xs ml-24 md:ml-30 -mt-6" onClick={addStop}>
              <strong>+</strong> Add another Stop
            </button>
            <button
              className="bg-blue-800 text-white text-xs px-4 py-3 rounded-full ml-72 md:ml-44 "
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
          <Map directions={directions} />
        </div>
      </div>
    </LoadScriptNext>
  );
}
