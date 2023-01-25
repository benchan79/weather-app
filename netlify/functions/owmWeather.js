const axios = require("axios");

const BASE_URL = `https://api.openweathermap.org/data/2.5/`;
const PRO_URL = "https://pro.openweathermap.org/data/2.5";
const baseAPI = axios.create({ baseURL: BASE_URL });
const proAPI = axios.create({ baseURL: PRO_URL });

// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API_key}&units=metric

exports.handler = async function (event, context) {
  // console.log(event);
  // console.log(context);
  try {
    const { lat, lon, units } = event.queryStringParameters;
    // console.log(lat, lon)
    const [current, hourly, daily] = await Promise.all([
      baseAPI.get("/weather", {
        params: {
          lat: lat,
          lon: lon,
          appid: process.env.OWM_API_KEY,
          units: units || "metric",
        },
      }),
      proAPI.get("/forecast/hourly", {
        params: {
          lat: lat,
          lon: lon,
          cnt: 20,
          appid: process.env.OWM_API_KEY,
          units: units || "metric",
        },
      }),
      baseAPI.get("/forecast/daily", {
        params: {
          lat: lat,
          lon: lon,
          cnt: 15,
          appid: process.env.OWM_API_KEY,
          units: units || "metric",
        },
      }),
    ]);
    // console.log(response.data[0])'

    return {
      statusCode: 200,
      body: JSON.stringify({
        current: current.data,
        hourly: hourly.data,
        daily: daily.data,
      }),
    };
  } catch (err) {
    console.log(`owm: err`)
    if (err.response) { // status code out of the range of 2xx
      console.log("Data :" , err.response.data);
      console.log("Status :" + err.response.status);
    } else if (err.request) { // The request was made but no response was received
      console.log(err.request);
    } else {// Error on setting up the request
      console.log('Error', err.message);
    }
    return {
      statusCode: err.response.status,
      body: JSON.stringify(err.message),
    };
  }
};