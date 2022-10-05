import React, { FC } from "react"
import { Profile } from "./Profile"
import classes from "./header.module.scss"

type Props = {}

export const Header: FC<Props> = () => {
    return (
        <div className={classes.header}>
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
                <Profile />
            </div>
        </div>
    )
}
