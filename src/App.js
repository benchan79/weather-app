import './App.css';

import { useState, useEffect } from 'react';

import SearchBar from './components/SearchBar.js';
import CurrentDisplay from './components/CurrentDisplay';
import WeeklyDisplay from './components/WeeklyDisplay';
import HourlyDisplay from './components/HourlyDisplay';
import getUrl from './services/weatherApi';

function App() {
  
  const [location, setLocation] = useState('singapore');

  // get data upon search submit
  // NOTE: datatype weather is currently hardcoded
  const getSearchData = (searchInputs) => {
    setLocation(searchInputs);
  }

  useEffect(() => {
    getUrl('weather', location)
  }, [location])

  return (
    <div className='App'>
      <div className="bg-gradient-to-r from-blue-400 to-cyan-600 p-10">
        <div className='mx-auto max-w-screen-md h-fit'>
          <SearchBar onSubmit={getSearchData}/>
        </div>
        <div className='mx-auto max-w-screen-md h-fit shadow-xl p-10 bg-white bg-opacity-75 mt-10'>
          <CurrentDisplay />
        </div>
        <div className='mx-auto max-w-screen-md h-fit shadow-xl p-10 bg-white bg-opacity-75 mt-10'>
          <HourlyDisplay />
          <WeeklyDisplay />
        </div>
    </div>
    </div>
  );
}

export default App;
