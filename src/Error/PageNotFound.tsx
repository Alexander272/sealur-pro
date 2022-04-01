import React from "react"
import { Link } from "react-router-dom"
import classes from "./error.module.scss"

export default function PageNotFound() {
    return (
        <div className={classes.wrapper}>
            <div className={classes.container}>
                <h2 className={classes.title}>404</h2>
                <p className={classes.text}>
                    Страница, которую вы ищете, не существует. Но вы можете нажать кнопку ниже,
                    чтобы вернуться на главную страницу
                </p>
                <Link to={"/"} className={classes.link}>
                    Вернуться
                </Link>
            </div>
        </div>
    )
}
