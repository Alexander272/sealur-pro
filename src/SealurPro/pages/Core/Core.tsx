import { Suspense } from "react"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Tabs } from "../../../components/Tabs/Tabs"
import { Button } from "../../../components/UI/Button/Button"
import { Loader } from "../../../components/UI/Loader/Loader"
import classes from "./core.module.scss"

const initTabs: any = {
    pro: {
        width: 103,
        position: 0,
    },
    test: {
        width: 103,
        position: 0,
    },
    putg: {
        width: 105,
        position: 103,
    },
    putgm: {
        width: 114,
        position: 208,
    },
}

export default function Core() {
    const location = useLocation()
    let pathname = location.pathname

    const path = pathname.split("/")

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                <Tabs
                    initWidth={initTabs[path[path.length - 1] || "pro"].width}
                    initPos={initTabs[path[path.length - 1] || "pro"].position}
                    type='nav'
                >
                    <Link
                        className={[
                            classes.link,
                            path[path.length - 1] === "pro" || path[path.length - 1] === ""
                                ? classes.active
                                : null,
                        ].join(" ")}
                        to=''
                    >
                        СНП
                    </Link>
                    <Link
                        className={[
                            classes.link,
                            path[path.length - 1] === "putg" ? classes.active : null,
                        ].join(" ")}
                        to='putg'
                    >
                        ПУТГ
                    </Link>
                    <Link
                        className={[
                            classes.link,
                            path[path.length - 1] === "putgm" ? classes.active : null,
                        ].join(" ")}
                        to='putgm'
                    >
                        ПУТГм
                    </Link>
                </Tabs>

                <nav className={classes.buttons}>
                    <Button.Link to='survey' variant='grayPrimary' rounded='round'>
                        Заполнить опросный лист
                    </Button.Link>
                    <Button.Link to='list' rounded='round'>
                        Перейти к списку
                    </Button.Link>
                </nav>
            </div>

            <div className={classes.content}>
                <Suspense fallback={<Loader isFull={true} />}>
                    <Outlet />
                </Suspense>
            </div>
        </div>
    )
}
