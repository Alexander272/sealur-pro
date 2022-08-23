import React from "react"
import { Link } from "react-router-dom"
import { MomentUrl } from "../../../components/routes"
import { store } from "../../../store/store"
import classes from "./home.module.scss"

export default function Home() {
    const state = store.getState()

    return (
        <div className={classes.page}>
            <header className={classes.header}>
                <img
                    className={classes.logo}
                    width='340'
                    height='100'
                    loading='lazy'
                    src='/image/logo.webp'
                    alt='logo'
                />
            </header>

            <main className={classes.main}>
                {state.user.roles.find(r => r.service === "moment")?.role === "admin" && (
                    <Link
                        to={MomentUrl + "/admin/edit/materials"}
                        className={classes["link-admin"]}
                    >
                        Редактировать
                    </Link>
                )}

                <Link to={MomentUrl + "/flange"} className={classes.link}>
                    Расчет соединения фланец-фланец
                </Link>
            </main>
        </div>
    )
}
