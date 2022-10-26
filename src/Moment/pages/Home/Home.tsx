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
                <Link to={MomentUrl + "/cap"} className={classes.link}>
                    Расчет соединения фланец-крышка
                </Link>
                <Link to={MomentUrl + "/floating-head"} className={classes.link}>
                    Расчет плавающей головки
                </Link>
                <Link to={MomentUrl + "/dev-cooling"} className={classes.link}>
                    Расчет аппаратов воздушного охлаждения
                </Link>
                <Link to={MomentUrl + "/gas-cooling"} className={classes.link}>
                    Расчет прокладки АВО (выбор по типоразмеру аппарата)
                </Link>
                <Link to={MomentUrl + "/express-circle"} className={classes.link}>
                    Экспресс-оценка момента затяжки (круглая)
                </Link>
            </main>
        </div>
    )
}
