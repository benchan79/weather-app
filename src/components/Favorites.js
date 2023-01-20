import { useState, useContext } from "react";
import styles from "./Favorites.module.css";
import { FaStar } from "react-icons/fa";
import WeatherContext from "../contexts/WeatherContext";

function FavoritesMenu({ onSelect, selectedLocation }) {
  const ctx = useContext(WeatherContext);

  const handleAdd = () => {
    setlocArray([...locArray, selectedLocation]);
  };

  const handleClick = (loc) => {
    ctx.setError(false);
    onSelect({ ...loc, units: ctx.isMetric ? "metric" : "imperial" });
  };

  const [locArray, setlocArray] = useState([]);
  const [showList, setShowList] = useState(false);

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={() => setShowList(true)}
      onMouseLeave={() => setShowList(false)}
    >
      <button className={styles.dropbtn}>
        <FaStar />
      </button>
      {showList && (
        <div className={styles.dropdowncontent}>
          {selectedLocation && (
            <button onClick={handleAdd} className={styles.locationli}>
              Add to favorites
            </button>
          )}
          {locArray &&
            locArray.map((loc, index) => {
              return (
                <button
                  key={index}
                  className={styles.locationli}
                  onClick={() => handleClick(loc)}
                >
                  {loc.name}
                </button>
              );
            })}
        </div>
      )}
    </div>
  );
}
export default FavoritesMenu;
