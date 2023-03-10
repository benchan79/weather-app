// import { PersonPlus } from 'react-bootstrap-icons';
import {
  FaArrowUp,
  FaArrowDown,
  FaThermometer,
  FaWind,
  FaWater,
} from "react-icons/fa";
// import { FaSun, FaCloudRain, FaCloud, FaRegSnowflake, FaThunderstorm } from 'react-icons/fa';
import UnitsSelector from "./UnitsSelector";
import { useContext } from "react";
import WeatherContext from "../contexts/WeatherContext";

function CurrentDisplay({ weather, searchParam, getSearchData }) {
  const ctx = useContext(WeatherContext);

  return (
    <>
      <div className="flex flex-row w-full justify-center text-blue-800">
        <div>
          <div className="text-center">
            <h1 className="text-xl font-semibold">{weather.name}</h1>
            <p className="font-light text-xl">{weather.description}</p>
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-x-8 sm:pb-1">
            <div className="flex flex-col sm:flex-row align-center items-center py-10">
              {/* <FaSun size={100} /> */}
              <img
                src={`https://openweathermap.org/img/wn/${weather.icon}@2x.png`}
                alt=""
              />
              <div className="ml-5">
                <div className="font-light text-center text-8xl whitespace-nowrap flex flex-row">
                  {weather.temp.toFixed(1)}
                  <UnitsSelector
                    searchParam={searchParam}
                    getSearchData={getSearchData}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:flex-col sm:pb-4 gap-y-3">
              <div className="flex flex-row">
                <div className="flex items-center gap-x-2 mr-4">
                  <FaArrowUp />
                  <p className="font-light whitespace-nowrap">
                    High: {weather.temp_max.toFixed(1)}{" "}
                    {ctx.isMetric ? "°C" : "°F"}
                  </p>
                </div>
                <div className="flex items-center gap-x-2">
                  <FaArrowDown />
                  <p className="font-light whitespace-nowrap">
                    Low: {weather.temp_min.toFixed(1)}{" "}
                    {ctx.isMetric ? "°C" : "°F"}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <FaThermometer />
                <p className="font-light whitespace-nowrap">
                  Feels like {weather.feels_like.toFixed(1)}{" "}
                  {ctx.isMetric ? "°C" : "°F"}
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <FaWind />
                <p className="font-light whitespace-nowrap">
                  Wind {weather.speed.toFixed(1)}{" "}
                  {ctx.isMetric ? "m/s" : "ft/s"}
                </p>
              </div>
              <div className="flex items-center gap-x-2">
                <FaWater />
                <p className="font-light whitespace-nowrap">
                  Humidity: {weather.humidity.toFixed(1)}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CurrentDisplay;
