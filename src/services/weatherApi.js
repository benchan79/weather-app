import axios from "axios";

const API_KEY = 'd5c54a92b47f0f9c49fa254decc1ac92';
const BASE_URL= `https://api.openweathermap.org/data/2.5`;

const formatApiResponse = (data) => {
    console.log (data)
    let {
        name,
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
            let formattedData = formatApiResponse(response.data);
            return formattedData;
        })
        .catch((error) => {
            console.log(error.message)
        })
}

export default getUrl;