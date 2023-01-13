import { useState } from "react";
import { geoAPIGetByZip, geoAPIGetByCity } from "../services/geoAPI";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { countryCodes } from "../data/countries";

const SearchBar = ({ onSubmit }) => {
  const [countryCode, setCountryCode] = useState("");

  const handleCountryChange = (selectedOption) => {
    setCountryCode(selectedOption.value);
  };

  const handleZipChange = (selectedOption) => {
    onSubmit(selectedOption.value);
  };

  const loadOptionsZip = (searchValue, callback) => {
    return geoAPIGetByZip(countryCode, searchValue, callback);
  };

  const handleCityChange = (selectedOption) => {
    onSubmit(selectedOption.value);
  };

  const loadOptionsCity = (searchValue, callback) => {
    return geoAPIGetByCity(searchValue, callback);
  };

  return (
    <div className="flex flex-row justify-center w-full">
      <form className="flex justify-between bg-white rounded-lg w-full">
        <AsyncSelect
          className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
          loadOptions={loadOptionsCity}
          onChange={handleCityChange}
          placeholder="City, Country code"
        />
      </form>
      <form className="flex justify-between bg-white rounded-lg w-full">
        <AsyncSelect
          className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
          loadOptions={loadOptionsZip}
          onChange={handleZipChange}
          placeholder="Zip code"
        />
        <Select
          className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
          options={countryCodes}
          onChange={handleCountryChange}
          placeholder="Country"
        />
      </form>
    </div>
  );
};

export default SearchBar;
