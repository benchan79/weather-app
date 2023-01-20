// import {FaSun, FaCloudRain, FaCloud, FaRegSnowflake,IoMdThunderstorm, FaSearch} from 'react-icons/fa';
import { useState, useContext} from 'react'
import WeatherContext from "../contexts/WeatherContext";

function HourlyDisplay({ weather }) {
  const icon_URL = "http://openweathermap.org/img/wn/";
  const ctx = useContext(WeatherContext);
  const [hoursCount, sethoursCount] = useState(0);

  function timeConverter(timestamp) {
    const date = new Date((timestamp + weather.city.timezone - 28800) * 1000);
    const timeString = date.toLocaleTimeString().split(" ");
    const formattedTime = `${timeString[0].slice(0, -3)} ${timeString[1]}`;
    return formattedTime;
  }

  const handleForward = () => {
    sethoursCount((prev) => prev + 5);
  };

  const handleBack = () => {
    sethoursCount((prev) => prev - 5);
  };

  return (
    <>
      <div className="text-blue-800">
        <div className="flex items-center justify-start">
          <p>Hourly Forecast</p>
        </div>
        <hr className="my-3" />
        <div className="flex flex-row items-center justify-between">
        {hoursCount !== 0 ? (
            <button onClick={handleBack} style={{fontSize: 25}}>{"<"}</button>
          ) : (
            <span style={{fontSize: 25}}>&nbsp;&nbsp;</span>
          )}
          {weather.list.slice(hoursCount, hoursCount + 5).map((hour) => (
            <div className="flex flex-col items-center" key={hour.dt} >
              <p className="font-light text-sm">{timeConverter(hour.dt)}</p>
              <p className="font-light text-sm">{hour.weather[0].description}</p>
              <img src={`${icon_URL}${hour.weather[0].icon}@2x.png`} alt="" />
              <p>{hour.main.temp.toFixed(1)} {ctx.isMetric ? '°C' : '°F'}</p>
              
            </div>
          ))}
          {hoursCount <= 10 ? (
            <button onClick={handleForward} style={{fontSize: 25}}>{">"}</button>
          ) : (
            <span style={{fontSize: 25}}>&nbsp;&nbsp;</span>
          )}
        </div>
      </div>
    </>
  );
}

export default HourlyDisplay;