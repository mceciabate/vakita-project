import axios from "axios";

const axiosVakita = axios.create({
    baseURL: "http://localhost:8080/api/v1/vakita",
    headers: {
        "Content-type":"application/json",
        // 'Connection': 'Keep-Alive',
        'Accept': 'application/json',
        // 'Access-Control-Allow-Methods': 'GET, PUT, POST, DELETE, HEAD'
        // 'Access-Control-Request-Method': 'GET',
        // 'Access-Control-Request-Headers': 'origin, x-requested-with, accept'
        
    }
})

export default axiosVakita