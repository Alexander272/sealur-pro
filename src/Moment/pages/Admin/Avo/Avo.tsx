import React, { Suspense } from "react"
import { Outlet } from "react-router-dom"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { List } from "./List/List"
import classes from "./avo.module.scss"

export default function Avo() {
    return (
        <div className={classes.container}>
            <List />
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    )
}
