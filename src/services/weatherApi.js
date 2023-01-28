import axios from "axios";

const formatApiResponse = (data, searchParams) => {
  let {
    coord: { lat, lon },
    main: { feels_like, temp, temp_min, temp_max, humidity },
    wind: { speed },
    weather: {
      0: { description, icon },
    },
  } = data;
  const state = searchParams.state ? `, ${searchParams.state}` : "";
  const zip = searchParams.zip ? `, (${searchParams.zip})` : "";
  const country = searchParams.country ? `, ${searchParams.country}` : "";
  const name = `${searchParams.name}${state}${country}${zip}`;
  return {
    name,
    lat,
    lon,
    feels_like,
    temp,
    temp_min,
    temp_max,
    humidity,
    speed,
    description,
    icon,
  };
};

const getUrl = async (searchParams, setError, setLoading) => {
  const { lat, lon, units } = searchParams;
  const url = `/.netlify/functions/owmWeather?lat=${lat}&lon=${lon}&units=${units}`;
  try {
    setError(false);
    setLoading(true);
    // const response = await fetch(url).then((res) => res.json());
    const response = await axios.get(url);
    let formattedData = formatApiResponse(response.data.current, searchParams);
    setLoading(false);
    return {
      current: formattedData,
      hourly: response.data.hourly,
      daily: response.data.daily,
    };
  } catch (error) {
    setError(true);
    setLoading(false);
    console.log(error.message);
  }
};

export default getUrl;
