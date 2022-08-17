import React from "react"
import { List } from "./List/List"
import classes from "./standarts.module.scss"

export default function Standarts() {
    return (
        <div className={classes.container}>
            <List />
        </div>
    )
}
