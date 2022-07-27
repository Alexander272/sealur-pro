import React from "react"
import { useLocation } from "react-router-dom"
import { MomentUrl } from "../../../components/routes"
import classes from "./header.module.scss"

const titles = {
    [MomentUrl + "/flange"]: "соединения фланец-фланец",
}

export const Header = () => {
    const location = useLocation()

    return (
        <header className={classes.header}>
            <img
                className={classes.logo}
                width='192'
                height='192'
                loading='lazy'
                src='/logo192.webp'
                alt='logo'
            />
            <div className={classes.info}>
                <p className={classes.company}>ООО "СИЛУР"</p>
                <p className={classes.name}>Расчет {titles[location.pathname]}</p>
            </div>
        </header>
    )
}
