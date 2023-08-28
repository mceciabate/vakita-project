import axios from "axios";

const axiosVakita = axios.create({
    baseURL: "http://107.22.65.36:8080/api/v1/vakita",
    headers: {
        "Content-type":"application/json",
        'Accept': 'application/json',
     
        
    }
})

export default axiosVakita