import axios from "axios";

const API_KEY = "1e3039792caea495f5c730bd5144ded6";
const BASE_URL = "http://api.openweathermap.org/geo/1.0/";

const geoAPI = axios.create({ baseURL: BASE_URL });

export const geoAPIGetByZip = async (searchInputs, onSubmit) => {
  const { zip } = searchInputs;
  try {
    const [searchResults] = await Promise.all([
      geoAPI.get(`zip?zip=${zip},SG&APPID=${API_KEY}`),
    ]);
    console.log(searchResults.data);
    const result = {
      name: searchResults.data.name,
      country: searchResults.data.country,
      zip: searchResults.data.zip,
      lat: searchResults.data.lat,
      lon: searchResults.data.lon,
    };
    onSubmit(result);
  } catch (error) {
    console.log(error.message);
  }
};

export const geoAPIGetByCity = async (searchValue, callback) => {
  const [city, countryCode] = searchValue.split(",");
  let optionz = [];
  try {
    const [searchResults] = await Promise.all([
      geoAPI.get(`direct?q=${city},${countryCode}&limit=5&APPID=${API_KEY}`),
    ]);
    // console.log(searchResults.data);
    searchResults.data.map((city) =>
      optionz.push({
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
    return optionz;
  } catch (error) {
    console.log(error.message);
  }
  callback(optionz);
};
