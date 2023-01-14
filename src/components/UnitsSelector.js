import { useState, useContext } from "react";
import WeatherContext from "../contexts/WeatherContext";

function UnitsSelector({ searchParam, getSearchData, setIsMetric }) {

  const [activeUnits, setActiveUnits] = useState('metric');
  const ctx = useContext(WeatherContext);

  const handleClick = (selectedUnits) => {
    setActiveUnits(selectedUnits)
    ctx.handleChangeUnits(selectedUnits);
    getSearchData({ ...searchParam, units: selectedUnits})
  }

  return (
    <div className='flex flex-col text-blue-300'>
      <button
        className={`text-5xl py-2 mx-2  ${activeUnits === 'imperial' ? 'text-blue-800' : ''}`}
        onClick={() => handleClick('imperial')}
      >
        °F
      </button>
      <button
        className={`text-5xl py-2 mx-2 'text-blue-500' ${activeUnits === 'metric' ? 'text-blue-800' : ''}`}
        onClick={() => handleClick('metric')}
      >
        °C
      </button>
    </div>
  );
}
export default UnitsSelector;