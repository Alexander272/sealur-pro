import { Outlet } from "react-router-dom"
import classes from "../styles/page.module.scss"

export default function ExCircle() {
    return (
        <div className={classes.wrapper}>
            <Outlet />
        </div>
    )
}
