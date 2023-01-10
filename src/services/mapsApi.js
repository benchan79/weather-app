import axios from "axios";

const API_KEY = 'AIzaSyD98b0qmhQfoPpJQqjruQutLs_NHAuxVoY';
const BASE_URL = `https://maps.googleapis.com/maps/api/geocode/json?latlng=`;

const  getLocation =  async (latitude, longitude) => {
    return await axios.get(BASE_URL + latitude + "," + longitude + "&key=" + API_KEY)
        .then((response) => {

            return response.data;
        })
        .catch((error) => {
            console.log(error.message)
        })
}

export default getLocation;