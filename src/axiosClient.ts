import axios from 'axios'
import keycloak from "./lib/keycloak"

const axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL + "/api",
})

axiosClient.interceptors.request.use((config) => {
    config.headers.Authorization = `Bearer ${keycloak.token}`
    config.headers.setContentType("application/json")
    return config
})

export default axiosClient