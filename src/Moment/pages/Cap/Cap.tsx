import { Outlet } from "react-router-dom"
import classes from "../styles/page.module.scss"

export default function Cap() {
    return (
        <div className={classes.wrapper}>
            <Outlet />
        </div>
    )
}
