import { Suspense } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Tabs } from "../../components/Tabs/Tabs"
import { Button } from "../../components/UI/Button/Button"
import { Loader } from "../../components/UI/Loader/Loader"
import classes from "./core.module.scss"

export default function Core() {
    const location = useLocation()

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Tabs type='nav'>
                    <Link
                        className={[
                            classes.link,
                            location.pathname === "/" ? classes.active : null,
                        ].join(" ")}
                        to='/'
                    >
                        СНП
                    </Link>
                    <Link
                        className={[
                            classes.link,
                            location.pathname === "/putg" ? classes.active : null,
                        ].join(" ")}
                        to='/putg'
                    >
                        ПУТГ
                    </Link>
                    <Link
                        className={[
                            classes.link,
                            location.pathname === "/putgm" ? classes.active : null,
                        ].join(" ")}
                        to='/putgm'
                    >
                        ПУТГм
                    </Link>
                </Tabs>

                <nav className={classes.buttons}>
                    <Button.Link to='/survey' variant='grayPrimary' rounded='round'>
                        Заполнить опросный лист
                    </Button.Link>
                    <Button.Link to='/list' rounded='round'>
                        Перейти к списку
                    </Button.Link>
                </nav>
            </div>

            <div className={classes.content}>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}
