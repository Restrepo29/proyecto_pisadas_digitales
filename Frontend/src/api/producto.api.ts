import axios from "axios"

const BASE_URL = import.meta.env.VITE_API_URL ?? "http://localhost:5000"

export const productApi = axios.create({
    baseURL: `${BASE_URL}/api/store`
})

// //instancia de axios
