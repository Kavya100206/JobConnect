import axios from "axios";
import { API_BASE_URL } from "./config.js";


//register user
const api = axios.create({
    baseURL: API_BASE_URL, // backend url
    withCredentials: true, //allows cookies to be sent with requests
});

//signup

export const signup = async (userData) => {
    try {
        const response = await api.post('api/auth/signup', userData)
        return response.data;
    } catch (error) {
        throw error.response.data;
    }
}

//login
export const login = async (userData) => {
    try {
        const response = await api.post('api/auth/login', userData)
        return response.data;
    } catch (error) {
        console.log(error)
        throw error.response.data;
    }
}



export default api;
