import { useContext } from "react";
import { FaMapMarkerAlt } from "react-icons/fa";
import styles from "./userLocDisplay.module.css";
import WeatherContext from "../contexts/WeatherContext";
import { googleReverseGeocoding } from "../services/geoAPI";

function UserLocDisplay({ onClick }) {
  const ctx = useContext(WeatherContext);

  const handleClick = async (event) => {
    event.preventDefault();
    if (!navigator.geolocation) {
      console.log("Geolocation unsupported by browser");
      return;
    }
    ctx.setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          const coords = {
            lat: position.coords.latitude,
            lon: position.coords.longitude,
          };
          googleReverseGeocoding(coords, onClick, ctx.isMetric,ctx.setError,ctx.setLoading)
        } catch (error) {
          console.error(error);
        }
      },
      (error) => {
        console.error(error);
      }
    );
  };

  return (
    <button onClick={handleClick} className={styles.userLocButton}>
      <FaMapMarkerAlt />
    </button>
  );
}
export default UserLocDisplay;
