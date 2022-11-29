import React, { FC } from "react"
import { Profile } from "./Profile"
import classes from "./header.module.scss"
import { Link } from "react-router-dom"

type Props = {}

export const Header: FC<Props> = () => {
    return (
        <div className={classes.header}>
            <div className={classes.content}>
                <a
                    className={classes.logoLink}
                    href='https://pro.sealur.ru/'
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

                <div className={classes.nav}>
                    <Link to='/' className={classes.profile}>
                        <img
                            src='/image/home-icon.svg'
                            alt='home'
                            width='37'
                            height='40'
                            className={classes["home-icon"]}
                        />
                    </Link>

                    <Profile />
                </div>
            </div>
        </div>
    )
}
