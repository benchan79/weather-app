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
    onSubmit(searchResults.data)
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
    onSubmit(searchResults.data[0])
  } catch (error) {
    console.log(error.message);
  }
}

