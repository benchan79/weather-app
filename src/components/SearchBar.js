import { useState } from "react";
import { geoAPIGetByZip, geoAPIGetByCity } from "../services/geoAPI";
import GeoDBSearch from "./GeoDBSearch";
import { FaSearch } from "react-icons/fa";
import AsyncSelect from "react-select/async";

const initialState = {
  zip: "178880",
  city: "Singapore",
  countryCode: "SG",
  limit: 5,
};

const SearchBar = ({ onSubmit }) => {
  const [searchInputs, setSearchInputs] = useState(initialState);

  const onSearchChange = (searchData) => {
    const [name, country] = searchData.label.split(", ");
    const [lat, lon] = searchData.value.split(", ");
    const result = {
      name: name,
      country: country,
      lat: lat,
      lon: lon,
    };
    onSubmit(result);
  };

  const handleSubmitZip = (event) => {
    event.preventDefault();
    geoAPIGetByZip(searchInputs, onSubmit);
  };

  const handleZipChange = (event) => {
    event.preventDefault();
    setSearchInputs({ ...searchInputs, zip: event.target.value });
  };

  const handleCityChange = (selectedOption) => {
    console.log("handleAsyncChange", selectedOption);
    onSubmit(selectedOption.value);
  };

  const loadOptions = (searchValue, callback) => {
    return geoAPIGetByCity(searchValue, callback);
  };

  return (
    <div className="flex flex-row justify-center w-full">
      <form className="flex justify-between bg-white rounded-lg w-full">
        <AsyncSelect
          className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
          loadOptions={loadOptions}
          // defaultOptions
          onChange={handleCityChange}
          placeholder="City, Country code"
        />
      </form>
      <form
        onSubmit={handleSubmitZip}
        className="flex justify-between bg-white rounded-lg w-full"
      >
        <input
          onChange={handleZipChange}
          className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
          name="location"
          type="text"
          placeholder="Sg Postal Code"
        />
        <button onClick={handleSubmitZip} className="p-4">
          <FaSearch size={20} />
        </button>
      </form>
      <form className="flex justify-between bg-white rounded-lg w-full">
        <GeoDBSearch onSearchChange={onSearchChange} />
      </form>
    </div>
  );
};

export default SearchBar;
