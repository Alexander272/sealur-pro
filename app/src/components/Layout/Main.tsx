import { FC, Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import { Loader } from "../UI/Loader/Loader"
import classes from "./main.module.scss"

export const Main: FC = () => {
    return (
        <div className={classes.wrapper}>
            <Header />
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    )
}
