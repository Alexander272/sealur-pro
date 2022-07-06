import { Outlet } from "react-router-dom"
import { Header } from "../Header/Header"
import classes from "./main.module.scss"

export default function MainLayout() {
    return (
        <div className={classes.wrapper}>
            <Header />
            <Outlet />
        </div>
    )
}
