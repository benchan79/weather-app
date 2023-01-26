import axios from "axios";

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
    const searchResults = await axios.get(url);
    const result = {
      name: searchResults.data.name,
      country: searchResults.data.country,
      zip: searchResults.data.zip,
      lat: searchResults.data.lat,
      lon: searchResults.data.lon,
      units: isMetric ? "metric" : "imperial",
    };
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
    const searchResults = await axios.get(url);
    console.log(searchResults.data);
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
    const response = await axios.get(url);
    if (!response.data.results[0]) {
      throw new Error(response.data.status);
    }
    const name = response.data.results[0].formatted_address;

    // let fullName = "";
    // for (const address of response.data.results[0].address_components) {
    //   fullName += `${address.long_name}, `
    // }
    // console.log(fullName.slice(0, fullName.length - 2))

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
    console.log(
      error.response ? error.response.data.error_message : error.message
    );
  }
};
