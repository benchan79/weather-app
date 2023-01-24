// import axios from "axios";

// const API_KEY = process.env.REACT_APP_OWM_API_KEY;
// const GOOGLE_MAPS_API_KEY = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;

// const OWM_URL = "https://api.openweathermap.org/geo/1.0/";
// const GOOGLE_URL = "https://maps.googleapis.com/maps/";

// const googleAPI = axios.create({ baseURL: GOOGLE_URL });
// const owmAPI = axios.create({ baseURL: OWM_URL });

export const geoAPIGetByZip = async (
  searchInputs,
  onSubmit,
  isMetric,
  setError,
  setLoading
) => {
  const { countryCode, zip } = searchInputs;
  const url = `/.netlify/functions/owmZip?zip=${zip}&countryCode=${countryCode}`;
  try {
    setError(false);
    setLoading(true);
    // const searchResults = await owmAPI.get(
    //   `zip?zip=${zip},${countryCode}&APPID=${API_KEY}`
    // );
    const searchResults = await fetch(url).then((res) => res.json());
    const result = {
      name: searchResults.name,
      country: searchResults.country,
      zip: searchResults.zip,
      lat: searchResults.lat,
      lon: searchResults.lon,
      units: isMetric ? "metric" : "imperial",
    };
    // console.log(result)
    onSubmit(result);
    setLoading(false);
  } catch (error) {
    setError(true);
    setLoading(false);
    console.log(error.message);
  }
};

export const geoAPIGetByCity = async (searchValue, callback) => {
  const [city, countryCode] = searchValue.split(",");
  let options = [];
  const url = `/.netlify/functions/owmCityName?city=${city}&countryCode=${countryCode}`;
  try {
    // const searchResults = await owmAPI.get(
    //   `direct?q=${cityName},${countryCode}&limit=5&APPID=${API_KEY}`
    // );
    const searchResults = await fetch(url).then((res) => res.json());
    searchResults.map((city) =>
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

export const googleReverseGeocoding = async (
  searchInputs,
  onSubmit,
  isMetric,
  setError,
  setLoading
) => {
  const { lat, lon } = searchInputs;
  const url = `/.netlify/functions/reverseGeocoding?lat=${lat}&lon=${lon}`;
  try {
    setError(false);
    setLoading(true);
    // const response = await googleAPI.get(
    //   `api/geocode/json?latlng=${lat},${lon}&key=${GOOGLE_MAPS_API_KEY}`
    // );
    const response = await fetch(url).then((res) => res.json());
    const name = response.results[0].formatted_address;
    // console.log(name);
    if (!response.results[0]) {
      throw new Error();
    }
    onSubmit({
      name: name,
      lat: +lat,
      lon: +lon,
      units: isMetric ? "metric" : "imperial",
    });
    setLoading(false);
  } catch (error) {
    setError(true);
    setLoading(false);
    console.log(error.message);
  }
};
