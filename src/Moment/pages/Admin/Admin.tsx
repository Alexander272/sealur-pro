import React, { Suspense, useEffect } from "react"
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom"
import { MomentUrl } from "../../../components/routes"
import { Tabs } from "../../../components/Tabs/Tabs"
import { Button } from "../../../components/UI/Button/Button"
import { Loader } from "../../../components/UI/Loader/Loader"
import { store } from "../../../store/store"
import classes from "./admin.module.scss"

const initTabs: any = {
    materials: {
        width: 150,
        position: 0,
    },
    standarts: {
        width: 145,
        position: 150,
    },
    gaskets: {
        width: 151,
        position: 295,
    },
    bolts: {
        width: 112,
        position: 446,
    },
    avo: {
        width: 101,
        position: 558,
    },
}

export default function Admin() {
    const state = store.getState()
    const navigate = useNavigate()
    const location = useLocation()

    const partsUrl = location.pathname.split("/")

    useEffect(() => {
        if (!state.user.roles.some(r => r.service === "moment" && r.role === "admin")) {
            navigate("/moment")
        }
    }, [state.user.roles, navigate])

    const backHandler = () => navigate(MomentUrl)

    return (
        <div className={classes.container}>
            <div className={classes.tabs}>
                <Tabs
                    // initWidth={initTabs[partsUrl[partsUrl.length - 1]]?.width}
                    // initPos={initTabs[partsUrl[partsUrl.length - 1]]?.position}
                    initWidth={
                        initTabs[
                            Object.keys(initTabs).find(k => location.pathname.includes(k)) || ""
                        ]?.width
                    }
                    initPos={
                        initTabs[
                            Object.keys(initTabs).find(k => location.pathname.includes(k)) || ""
                        ]?.position
                    }
                    type='nav'
                >
                    <Link
                        className={[
                            classes.link,
                            partsUrl.includes("materials") ? classes.active : null,
                        ].join(" ")}
                        to='edit/materials'
                    >
                        Материалы
                    </Link>
                    <Link
                        className={[
                            classes.link,
                            partsUrl.includes("standarts") ? classes.active : null,
                        ].join(" ")}
                        to='edit/standarts'
                    >
                        Стандарты
                    </Link>
                    <Link
                        className={[
                            classes.link,
                            partsUrl.includes("gaskets") ? classes.active : null,
                        ].join(" ")}
                        to='edit/gaskets'
                    >
                        Прокладки
                    </Link>
                    <Link
                        className={[
                            classes.link,
                            partsUrl.includes("bolts") ? classes.active : null,
                        ].join(" ")}
                        to='edit/bolts'
                    >
                        Болты
                    </Link>
                    <Link
                        className={[
                            classes.link,
                            partsUrl.includes("avo") ? classes.active : null,
                        ].join(" ")}
                        to='edit/avo/device-mod'
                    >
                        АВО
                    </Link>
                </Tabs>

                <Button onClick={backHandler} variant='grayPrimary' rounded='round'>
                    Вернуться
                </Button>
            </div>
            <Suspense fallback={<Loader />}>
                <Outlet />
            </Suspense>
        </div>
    )
}
