import React from 'react'
import styles from "./Table.module.css"

function TableCurrent ({ data }) {
  const icon_URL = "http://openweathermap.org/img/wn/"
  return (
    <div>
      <h2>Current weather for ({data.coord.lat}, {data.coord.lon})</h2>
      <table className = {styles.table}>
        <thead>
          <tr>
            <th>Weather</th>
            <th>Icon</th>
            <th>Temp</th>
            <th>Temp min</th>
            <th>Temp max</th>
            <th>Pressure</th>
            <th>Humidity</th>
            <th>Visibility</th>
            <th>Wind-speed</th>
            <th>Wind-deg</th>
            <th>Clouds</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.weather[0].description}</td>
            <td><img src={`${icon_URL}${data.weather[0].icon}@2x.png`}/></td>
            <td>{data.main.temp}</td>
            <td>{data.main.temp_min}</td>
            <td>{data.main.temp_max}</td>
            <td>{data.main.pressure}</td>
            <td>{data.main.humidity}</td>
            <td>{data.visibility}</td>
            <td>{data.wind.speed}</td>
            <td>{data.wind.deg}</td>
            <td>{data.clouds.all}</td>
          </tr>
        </tbody>
      </table> 
    </div>
  )
}

export default TableCurrent;