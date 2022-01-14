import { BrowserRouter } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import { MyRoutes } from "./components/routes"

import "react-toastify/dist/ReactToastify.css"

function App() {
    return (
        <>
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
        </>
    )
}

export default App
