import { useState } from "react";
import { geoAPIGetByZip, geoAPIGetByCity } from "../services/geoAPI";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { countryCodes } from "../data/countries";

const SearchBar = ({ onSubmit }) => {
  const [searchType, setSearchType] = useState("city");
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
    return geoAPIGetByCity(countryCode, searchValue, callback);
  };

  const handleSearchType = (e) => {
    setSearchType(e.target.value);
    setCountryCode("");
  };

  return (
    <div className="flex flex-col justify-center w-full gap-5">
      <div
        onChange={handleSearchType}
        className="flex flex-row justify-start w-full gap-5"
      >
        <div>
          <input type="radio" name="search_type" value="city" defaultChecked />
          <label htmlFor="html">&nbsp; Search by City</label>
        </div>
        <div>
          <input type="radio" name="search_type" value="zip" />
          <label htmlFor="html">&nbsp; Search by Zip</label>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full">
        {searchType === "city" && (
          <form className="flex justify-between bg-white rounded-lg w-full">
            <Select
              className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
              options={countryCodes}
              onChange={handleCountryChange}
              placeholder="Country"
              noOptionsMessage={() => "No results"}
            />
            <AsyncSelect
              className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
              loadOptions={loadOptionsCity}
              onChange={handleCityChange}
              placeholder="City, Country code"
              noOptionsMessage={() => "No results"}
            />
          </form>
        )}
        {searchType === "zip" && (
          <form className="flex justify-between bg-white rounded-lg w-full">
            <Select
              className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
              options={countryCodes}
              onChange={handleCountryChange}
              placeholder="Country"
              noOptionsMessage={() => "No results"}
            />
            <AsyncSelect
              className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
              loadOptions={loadOptionsZip}
              onChange={handleZipChange}
              placeholder="Zip code"
              noOptionsMessage={() => "No results"}
            />
          </form>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
