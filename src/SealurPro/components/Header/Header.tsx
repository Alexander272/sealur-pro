import { FC } from "react"
import { Link, useLocation } from "react-router-dom"
import { store } from "../../../store/store"
import { ProAdminUrl } from "../../../components/routes"
import { Profile } from "./Profile"
import classes from "./header.module.scss"

export const Header: FC = () => {
    const location = useLocation()

    const state = store.getState()

    const path = location.pathname.split("/")

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
                    {state.user.roles.find(r => r.service === "pro")?.role === "admin" &&
                    ["", "pro", "putg", "putgm", "survey"].includes(path[path.length - 1]) ? (
                        <Link
                            to={`${ProAdminUrl}${
                                path[path.length - 1] === "pro" ? "" : "/" + path[path.length - 1]
                            }`}
                            className={classes.link}
                        >
                            <svg
                                xmlns='http://www.w3.org/2000/svg'
                                xmlnsXlink='http://www.w3.org/1999/xlink'
                                version='1.1'
                                viewBox='0 0 512 512'
                                xmlSpace='preserve'
                                className={classes.icon}
                            >
                                <g>
                                    <path d='M422.953,176.019c0.549-0.48,1.09-0.975,1.612-1.498l21.772-21.772c12.883-12.883,12.883-33.771,0-46.654 l-40.434-40.434c-12.883-12.883-33.771-12.883-46.653,0l-21.772,21.772c-0.523,0.523-1.018,1.064-1.498,1.613L422.953,176.019z' />
                                    <polygon points='114.317,397.684 157.317,440.684 106.658,448.342 56,456 63.658,405.341 71.316,354.683' />
                                    <polygon points='349.143,125.535 118.982,355.694 106.541,343.253 336.701,113.094 324.26,100.653 81.659,343.253 168.747,430.341 411.348,187.74' />
                                </g>
                            </svg>
                            <p>Редактировать</p>
                        </Link>
                    ) : null}
                    <div className={classes.profile}>
                        <Link to='/'>
                            <img
                                src='/image/home-icon.svg'
                                alt='home'
                                width='37'
                                height='40'
                                className={classes["home-icon"]}
                            />
                        </Link>
                    </div>
                    {state.user.isAuth && <Profile />}
                </div>
            </div>
        </header>
    )
}
