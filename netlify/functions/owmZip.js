const axios = require("axios");

const BASE_URL = `https://api.openweathermap.org/geo/1.0/`;
const owmAPI = axios.create({ baseURL: BASE_URL });

exports.handler = async function (event, context) {
  // console.log(event);
  // console.log(context);
  try {
    const { zip, countryCode } = event.queryStringParameters;
    const response = await owmAPI.get(
      `zip?zip=${zip},${countryCode}&appid=${process.env.OWM_API_KEY}`
    );
    // console.log(response.data)
    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    console.log(err.message);
    if (err.response) {
      // status code out of the range of 2xx
      console.log("Data :", err.response.data);
      console.log(
        "Status : " + err.response.status + " - " + err.response.statusText
      );
    } else if (err.request) {
      // The request was made but no response was received
      console.log(err.request);
    } else {
      // Error on setting up the request
      console.log("Error message ", err.message);
    }
    return {
      statusCode: err.response.status,
      body: JSON.stringify(err.message),
    };
  }
};
