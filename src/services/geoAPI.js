import axios from "axios";

const API_KEY = process.env.REACT_APP_OWM_API_KEY;
const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY

const OWM_URL = "https://api.openweathermap.org/geo/1.0/";
const GOOGLE_URL = "https://maps.googleapis.com/maps/";

const googleAPI = axios.create({ baseURL: GOOGLE_URL });
const owmAPI = axios.create({ baseURL: OWM_URL });

export const geoAPIGetByZip = async( searchInputs, onSubmit, isMetric, setError, setLoading) => {
  const {countryCode, zip} = searchInputs;
  try {
    setError(false);
    setLoading(true);
    const searchResults = await owmAPI.get(`zip?zip=${zip},${countryCode}&APPID=${API_KEY}`)
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
      owmAPI.get(`direct?q=${city},${countryCode}&limit=5&APPID=${API_KEY}`);
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
    const searchResults = await owmAPI.get(`reverse?lat=${lat}&lon=${lon}&limit=${limit}&APPID=${API_KEY}`);
    // console.log(searchResults.data)
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
    // const address = response.data.results[0].address_components
    // const region = address[1].long_name
    // const country = address[address.length - 1].long_name
    const name = response.data.results[0].formatted_address
    if (!response.data.results[0]) {
      throw new Error()
    }
    onSubmit({
      name: name,
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