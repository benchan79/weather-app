const googleApiKey = process.env.GOOGLE_MAPS_API_KEY;

exports.handler = async function (event, context) {
  try {
    const response = googleApiKey;
    return {
      statusCode: 200,
      body: JSON.stringify({ apiKey: response }),
    };
  } catch (err) {
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
