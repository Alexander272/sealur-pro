import { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Loader } from "../../../components/UI/Loader/Loader"
import classes from "../styles/page.module.scss"

export default function Cap() {
    return (
        <div className={classes.wrapper}>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    )
}
