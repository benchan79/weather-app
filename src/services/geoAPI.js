import axios from 'axios';

const API_KEY = "92fc5bd07e7c2e622ac3a9b5df3cce07";
const BASE_URL = "http://api.openweathermap.org/geo/1.0/";

const geoAPI = axios.create({  baseURL: BASE_URL });

export const geoAPIGetByZip = async( searchInputs, onSubmit) => {
  const {zip} = searchInputs; 
  try {
    const [searchResults] = await Promise.all([
      geoAPI.get(`zip?zip=${zip},SG&APPID=${API_KEY}`),
    ])
    console.log(searchResults.data)
    const result = {
      name: searchResults.data.name,
      country: searchResults.data.country,
      zip: searchResults.data.zip,
      lat: searchResults.data.lat,
      lon: searchResults.data.lon
    }
    onSubmit(result)
  } catch (error) {
    console.log(error.message);
  }
}

export const geoAPIGetByCity = async( searchInputs, onSubmit) => {
  const {city, countryCode, limit} = searchInputs; 

  try {
    const [searchResults] = await Promise.all([
      geoAPI.get(`direct?q=${city},${countryCode}&limit=${limit}&APPID=${API_KEY}`),
    ])
    console.log(searchResults.data[0])
    const result = {
      name: searchResults.data[0].name,
      country: searchResults.data[0].country,
      state: searchResults.data[0].state,
      lat: searchResults.data[0].lat,
      lon: searchResults.data[0].lon
    }
    onSubmit(result)
  } catch (error) {
    console.log(error.message);
  }
}

export const geoAPIGetByCoords = async(searchInputs, onSubmit) => {
  const {lat, lon, limit} = searchInputs; 
  try {
    const [searchResults] = await Promise.all([
      geoAPI.get(`reverse?lat=${lat}&lon=${lon}&limit=${limit}&APPID=${API_KEY}`),
    ])
    console.log(searchResults.data[0])
    onSubmit(searchResults.data[0])
  } catch (error) {
    console.log(error.message);
  }
}
