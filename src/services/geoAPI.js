import axios from "axios";

const API_KEY = "1e3039792caea495f5c730bd5144ded6";
const GOOGLE_MAPS_API_KEY = "AIzaSyBSz9oqHd19uT1u2TLAK5oU0niFKN6Rgw8"

const BASE_URL = "https://api.openweathermap.org/geo/1.0/";
const GOOGLE_URL = "https://maps.googleapis.com/maps/";

const googleAPI = axios.create({ baseURL: GOOGLE_URL });
const geoAPI = axios.create({ baseURL: BASE_URL });

export const geoAPIGetByZip = async( searchInputs, onSubmit, isMetric, setError, setLoading) => {
  const {countryCode, zip} = searchInputs;
  try {
    setError(false);
    setLoading(true);
    const searchResults = await geoAPI.get(`zip?zip=${zip},${countryCode}&APPID=${API_KEY}`)
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
    setLoading(false);
  } catch (error) {
    setError(true);
    setLoading(false)
    console.log(error.message);
  }
}

export const geoAPIGetByCity = async (searchValue, callback) => {
  const [city, countryCode] = searchValue.split(",");
  let options = [];
  try {
    const searchResults = await 
      geoAPI.get(`direct?q=${city},${countryCode}&limit=5&APPID=${API_KEY}`);
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

export const geoAPIGetByCoords = async(searchInputs, onSubmit, isMetric, setError, setLoading) => {
  const {lat, lon, limit} = searchInputs; 
  try {
    setError(false);
    setLoading(true);
    const searchResults = await geoAPI.get(`reverse?lat=${lat}&lon=${lon}&limit=${limit}&APPID=${API_KEY}`);
    console.log(searchResults.data)
    if (!searchResults.data[0]) {
      throw new Error()
    }
    onSubmit({...searchResults.data[0], units: isMetric ? 'metric' : 'imperial'})
    setLoading(false);
  } catch (error) {
    setError(true);
    setLoading(false)
    console.log(error.message);
  }
}

export const googleReverseGeocoding = async(searchInputs, onSubmit, isMetric, setError, setLoading) => {
  const {lat, lon} = searchInputs; 
  try {
    setError(false);
    setLoading(true);
    const response = await googleAPI.get(`api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}`)
    const address = response.data.results[0].address_components
    const region = address[1].long_name
    const country = address[address.length - 1].long_name
    // console.log(response.data.results[0].formatted_address)
    if (!response.data.results[0]) {
      throw new Error()
    }
    onSubmit({
      name: region,
      country: country,
      lat: lat,
      lon: lon,
      units: isMetric ? 'metric' : 'imperial'})
    setLoading(false);
  } catch (error) {
    setError(true);
    setLoading(false)
    console.log(error.message);
  }
}