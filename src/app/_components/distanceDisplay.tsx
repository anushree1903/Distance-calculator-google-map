import React from "react";

interface DistanceDisplayProps {
  distance: string;
  origin: string;
  destination: string;
}

const DistanceDisplay: React.FC<DistanceDisplayProps> = ({
  distance,
  origin,
  destination,
}) => {
  return (
    <div className="mt-16  border border-gray-500 rounded md:w-3/4">
      <div className=" bg-white rounded-t-md flex flex-row justify-between p-4">
        <h3 className="font-semibold">Distance</h3>
        <p className="text-2xl font-bold text-blue-600">{distance}</p>
      </div>

      <p className="text-xs text-black p-4">
        The distance between <strong>{origin}</strong> and{" "}
        <strong>{destination} </strong>via the selected route is{" "}
        <strong>{distance}</strong>
      </p>
    </div>
  );
};

export default DistanceDisplay;
