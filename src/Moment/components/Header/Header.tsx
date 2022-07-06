import React from "react"
import classes from "./header.module.scss"

export const Header = () => {
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
                <p className={classes.name}>Расчет ...</p>
            </div>
        </header>
    )
}
