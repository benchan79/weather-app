import "./App.css";

import { useState, useEffect, useContext } from "react";

import SearchBar from "./components/SearchBar.js";
import CurrentDisplay from "./components/CurrentDisplay";
import DailyDisplay from "./components/DailyDisplay";
import HourlyDisplay from "./components/HourlyDisplay";
import getUrl from "./services/weatherApi";
import WeatherContext from "./contexts/WeatherContext";
import Conditions from "./components/Conditions";
import MapDisplay from "./components/MapDisplay";

function App() {
  const [searchParam, setSearchParam] = useState(null);
  const [weather, setWeather] = useState(null);
  const [hourlyFcast, setHourlyFcast] = useState(null);
  const [dailyFcast, setDailyFcast] = useState(null);
  const ctx = useContext(WeatherContext);
  const [apiKey, setApiKey] = useState("");
  const [owmKey, setOwmKey] = useState("");

  const getSearchData = (searchInputs) => {
    setSearchParam(searchInputs);
  };

  useEffect(() => {
    const fetchUrlData = async () =>
      searchParam
        ? await getUrl(searchParam, ctx.setError, ctx.setLoading).then(
            (res) => {
              setWeather(res.current);
              setHourlyFcast(res.hourly);
              setDailyFcast(res.daily);
            }
          )
        : null;
    fetchUrlData();
    // eslint-disable-next-line
  }, [searchParam]);

  useEffect(() => {
    getGmapKey();
    getOwmKey();
  }, []);

  const getGmapKey = async () => {
    const url = `/.netlify/functions/googleMaps`;
    try {
      const response = await fetch(url).then((res) => res.json());
      setApiKey(response.apiKey);
    } catch (error) {
      console.log(error);
    }
  };

  const getOwmKey = async () => {
    const url = `/.netlify/functions/owmMap`;
    try {
      const response = await fetch(url).then((res) => res.json());
      setOwmKey(response.apiKey);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <div className="bg-gradient-to-r from-blue-400 to-cyan-600 p-10">
        <div className="mx-auto max-w-screen-md h-fit flex">
          <SearchBar onSubmit={getSearchData} searchParam={searchParam} />
        </div>

        {weather && !ctx.error && !ctx.loading ? (
          <div>
            <div className="mx-auto max-w-screen-md h-fit shadow-xl pt-10 bg-white bg-opacity-75 mt-10 rounded-2xl">
              <CurrentDisplay
                weather={weather}
                searchParam={searchParam}
                getSearchData={getSearchData}
              />
            </div>
            <div className="mx-auto max-w-screen-md h-fit shadow-xl p-10 bg-white bg-opacity-75 mt-10 rounded-2xl">
              <HourlyDisplay weather={hourlyFcast} />
              <DailyDisplay weather={dailyFcast} />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-screen-md h-fit flex-col justify-center">
            <Conditions error={ctx.error} loading={ctx.loading} />
          </div>
        )}

        {apiKey && weather ? (
          <div className="p-10 bg-white bg-opacity-75 mt-10 rounded-2xl">
            <MapDisplay
              weather={weather}
              searchParam={searchParam}
              onSubmit={getSearchData}
              apiKey={apiKey}
              owmKey={owmKey}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
