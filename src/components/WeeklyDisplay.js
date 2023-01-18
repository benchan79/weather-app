// import { FaSun, FaCloudRain, FaCloud, FaRegSnowflake } from "react-icons/fa";
import { useState, useContext } from "react";
import WeatherContext from "../contexts/WeatherContext";

function WeeklyForecast({ weather }) {
  const icon_URL = "http://openweathermap.org/img/wn/";
  const ctx = useContext(WeatherContext);
  const [daysCount, setDaysCount] = useState(0);

  function timeConverter(timestamp) {
    const date = new Date((timestamp + weather.city.timezone - 28800) * 1000);
    const dateString = date.toDateString().split(" ");
    const formattedDate = `${dateString[0]}, ${dateString[2]} ${dateString[1]}`;
    return formattedDate;
  }

  const handleForward = () => {
    setDaysCount((prev) => prev + 5);
  };

  const handleBack = () => {
    setDaysCount((prev) => prev - 5);
  };

  return (
    <>
      <div className="text-blue-800 mt-10">
        <div className="flex items-center justify-start">
          <p>Daily Forecast</p>
        </div>
        <hr className="my-3" />
        <div className="flex flex-row items-center justify-between">
          {daysCount !== 0 ? (
            <button onClick={handleBack} style={{fontSize: 25}}>{"<"}</button>
          ) : (
            <span style={{fontSize: 25}}>&nbsp;&nbsp;</span>
          )}
          {weather.list.slice(daysCount, daysCount + 5).map((day) => (
            <div className="flex flex-col items-center" key={day.dt}>
              <p className="font-light text-sm">{timeConverter(day.dt)}</p>
              <img src={`${icon_URL}${day.weather[0].icon}@2x.png`} alt="" />
              <p>
                {day.temp.day.toFixed(1)} {ctx.isMetric ? "°C" : "°F"}
              </p>
            </div>
          ))}
          {daysCount <= 5 ? (
            <button onClick={handleForward} style={{fontSize: 25}}>{">"}</button>
          ) : (
            <span style={{fontSize: 25}}>&nbsp;&nbsp;</span>
          )}
        </div>
      </div>
    </>
  );
}

export default WeeklyForecast;
