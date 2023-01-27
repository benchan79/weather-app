# NTU-SCTP Module 2 Capstone Project by Group 3

## Weather App with React

<https://merry-puffpuff-83a00f.netlify.app/>

Group 3 Team Members

- Shayne
- Justin
- Nam Beng
- Ben

***

## Installing using Netlify CLI

We are using netlify functions to access the keys. You have to install the **netlify CLI** and run `netlify dev` instead of `npm start`.

[How to Securely Access Secret API keys using Netlify Functions in a React App](https://www.freecodecamp.org/news/how-to-access-secret-api-keys-using-netlify-functions-in-a-react-app/)  (kindly shared by Jonathan)

First, create a `.env` file in your project's root directory and store your API keys in it.

```text
// .env
OWM_API_KEY="Your-OpenWeatherMap-API-key"
GOOGLE_MAPS_API_KEY="Your-Google-Maps-API-key"
```

Second, add it to your `.gitignore` file.

```text
// .gitignore
# misc
.env
```

Third, install netlify CLI.

```bash
npm install netlify-cli -g
```

Then run the following command to start a local development server on port 8888.

```bash
netlify dev
```

We are using OpenWeather's [**Developer's Plan**](https://openweathermap.org/price#current) which allows the App to fetch daily and hourly forecasts. You will not be able to fetch them if your OpenWeather API key is generated from the [**Free**](https://openweathermap.org/price#current) plan.  

You also have to make sure your Google Maps API key is activated for the following: [**Geocoding API**](https://developers.google.com/maps/documentation/geocoding/cloud-setup) and [**Maps JavaScript API**.](https://developers.google.com/maps/documentation/javascript/cloud-setup).

***

## Installing without Netlify CLI

If you do not plan to deploy using Netlify, then there is no need to install the netlify CLI. However, you do need to append `REACT_APP_` to all the environment variables names in the `.env` file and the frontend script files so that Create-React-App knows where to look for the keys.

For example:

```text
// .env
REACT_APP_OWM_API_KEY="Your-OpenWeatherMap-API-key"
REACT_APP_GOOGLE_MAPS_API_KEY="Your-Google-Maps-API-key"
```

Next you have to go to each of the functions in the **netlify/functions/** folder and transfer the async functions back to the original functions in the frontend. These functions are found in the **services/** folder (geoAPI.js and weatherApi.js) and App.js. Remember to append
`REACT_APP_` to those environment variables.

For example:

```text
const owmApiKey = process.env.REACT_APP_OWM_API_KEY;
```

***

We tried to use netlify functions to get data from **[Google Maps JavaScript API](https://developers.google.com/maps/documentation/javascript)** while using the `@react-google-maps/api` library but were unable to do so as it used a `useJsApiLoader` hook to check for authentication.

An instance of [`ImageMapType`](https://developers.google.com/maps/documentation/javascript/maptypes#ImageMapTypes) class is used to get the Overlays from **[OpenWeatherMap Weather maps API](https://openweathermap.org/api/weathermaps)** by passing an options object with a [`getTileUrl`](https://developers.google.com/maps/documentation/javascript/reference/image-overlay#ImageMapTypeOptions) property. This `getTileUrl` property then specifies a function that returns a string (URL) for the given tile coordinate (x, y) and zoom level. Perhaps it would be possible to get the layers using a Netlify function if the `MapType` Interface was used instead.

Therefore, on hindsight, the keys could have been added directly to Netlify's Enviroment variables as `REACT_APP_OWM_API_KEY` and `REACT_APP_GOOGLE_MAPS_API_KEY` under the advanced settings without the need for the two functions `googleMAp.js` and `owmMap.js`, as they are not used to call the APIs from the server side but only used to fetch the keys.
