import React from 'react'
import styles from "./Table.module.css"

function TableForecast ({ data }) {
  const icon_URL = "http://openweathermap.org/img/wn/"
  return (
    <div>
      <h2>5 day weather forecast for ({data.city.coord.lat}, {data.city.coord.lon})</h2>
      <table className = {styles.table}>
        <thead>
          <tr>
            <th>DateTime</th>
            <th>Weather</th>
            <th>Icon</th>
            <th>Temp C</th>
            <th>Temp range C</th>
            <th>Atm Pres hPa</th>
            <th>Humidity %</th>
            <th>Visibility km</th>
            <th>Wind speed m/s</th>
            <th>Wind direction deg</th>
            <th>Wind gust m/s</th>
            <th>Cloudiness %</th>
            <th>Probability of precipitation %</th>
            <th>Rain volume mm</th>
          </tr>
        </thead>
        <tbody>
          {data.list.map((item) => (
            <tr key={item.dt}>
              <td>{item.dt_txt}</td>
              <td>{item.weather[0].description}</td>
              <td><img src={`${icon_URL}${item.weather[0].icon}@2x.png`}/></td>
              <td>{item.main.temp}</td>
              <td>{item.main.temp_min} - {item.main.temp_max}</td>
              <td>{item.main.pressure}</td>
              <td>{item.main.humidity}</td>
              <td>{(item.visibility) / 1000}</td>
              <td>{item.wind.speed}</td>
              <td>{item.wind.deg}</td>
              <td>{item.wind.gust}</td>
              <td>{item.clouds.all}</td>
              <td>{Math.round((item.pop)*100)}</td>
              {/* <td>{item["clouds"]["all"]}</td> */}
              <td>{item.rain && item.rain["3h"]}</td>
            </tr>
          ))

          }
          {/* <tr>
            <td>{list[0].dt_txt}</td>
            <td>{list[0].weather[0].description}</td>
            <td>{list[0].main.temp}</td>
            <td>{list[0].main.temp_min}</td>
            <td>{list[0].main.temp_max}</td>
            <td>{list[0].main.pressure}</td>
            <td>{list[0].main.humidity}</td>
            <td>{list[0].visibility}</td>
            <td>{list[0].wind.speed}</td>
            <td>{list[0].wind.deg}</td>
          </tr> */}
        </tbody>
      </table> 
    </div>
  )
}

export default TableForecast;