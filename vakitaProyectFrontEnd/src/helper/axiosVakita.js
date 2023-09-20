import axios from "axios";

const axiosVakita = axios.create({
    baseURL: "https://gatewayvakitas.ddns.net:8080/api/v1/vakita",
    headers: {
        "Content-type":"application/json",
        'Accept': 'application/json',
     
        
    }
})

export default axiosVakita