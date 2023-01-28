import { useState, useContext } from "react";
import styles from "./Favorites.module.css";
import { FaStar } from "react-icons/fa";
import WeatherContext from "../contexts/WeatherContext";

function FavoritesMenu({ onSelect, selectedLocation }) {
  const ctx = useContext(WeatherContext);
  const [locArray, setlocArray] = useState([]);
  const [showList, setShowList] = useState(false);
  // const [delayHandler, setDelayHandler] = useState(null);

  const handleAdd = (e) => {
    e.preventDefault();
    if (selectedLocation) {
      const inLocArray = locArray.some((location) => {
        if (location.name === selectedLocation.name) {
          return true;
        }
        return false;
      });
      if (!inLocArray) {
        setlocArray((current) => [...current, selectedLocation]);
      }
    }
  };

  const handleClick = (loc) => {
    ctx.setError(false);
    onSelect({ ...loc, units: ctx.isMetric ? "metric" : "imperial" });
  };

  const handlerDeleteItem = (locName) => {
    const newLocArray = [...locArray];
    const filteredLocArray = newLocArray.filter((loc) => {
      return loc.name !== locName;
    });
    setlocArray(filteredLocArray);
  };

  const handleMouseEnter = (event) => {
    setShowList(true);
  };

  const handleMouseLeave = () => {
    // setDelayHandler(
    //   setTimeout(() => {
    //     setShowList(false);
    //   }, 2000)
    // );
    // clearTimeout(delayHandler);
    setShowList(false);
  };

  return (
    <div
      className={styles.dropdown}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <button className={styles.dropbtn} onClick={handleAdd}>
        <FaStar />
      </button>

      {showList && (
        <div className={styles.dropdowncontent}>
          {!selectedLocation && !locArray[0] && (
            <table className={`${styles.table}`}>
              <thead>
                <tr>
                  <th>Add to favorites</th>
                </tr>
              </thead>
            </table>
          )}
          {selectedLocation && !locArray[0] && (
            <table className={`${styles.table}`}>
              <thead>
                <tr>
                  <th onClick={handleAdd}>Add to favorites</th>
                </tr>
              </thead>
            </table>
          )}
          {locArray && (
            <table className={`${styles.table}`}>
              <tbody>
                {locArray.map((loc, index) => (
                  <tr key={loc.name}>
                    <td onClick={() => handleClick(loc)}>{loc.name}</td>
                    <td onClick={() => handlerDeleteItem(loc.name)}> ❌ </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}
export default FavoritesMenu;
