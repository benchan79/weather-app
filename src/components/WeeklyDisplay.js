import { FaSun, FaCloudRain, FaCloud, FaRegSnowflake } from "react-icons/fa";

function WeeklyForecast({ weather }) {
  const icon_URL = "http://openweathermap.org/img/wn/";

  function timeConverter(timestamp) {
    const date = new Date((timestamp + weather.city.timezone - 28800) * 1000);
    const dateString = date.toDateString().split(" ");
    const formattedDate = `${dateString[0]}, ${dateString[2]} ${dateString[1]}`
    return formattedDate;
  }

  return (
    <>
      <div className="text-blue-800 mt-10">
        <div className="flex items-center justify-start">
          <p>Daily Forecast</p>
        </div>
        <hr className="my-3" />
        <div className="flex flex-row items-center justify-between">
          {weather.list.map((day) => (
            <div className="flex flex-col items-center">
              <p className="font-light text-sm">{timeConverter(day.dt)}</p>
              <img src={`${icon_URL}${day.weather[0].icon}@2x.png`} alt="" />
              <p>{day.temp.day.toFixed(1)}°C</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default WeeklyForecast;
