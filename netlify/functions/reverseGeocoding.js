const axios = require("axios");

const BASE_URL = `https://maps.googleapis.com/maps/api/`;
const googleAPI = axios.create({ baseURL: BASE_URL });
// https://maps.googleapis.com/maps/api/geocode/json?latlng=40.714224,-73.961452&key=YOUR_API_KEY

exports.handler = async function (event, context) {
  // console.log(event);
  // console.log(context);
  try {
    const { lat, lon } = event.queryStringParameters;
    // console.log(lat, lon)
    const response = await googleAPI.get(
      `geocode/json?latlng=${lat},${lon}&key=${process.env.GOOGLE_MAPS_API_KEY}`
    );

    return {
      statusCode: 200,
      body: JSON.stringify(response.data),
    };
  } catch (err) {
    console.log(err.message);
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
      body: JSON.stringify(err.response.data),
    };
  }
};
