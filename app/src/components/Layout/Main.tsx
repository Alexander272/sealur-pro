import { FC } from "react"
import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import classes from "./main.module.scss"

export const Main: FC = () => {
    return (
        <div className={classes.wrapper}>
            <Header />
            <Outlet />
        </div>
    )
}
