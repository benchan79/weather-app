import { useContext } from "react";
import WeatherContext from "../contexts/WeatherContext";

function UnitsSelector({ searchParam, getSearchData }) {
  const ctx = useContext(WeatherContext);

  const handleClick = (selectedUnits) => {
    ctx.handleChangeUnits(selectedUnits);
    getSearchData({ ...searchParam, units: selectedUnits });
  };

  return (
    <div className="flex flex-col text-blue-300">
      <button
        className={`text-5xl py-2 mx-2  ${
          !ctx.isMetric ? "text-blue-800" : ""
        }`}
        onClick={() => handleClick("imperial")}
      >
        °F
      </button>
      <button
        className={`text-5xl py-2 mx-2 'text-blue-500' ${
          ctx.isMetric ? "text-blue-800" : ""
        }`}
        onClick={() => handleClick("metric")}
      >
        °C
      </button>
    </div>
  );
}
export default UnitsSelector;
