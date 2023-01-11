import './App.css';
import axios from 'axios';

import { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar.js';
import CurrentDisplay from './components/CurrentDisplay';
import WeeklyDisplay from './components/WeeklyDisplay';
import HourlyDisplay from './components/HourlyDisplay';
import getUrl from './services/weatherApi';
import TableCurrent from './components/TableCurrent';
import TableForecast from './components/TableForecast';

function App() {
  
  const [searchParam, setSearchParam] = useState(null);
  const [dataType, setDataType] = useState(null);
  const [weather, setWeather] = useState(null);

  // Sample code to use searchParam to get current weather and forecast weather together:
  // Uncomment this and bottom <div> to see sample data and table
  // Also edited getURL to search by lat and lon.
  // The drawback of searching by lat and lon is that the name is sometimes inaccurate.
  // You may need to format the UI to take the name from searchParam instead (eg. searchParam.name)
  // searchParam also returns data like country code, state (where available), and local names.
  // I only retrieved the first result out of a possible 5 for location search.
  // For a common city name like "Franklin", the user should include the country code separated by a comma
  // Eg: "Franklin, AU" or "Franklin, US"
  //============================================================================
  // const [currentWeather, setCurrentWeather] = useState("");
  // const [forecastWeather, setForecastWeather] = useState("");
  // const myKey = "92fc5bd07e7c2e622ac3a9b5df3cce07";
  // const myUnits = "metric";
  // const BASE_URL= `https://api.openweathermap.org/data/2.5`;
  // const openWeatherAPI = axios.create({  baseURL: BASE_URL });
  // const ApiGet = async() => {
  //   // deconstruct searchParam
  //   // Can also extract other values like name, country, state and zip.
  //   const {lat, lon} = searchParam;
  //   try {
  //     const [current, forecast] =
  //       await Promise.all([
  //         openWeatherAPI.get(
  //           `weather?lat=${lat}&lon=${lon}&APPID=${myKey}&units=${myUnits}`
  //         ),
  //         openWeatherAPI.get(
  //           `forecast?lat=${lat}&lon=${lon}&APPID=${myKey}&units=${myUnits}`
  //         ),
  //       ]);
  //     console.log(current.data);
  //     console.log(forecast.data);
  //     setCurrentWeather(current.data);
  //     setForecastWeather(forecast.data);
  //   } catch (error) {
  //     console.log(error.message);
  //   }
  // }
//============================================================================

  // get data upon search submit
  const getSearchData = (searchInputs) => {
    setSearchParam(searchInputs);
    setDataType('weather');
  }

  // useEffect(() => {
  //   getUrl(dataType, searchParam);
  // }, [searchParam]);

  useEffect(() => {
    const fetchUrlData = async() => await getUrl(dataType, searchParam)
      .then((res) => {
        setWeather(res);
      })
    fetchUrlData();
  }, [searchParam])

  return (
    <div className='App'>
      <div className="bg-gradient-to-r from-blue-400 to-cyan-600 p-10">
        <div className='mx-auto max-w-screen-md h-fit'>
          <SearchBar onSubmit={getSearchData}/>
        </div>
        {/* below components only show when search returns weather data */}
        {weather && (
          <div>
            <div className='mx-auto max-w-screen-md h-fit shadow-xl p-10 bg-white bg-opacity-75 mt-10'>
              <CurrentDisplay weather={weather} />
            </div>
            <div className='mx-auto max-w-screen-md h-fit shadow-xl p-10 bg-white bg-opacity-75 mt-10'>
              <HourlyDisplay />
              <WeeklyDisplay />
            </div>
          </div>
        )}
      </div>
      {/* Uncomment below <div> to see the search results */}
      {/* <div>
          <p>Zip Result</p>
          <p>Postal Code: {searchParam && searchParam.zip}</p>
          <p>Name: {searchParam && searchParam.name}</p>
          <p>Country: {searchParam && searchParam.country}</p>
          <p>State: {searchParam && searchParam.state}</p>
          <p>Latitude: {searchParam && searchParam.lat}</p>
          <p>Longitude: {searchParam && searchParam.lon}</p>
          <hr/>
          <p/>
          <button onClick={ApiGet}>Click me to Get Weather data and Show tables</button>

          {currentWeather && <TableCurrent data={currentWeather}/>}
          {forecastWeather && <TableForecast data={forecastWeather} />}
      </div> */}
    </div>
  );
}

export default App;
