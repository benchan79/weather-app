import { useState } from "react";
import { geoAPIGetByCoords } from "../services/geoAPI";
import { FaMapMarkerAlt } from 'react-icons/fa';
import styles from './userLocDisplay.module.css'

function UserLocDisplay({ onClick }) {
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

    navigator.geolocation.getCurrentPosition(
      async position => {
        try {
          const coords = {
            ...userLocation,
            lat: position.coords.latitude,
            long: position.coords.longitude,
          }
          geoAPIGetByCoords(coords, onClick);
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