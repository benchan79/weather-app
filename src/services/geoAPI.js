import axios from "axios";
import { useContext } from "react";
import WeatherContext from "../contexts/WeatherContext";

const API_KEY = "1e3039792caea495f5c730bd5144ded6";
const BASE_URL = "http://api.openweathermap.org/geo/1.0/";

const geoAPI = axios.create({ baseURL: BASE_URL });

export const geoAPIGetByZip = async( searchInputs, onSubmit, isMetric) => {
  const {countryCode, zip} = searchInputs; 
  try {
    const [searchResults] = await Promise.all([
      geoAPI.get(`zip?zip=${zip},${countryCode}&APPID=${API_KEY}`),
    ])
    console.log(searchResults.data)
    const result = {
      name: searchResults.data.name,
      country: searchResults.data.country,
      zip: searchResults.data.zip,
      lat: searchResults.data.lat,
      lon: searchResults.data.lon,
      units: isMetric ? 'metric' : 'imperial'
    }
    onSubmit(result)
  } catch (error) {
    console.log(error.message);
  }
}

export const geoAPIGetByCity = async (searchValue, callback) => {
  const [city, countryCode] = searchValue.split(",");
  let options = [];
  try {
    const [searchResults] = await Promise.all([
      geoAPI.get(`direct?q=${city},${countryCode}&limit=5&APPID=${API_KEY}`),
    ]);
    // console.log(searchResults.data);
    searchResults.data.map((city) =>
      options.push({
        label: `${city.name}, ${city.state ? city.state + ", " : ""}${
          city.country
        }`,
        value: {
          name: city.name,
          state: city.state,
          country: city.country,
          lat: city.lat,
          lon: city.lon,
        },
      })
    );
    return options;
  } catch (error) {
    console.log(error.message);
  }
  callback(options);
};

export const geoAPIGetByCoords = async(searchInputs, onSubmit, isMetric) => {
  const {lat, lon, limit} = searchInputs; 
  try {
    const [searchResults] = await Promise.all([
      geoAPI.get(`reverse?lat=${lat}&lon=${lon}&limit=${limit}&APPID=${API_KEY}`),
    ])
    console.log(searchResults.data[0])
    onSubmit({...searchResults.data[0], units: isMetric ? 'metric' : 'imperial'})
  } catch (error) {
    console.log(error.message);
  }
}