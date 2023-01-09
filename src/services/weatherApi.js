import axios from "axios";

const API_KEY = 'd5c54a92b47f0f9c49fa254decc1ac92';
const BASE_URL= `https://api.openweathermap.org/data/2.5`;

const getUrl = async(dataType, searchParams) => {
    return axios.get(BASE_URL + "/" + dataType, {
        params: {
            q: searchParams,
            appid: API_KEY 
        }
    })
        .then((response) => {
            console.log(response.data)
        })
        .catch((error) => {
            console.log(error.message)
        })
}
  
export default getUrl;