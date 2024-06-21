import React from 'react';
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from 'use-places-autocomplete';

interface PlacesAutocompleteProps {
  label: string;
  setSelected: (value: string) => void;
}

const PlacesAutocomplete: React.FC<PlacesAutocompleteProps> = ({
  label,
  setSelected,
}) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();
    try {
      const results = await getGeocode({ address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelected(address);
    } catch (error) {
      console.error('Error: ', error);
    }
  };

  return (
    <div className="mb-4 flex flex-col">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        className="w-1/2 md:w-1/3 px-3 py-2 border border-gray-500 border-1 rounded-xs shadow-sm text-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        value={value}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setValue(e.target.value)
        }
        disabled={!ready}
        placeholder="Search an address"
      />
      {status === 'OK' && (
        <ul className="mt-1 bg-white shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto">
          {data.map(({ place_id, description }) => (
            <li
              key={place_id}
              className="cursor-default select-none relative py-2 pl-3 pr-9 hover:bg-blue-600 hover:text-white"
              onClick={() => handleSelect(description)}
            >
              {description}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PlacesAutocomplete;
