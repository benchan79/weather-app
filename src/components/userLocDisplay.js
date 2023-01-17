import { useState, useContext } from "react";
import { geoAPIGetByCoords } from "../services/geoAPI";
import { FaMapMarkerAlt } from 'react-icons/fa';
import styles from './userLocDisplay.module.css'
import WeatherContext from "../contexts/WeatherContext";

function UserLocDisplay({ onClick }) {
  const ctx = useContext(WeatherContext);
  const [userLocation, setUserlocation] = useState(
    {
      lat: 1.3521,
      lon: 103.8198,
      limit: 5,
    }
  )

  const handleClick = async (event) => {
    event.preventDefault();
    if (!navigator.geolocation) {
      console.log("Geolocation unsupported by browser");
      return;
    }
    ctx.setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const coords = {
            ...userLocation,
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          }
          geoAPIGetByCoords(coords, onClick, ctx.isMetric, ctx.setError, ctx.setLoading);
        }
        catch (error) {
          console.error(error);
        }

      },
      error => {
        console.error(error);
      }
    );
  }

  return (

    <button onClick={handleClick} className={styles.userLocButton}>
      <FaMapMarkerAlt />
    </button>

  )
}
export default UserLocDisplay;