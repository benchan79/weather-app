import './App.css';

import { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar.js';
import CurrentDisplay from './components/CurrentDisplay';
import WeeklyDisplay from './components/WeeklyDisplay';
import HourlyDisplay from './components/HourlyDisplay';
import getUrl from './services/weatherApi';

function App() {
  
  const [searchParam, setSearchParam] = useState(null);
  const [dataType, setDataType] = useState(null);
  const [weather, setWeather] = useState(null);

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
    </div>
  );
}

export default App;
