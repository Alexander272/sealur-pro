import { FC } from "react"
import classes from "./header.module.scss"

export const Header: FC = () => {
    return (
        <header className={classes.header}>
            <div className={classes.content}>
                <a href='https://sealur.ru/' rel='noreferrer'>
                    <img
                        className={classes.logo}
                        loading='lazy'
                        src='/image/logo.webp'
                        alt='logo'
                    />
                </a>
            </div>
        </header>
    )
}
