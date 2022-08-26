import React from "react"
import { useLocation } from "react-router-dom"
import { MomentUrl } from "../../../components/routes"
import { IPersonData } from "../../types/flange"
import classes from "./header.module.scss"

const titles = {
    [MomentUrl + "/flange"]: "Расчет соединения фланец-фланец",
    [MomentUrl + "/flange/result"]: "Результат расчета соединения фланец-фланец",
    [MomentUrl + "/cap"]: "Расчет соединения фланец-крышка",
    [MomentUrl + "/cap/result"]: "Результат расчета соединения фланец-крышка",
}

export const Header = () => {
    const location = useLocation()
    const person = (location.state as { person: IPersonData })?.person

    if (person)
        return (
            <header className={classes.confirm}>
                <img
                    className={classes.logo}
                    width='192'
                    height='192'
                    src='/logo192.webp'
                    alt='logo'
                />
                <div className={classes.person}>
                    <p className={classes.company}>"УТВЕРЖДАЮ"</p>
                    <p>{person.supervisor.position}</p>
                    <p>______________ {person.supervisor.name}</p>
                    <p>"_____" _______________ {new Date().getFullYear()} г.</p>
                </div>
                <p className={`${classes.name} ${classes.title}`}>{titles[location.pathname]}</p>
            </header>
        )

    return (
        <header className={classes.header}>
            <img className={classes.logo} width='192' height='192' src='/logo192.webp' alt='logo' />
            <div className={classes.info}>
                <p className={classes.company}>ООО "СИЛУР"</p>
                <p className={classes.name}>{titles[location.pathname]}</p>
            </div>
        </header>
    )
}
