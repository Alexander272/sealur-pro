import React from "react"
import classes from "./error.module.scss"

export default function ServerError() {
    return (
        <div className={classes.container}>
            <h2 className={classes.title}>500</h2>
            <p className={classes.text}>Извините, возникла непредвиденная ошибка</p>
        </div>
    )
}
