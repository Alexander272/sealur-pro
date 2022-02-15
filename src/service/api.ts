import axios from "axios"
import { store } from "../store/store"

export type MyMethod = "post" | "put"

const api = axios.create({
    withCredentials: true,
    baseURL: "/api/v1",
})

api.interceptors.request.use(config => {
    if (config.headers)
        config.headers.Authorization = `Bearer ${store.getState().user.token.accessToken}`
    return config
})

api.interceptors.response.use(
    config => {
        return config
    },
    async error => {
        const originalRequest = error.config

        if (error.response.status === 401 && error.config && !error.config._isRetry) {
            originalRequest._isRetry = true
            const { user } = store.dispatch
            try {
                const res = await api.post(`/auth/refresh/`)
                user.setUser(res.data)
                return api.request(originalRequest)
            } catch (e) {
                user.clearUser()
                console.log("НЕ АВТОРИЗОВАН")
            }
        }
        throw error
    }
)

export default api
