import axios from "axios";

// Current weather API call
// https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid={API key}
// 5 day / 3 hour API call
// https://api.openweathermap.org/data/2.5/forecast?lat={lat}&lon={lon}&appid={API key}
// Hourly API call
// https://pro.openweathermap.org/data/2.5/forecast/hourly?lat={lat}&lon={lon}&appid={API key}
// 16 day forecast with daily average parameters
// https://api.openweathermap.org/data/2.5/forecast/daily?lat={lat}&lon={lon}&cnt={cnt}&appid={API key}

const API_KEY = '1e3039792caea495f5c730bd5144ded6';
const BASE_URL= `https://api.openweathermap.org/data/2.5`;
const PRO_URL = 'https://pro.openweathermap.org/data/2.5';

const baseAPI = axios.create({ baseURL: BASE_URL });
const proAPI = axios.create({ baseURL: PRO_URL });

const formatApiResponse = (data, searchParams) => {
    console.log (data)
    let {
        coord: {
            lat,
            lon
        },
        main: {
            feels_like,
            temp,
            temp_min,
            temp_max,
            humidity
        },
        wind: {
            speed
        },
        weather: {
            0: {
                description,
                icon
            }
        }
    } = data;
    const state = searchParams.state ? ` ${searchParams.state},` : "";
    const zip = searchParams.zip ? ` (${searchParams.zip})` : "";
    const name = `${searchParams.name},${state} ${searchParams.country}${zip}`;
    return {name, lat, lon, feels_like, temp, temp_min, temp_max, humidity, speed, description, icon};
}

const getUrl = async(searchParams) => {
    try {
        const [current, hourly, daily] = await Promise.all([
            baseAPI.get("/weather", {
                params: {
                    lat: searchParams.lat,
                    lon: searchParams.lon,
                    appid: API_KEY,
                    units: searchParams.units || 'metric'
                }
            }),
            proAPI.get("/forecast/hourly", {
                params: {
                    lat: searchParams.lat,
                    lon: searchParams.lon,
                    cnt: 20,
                    appid: API_KEY,
                    units: searchParams.units || 'metric'
                }
            }),
            baseAPI.get("/forecast/daily", {
                params: {
                    lat: searchParams.lat,
                    lon: searchParams.lon,
                    cnt: 15,
                    appid: API_KEY,
                    units: searchParams.units || 'metric'
                }
            }),
        ]);
        console.log("current", current.data);
        console.log("hourly", hourly.data);
        console.log("daily", daily.data);
        let formattedData = formatApiResponse(current.data, searchParams);
        return {
            current:formattedData, 
            hourly: hourly.data,
            daily: daily.data
        };
    } catch (error) {
        console.log(error.message);
    }
}

export default getUrl;