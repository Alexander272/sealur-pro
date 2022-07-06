import { Provider } from "react-redux"
import { Outlet } from "react-router-dom"

export default function App() {
    return (
        // <Provider store={store}>
        <Outlet />
        // </Provider>
    )
}
