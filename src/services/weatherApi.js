import axios from "axios";

const API_KEY = '1e3039792caea495f5c730bd5144ded6';
const BASE_URL= `https://api.openweathermap.org/data/2.5`;

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
    const name = `${searchParams.name},${state} ${searchParams.country}`;
    return {name, lat, lon, feels_like, temp, temp_min, temp_max, humidity, speed, description, icon};
}

const getUrl = async(dataType, searchParams) => {
    return await axios.get(BASE_URL + "/" + dataType, {
        params: {
            // q: searchParams,
            lat: searchParams.lat,
            lon: searchParams.lon,
            appid: API_KEY,
            units: searchParams.units || 'metric'
        }
    })
        .then((response) => {
            let formattedData = formatApiResponse(response.data, searchParams);
            return formattedData;
        })
        .catch((error) => {
            console.log(error.message)
        })
}

export default getUrl;