// import { Provider } from "react-redux"
import { useDispatch } from "react-redux"
import { Outlet } from "react-router-dom"
import { SWRConfig } from "swr"
import AuthService from "../service/auth"
import { Dispatch } from "../store/store"

export default function App() {
    const dispatch = useDispatch<Dispatch>()

    return (
        // <Provider store={store}>
        <SWRConfig
            value={{
                onErrorRetry: async (error, key, config, revalidate, { retryCount }) => {
                    if (error.status === 401) {
                        try {
                            const res = await AuthService.refresh()
                            dispatch.user.setUser(res.data)
                        } catch (error: any) {
                            dispatch.user.clearUser()
                            return
                        }
                    }
                    if (error.status === 403 || error.status === 404) return
                    if (retryCount >= 5) return
                    setTimeout(() => revalidate({ retryCount }), 5000)
                },
            }}
        >
            <Outlet />
        </SWRConfig>

        // </Provider>
    )
}
