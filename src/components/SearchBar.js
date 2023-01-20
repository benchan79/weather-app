import { useState, useContext } from "react";
import { geoAPIGetByZip, geoAPIGetByCity } from "../services/geoAPI";
import { FaSearch } from "react-icons/fa";
import Select from "react-select";
import AsyncSelect from "react-select/async";
import { countryCodes } from "../data/countries";
import WeatherContext from "../contexts/WeatherContext";
import { googleReverseGeocoding } from "../services/geoAPI";

const initialState = {
  countryCode: "",
  zip: "",
  lat: "",
  lon: "",
  limit: 5,
};

const SearchBar = ({ onSubmit }) => {
  const ctx = useContext(WeatherContext);
  const [searchType, setSearchType] = useState("city");
  const [searchInputs, setSearchInputs] = useState(initialState);

  const handleSearchType = (e) => {
    setSearchType(e.target.value);
    setSearchInputs(initialState);
  };

  const loadOptionsCity = (searchValue, callback) => {
    return geoAPIGetByCity(searchValue, callback);
  };

  const handleSubmitCity = (selectedOption) => {
    const selection = selectedOption.value;
    onSubmit({ ...selection, units: ctx.isMetric ? "metric" : "imperial" });
    ctx.setError(false);
  };

  const handleCountryChange = (selectedOption) => {
    setSearchInputs({
      ...searchInputs,
      countryCode: selectedOption.value,
    });
  };

  const handleSubmitZip = (event) => {
    event.preventDefault();
    if (!searchInputs.zip || !searchInputs.countryCode) {
      return ctx.setError(true);
    }
    geoAPIGetByZip(
      searchInputs,
      onSubmit,
      ctx.isMetric,
      ctx.setError,
      ctx.setLoading
    );
  };

  const handleSubmitCoord = (event) => {
    event.preventDefault();
    if (!searchInputs.lat || !searchInputs.lon) {
      return ctx.setError(true);
    }
    googleReverseGeocoding(
      searchInputs,
      onSubmit,
      ctx.isMetric,
      ctx.setError,
      ctx.setLoading
    );
  };

  const handleInputChange = (event) => {
    event.preventDefault();
    setSearchInputs({
      ...searchInputs,
      [event.target.name]: event.target.value,
    });
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
        <div>
          <input type="radio" name="search_type" value="coord" />
          <label htmlFor="html">&nbsp; Search by Coordinates</label>
        </div>
      </div>
      <div className="flex flex-row justify-center w-full">
        {searchType === "city" && (
          <form className="flex justify-between bg-white rounded-lg w-full">
            <AsyncSelect
              className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
              loadOptions={loadOptionsCity}
              onChange={handleSubmitCity}
              placeholder="City, Country code"
              noOptionsMessage={() => "No results"}
            />
          </form>
        )}
        {searchType === "zip" && (
          <form
            onSubmit={handleSubmitZip}
            className="flex justify-between bg-white rounded-lg w-full"
          >
            <Select
              className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
              options={countryCodes}
              onChange={handleCountryChange}
              placeholder="Country"
              noOptionsMessage={() => "No results"}
            />
            <input
              onChange={handleInputChange}
              className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
              name="zip"
              type="text"
              placeholder="Zip Code"
              value={searchInputs.zip}
            />
            <button onClick={handleSubmitZip} className="p-4">
              <FaSearch size={20} />
            </button>
          </form>
        )}
        {searchType === "coord" && (
          <form
            onSubmit={handleSubmitCoord}
            className="flex justify-between bg-white rounded-lg w-full gap-10"
          >
            <input
              onChange={handleInputChange}
              className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
              name="lat"
              type="text"
              placeholder="Latitude"
              value={searchInputs.lat}
            />
            <input
              onChange={handleInputChange}
              className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
              name="lon"
              type="text"
              placeholder="Longitude"
              value={searchInputs.lon}
            />
            <button onClick={handleSubmitCoord} className="p-4">
              <FaSearch size={20} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
