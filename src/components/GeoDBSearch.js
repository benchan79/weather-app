import React, { useState } from "react";
import { AsyncPaginate } from "react-select-async-paginate";
import { GEO_API_URL, geoApiOptions } from "../services/geoDbAPI";

const GeoDBSearch = ({ onSearchChange }) => {
  const [search, setSearch] = useState(null);

  const handleOnChange = (searchData) => {
    console.log("search data", searchData);
    setSearch(searchData);
    onSearchChange(searchData);
  };

  const loadOptions = async (inputValue) => {
    const response = await fetch(
      `${GEO_API_URL}/cities?minPopulation=100000&namePrefix=${inputValue}`,
      geoApiOptions
    );
    const result = await response.json();
    setSearch("");
    return {
      options: result.data.map((city) => {
        return {
          label: `${city.name}, ${city.countryCode}`,
          value: `${city.latitude}, ${city.longitude}`,
        };
      }),
    };
  };

  return (
    <AsyncPaginate
      className="font-light w-full shadow-xl bg-transparent h-full p-4 text-black"
      placeholder="Search for the city"
      debounceTimeout={600}
      value={search}
      onChange={handleOnChange}
      loadOptions={loadOptions}
    />
  );
};

export default GeoDBSearch;
