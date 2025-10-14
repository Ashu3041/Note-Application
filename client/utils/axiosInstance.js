import axios from "axios";
// import dotenv from "dotenv";

// dotenv.config();


const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
console.log(BASE_URL);

const axiosInstance = axios.create({
    baseURL:BASE_URL,
    timeout: 1000,
    headers:{
        "Content-Type":"application/json",
    },
});

axiosInstance.interceptors.request.use(
    (config) =>{
        const accessToken = localStorage.getItem("token");
        if(accessToken){
            config.headers.Authorization = `Bearer ${accessToken}`;
        }
        return config;
    },
    (error)=>{
        return Promise.reject(error);
    }
);

export default axiosInstance;