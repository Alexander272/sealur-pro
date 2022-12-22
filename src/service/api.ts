import axios from "axios"
import { store } from "../store/store"

export type MyMethod = "post" | "put"

const api = axios.create({
    withCredentials: true,
    baseURL: "/api/v1",
})

api.interceptors.request.use(config => {
    if (config.headers) {
        // config.headers.Authorization = `Bearer ${store.getState().user.token.accessToken}`
        config.headers["Access-Control-Allow-Origin"] = "*"
    }
    return config
})

api.interceptors.response.use(
    config => {
        return config
    },
    async error => {
        if (error.response.status === 401) {
            store.dispatch.user.clearUser()
        }
        throw error
    }
)

export default api
