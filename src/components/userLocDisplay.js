import { useState } from "react";
import { FaSyncAlt } from 'react-icons/fa';
import styles from './userLocDisplay.module.css'
import getLocation from "../services/mapsApi";

function UserLocDisplay({ onClick }) {

  // const [userLatitude, setUserLatitude] = useState(1.3521)
  // const [userLongitude, setUserLongitude] = useState(103.8198)
  // const [userAddress, setUserAddress] = useState("")

  const handleClick = async (event) => {

    if (!navigator.geolocation) {
      console.log("Geolocation unsupported by browser");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async position => {
        // setUserLatitude(position.coords.latitude);
        // setUserLongitude(position.coords.longitude);
        // setUserAddress(address);

        try {
          const locationData = await getLocation(position.coords.latitude, position.coords.longitude)
          const address = locationData.results[0].address_components;
          onClick(address[2].long_name + ", " + address[3].long_name);
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
    <div className={styles.userLocCard}>
      <button onClick={handleClick}>
        Use Current Location
      </button>

    </div>
  )
}
export default UserLocDisplay;