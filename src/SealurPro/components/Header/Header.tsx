import { FC } from "react"
import { Link } from "react-router-dom"
import classes from "./header.module.scss"

export const Header: FC = () => {
    return (
        <header className={classes.header}>
            <div className={classes.content}>
                <a
                    className={classes.logoLink}
                    href='https://sealur.ru/'
                    target='_blank'
                    rel='noreferrer'
                >
                    <img
                        className={classes.logo}
                        width={340}
                        height={100}
                        loading='lazy'
                        src='/image/logo.webp'
                        alt='logo'
                    />
                </a>
                <div className={classes.admin}>
                    {/* <Link to='/admin'>Admin</Link> */}
                    {/* &#128221; */}
                    {/* &#9998; */}
                </div>
            </div>
        </header>
    )
}
