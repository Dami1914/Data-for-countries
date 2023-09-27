import axios from "axios";

const baseUrl = "https://api.openweathermap.org/data/2.5/weather?"
const baseKey = import.meta.env.VITE_SOME_KEY

const getWeather = (lat,lon,key) =>{
    const request = axios.get(`${baseUrl}lat=${lat}&lon=${lon}&appid=${baseKey}`)
    return request.then((response)=> response.data)
}  


export default {
    getWeather
}