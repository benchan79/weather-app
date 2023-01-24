// import axios from "axios";

// const API_KEY = process.env.REACT_APP_OWM_API_KEY;
// const BASE_URL = `https://api.openweathermap.org/data/2.5`;
// const PRO_URL = "https://pro.openweathermap.org/data/2.5";

// const baseAPI = axios.create({ baseURL: BASE_URL });
// const proAPI = axios.create({ baseURL: PRO_URL });

const formatApiResponse = (data, searchParams) => {
  let {
    coord: { lat, lon },
    main: { feels_like, temp, temp_min, temp_max, humidity },
    wind: { speed },
    weather: {
      0: { description, icon },
    },
  } = data;
  const state = searchParams.state ? `, ${searchParams.state}` : "";
  const zip = searchParams.zip ? `, (${searchParams.zip})` : "";
  const country = searchParams.country ? `, ${searchParams.country}` : "";
  const name = `${searchParams.name}${state}${country}${zip}`;
  return {
    name,
    lat,
    lon,
    feels_like,
    temp,
    temp_min,
    temp_max,
    humidity,
    speed,
    description,
    icon,
  };
};

const getUrl = async (searchParams) => {
  const { lat, lon, units } = searchParams;
  const url = `/.netlify/functions/owmWeather?lat=${lat}&lon=${lon}&units=${units}`;
  try {
    // const [current, hourly, daily] = await Promise.all([
    //   baseAPI.get("/weather", {
    //     params: {
    //       lat: searchParams.lat,
    //       lon: searchParams.lon,
    //       appid: API_KEY,
    //       units: searchParams.units || "metric",
    //     },
    //   }),
    //   proAPI.get("/forecast/hourly", {
    //     params: {
    //       lat: searchParams.lat,
    //       lon: searchParams.lon,
    //       cnt: 20,
    //       appid: API_KEY,
    //       units: searchParams.units || "metric",
    //     },
    //   }),
    //   baseAPI.get("/forecast/daily", {
    //     params: {
    //       lat: searchParams.lat,
    //       lon: searchParams.lon,
    //       cnt: 15,
    //       appid: API_KEY,
    //       units: searchParams.units || "metric",
    //     },
    //   }),
    // ]);
    const response = await fetch(url).then((res) => res.json());
    let formattedData = formatApiResponse(response.current, searchParams);
    return {
      current: formattedData,
      hourly: response.hourly,
      daily: response.daily,
    };
  } catch (error) {
    console.log(error.message);
  }
};

export default getUrl;
