import { createContext, useState } from "react";

const WeatherContext = createContext();

export function WeatherProvider({ children }) {
  const [isMetric, setIsMetric] = useState(true);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChangeUnits = (selectedUnits) => {
    setIsMetric(selectedUnits === "metric" ? true : false);
  };

  const context = {
    isMetric: isMetric,
    error: error,
    loading: loading,
    setError: setError,
    setLoading: setLoading,
    handleChangeUnits: handleChangeUnits,
  };

  return (
    <WeatherContext.Provider value={context}>
      {children}
    </WeatherContext.Provider>
  );
}

export default WeatherContext;
