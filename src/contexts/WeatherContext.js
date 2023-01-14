// WeatherContext.js
import { createContext, useState } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [isMetric, setIsMetric] = useState(true);

  const handleChangeUnits = (selectedUnits) => {
    setIsMetric(selectedUnits === 'metric' ? true:false)
  }

  const context = {
    isMetric: isMetric,
    handleChangeUnits: handleChangeUnits,
  }

  return (
    <WeatherContext.Provider value={context}>
      {children}
    </WeatherContext.Provider>
  )
}

export default WeatherContext;