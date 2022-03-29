import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { Header } from "../../Header/Header"
import classes from "./main.module.scss"

export default function Main() {
    return (
        <div className={classes.wrapper}>
            <Header />
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    )
}
