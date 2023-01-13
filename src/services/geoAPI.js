import axios from "axios";

const API_KEY = "1e3039792caea495f5c730bd5144ded6";
const BASE_URL = "http://api.openweathermap.org/geo/1.0/";

const geoAPI = axios.create({ baseURL: BASE_URL });

export const geoAPIGetByZip = async (countryCode, searchValue, callback) => {
  let options = [];
  try {
    const [searchResults] = await Promise.all([
      geoAPI.get(`zip?zip=${searchValue},${countryCode}&APPID=${API_KEY}`),
    ]);
    // console.log(searchResults.data);
    const city = searchResults.data;
    options.push({
      label: `${city.name}, ${city.state ? city.state + ", " : ""}${city.country} ${city.zip}`,
      value: {
        name: city.name,
        state: city.state,
        country: city.country,
        lat: city.lat,
        lon: city.lon,
        zip: city.zip,
      },
    });
    return options;
  } catch (error) {
    console.log(error.message);
  }
  callback(options);
};

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