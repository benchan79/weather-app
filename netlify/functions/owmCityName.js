const axios = require("axios");

const BASE_URL = `https://api.openweathermap.org/geo/1.0/`;
const owmAPI = axios.create({ baseURL: BASE_URL });
// https://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={API_key}
const owmApiKey = process.env.OWM_API_KEY;

exports.handler = async function (event, context) {
  try {
    const { city, countryCode } = event.queryStringParameters;
    const response = await owmAPI.get(
      `direct?q=${city},${countryCode}&limit=5&appid=${owmApiKey}`
    );
    // console.log(response.data[0])
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    console.log(`owm: err`);
    if (err.response) {
      // status code out of the range of 2xx
      console.log("Data :", err.response.data);
      console.log("Status :" + err.response.status);
    } else if (err.request) {
      // The request was made but no response was received
      console.log(err.request);
    } else {
      // Error on setting up the request
      console.log("Error", err.message);
    }
    return {
      statusCode: err.response.status,
      body: JSON.stringify(err.message),
    };
  }
};
