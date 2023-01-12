import { useState } from "react";
import {geoAPIGetByZip, geoAPIGetByCity} from "../services/geoAPI";
import GeoDBSearch from "./GeoDBSearch";
import { FaSearch } from "react-icons/fa";

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

  const handleSubmitCity = (event) => {
    event.preventDefault();
    geoAPIGetByCity(searchInputs, onSubmit);
  };

  const handleCityChange = (event) => {
    event.preventDefault();
    const city = event.target.value.split(",")[0]
    const countryCode = event.target.value.split(",")[1]
    setSearchInputs({ ...searchInputs, 
      city: city, 
      countryCode:countryCode 
    });
  };

  const handleSubmitZip = (event) => {
    event.preventDefault();
    geoAPIGetByZip(searchInputs, onSubmit);
  };

  const handleZipChange = (event) => {
    event.preventDefault();
    setSearchInputs({ ...searchInputs, zip: event.target.value });
  };

  return (
    <div className="flex flex-row justify-center w-full">
      <form
        onSubmit={handleSubmitCity}
        className="flex justify-between bg-white rounded-lg w-full"
      >
        <input
          onChange={handleCityChange}
          className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
          name="location"
          type="text"
          placeholder="Type a location here"
        />
        <button onClick={handleSubmitCity} className="p-4">
          <FaSearch size={20} />
        </button>
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
          placeholder="Type a Singapore Postal Code here"
        />
        <button onClick={handleSubmitZip} className="p-4">
          <FaSearch size={20} />
        </button>
      </form>
      <form className="flex justify-between bg-white rounded-lg w-full">
        <GeoDBSearch 
          onSearchChange={onSearchChange} 
        />
      </form>
    </div>
  );
};

export default SearchBar;
