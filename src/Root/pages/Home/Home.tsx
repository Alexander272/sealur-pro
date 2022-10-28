import React from "react"
import { useSelector } from "react-redux"
import { Link } from "react-router-dom"
import { RootState } from "../../../store/store"
import Services from "../Services/Services"
import classes from "./home.module.scss"

export default function Home() {
    const roles = useSelector((state: RootState) => state.user.roles)

    return (
        <div className={classes.home}>
            {roles.some(r => r.service === "sealur" && r.role === "superuser") && (
                <div className={classes.users}>
                    <Link to='/users/1' className={classes.link}>
                        Пользователи
                    </Link>
                </div>
            )}

            {/* //TODO после согласования того что будет на главной странице надо будет использовать компонент, а не страницу */}
            <Services />
        </div>
    )
}
