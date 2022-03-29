import { Provider } from "react-redux"
import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import { MyRoutes } from "./components/routes"
import { store } from "./store/store"

function App() {
    return (
        <Provider store={store}>
            <BrowserRouter>
                <MyRoutes />
            </BrowserRouter>
            <ToastContainer
                position='top-right'
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </Provider>
    )
}

export default App
