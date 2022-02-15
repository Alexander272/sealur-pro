import { FC } from "react"
import classes from "./header.module.scss"

export const Header: FC = () => {
    return (
        <header className={classes.header}>
            <div className={classes.content}>
                <a className={classes.logoLink} href='https://sealur.ru/' rel='noreferrer'>
                    <img
                        className={classes.logo}
                        width={340}
                        height={100}
                        loading='lazy'
                        src='/image/logo.webp'
                        alt='logo'
                    />
                </a>
            </div>
        </header>
    )
}
