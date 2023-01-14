import {FaSun, FaCloudRain, FaCloud, FaRegSnowflake,IoMdThunderstorm, FaSearch} from 'react-icons/fa';

function HourlyDisplay({ weather }) {
  const icon_URL = "http://openweathermap.org/img/wn/";

  function timeConverter(timestamp) {
    const date = new Date((timestamp + weather.city.timezone - 28800) * 1000);
    const timeString = date.toLocaleTimeString().split(" ");
    const formattedTime = `${timeString[0].slice(0, -3)} ${timeString[1]}`;
    return formattedTime;
  }

  return (
    <>
      <div className="text-blue-800">
        <div className="flex items-center justify-start">
          <p>Hourly Forecast</p>
        </div>
        <hr className="my-3" />
        <div className="flex flex-row items-center justify-between">
          {weather.list.map((hour) => (
            <div className="flex flex-col items-center">
              <p className="font-light text-sm">{timeConverter(hour.dt)}</p>
              <img src={`${icon_URL}${hour.weather[0].icon}@2x.png`} alt="" />
              <p>{hour.main.temp.toFixed(1)}°C</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default HourlyDisplay;