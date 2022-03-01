import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Dispatch, RootState } from "../../../store/store"
import { Tabs } from "../../Tabs/Tabs"
import { List } from "../../UI/List/List"
import { Loader } from "../../UI/Loader/Loader"
import classes from "./admin.module.scss"

const initTabs: any = {
    def: {
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

const { Item } = List

export default function AdminLayout() {
    const addit = useSelector((state: RootState) => state.addit.addit)
    const materials = useSelector((state: RootState) => state.addit.addit?.materials)
    const mod = useSelector((state: RootState) => state.addit.addit?.mod)
    const temp = useSelector((state: RootState) => state.addit.addit?.temperature)
    const moun = useSelector((state: RootState) => state.addit.addit?.mounting)
    const grap = useSelector((state: RootState) => state.addit.addit?.graphite)

    const dispatch = useDispatch<Dispatch>()

    const location = useLocation()
    const pathname = location.pathname

    useEffect(() => {
        if (!addit) dispatch.addit.getAddit()
    }, [addit, dispatch.addit])

    return (
        <div className={classes.wrapper}>
            <div className={classes.main}>
                <Tabs
                    initWidth={initTabs[pathname.split("/")[2] || "def"].width}
                    initPos={initTabs[pathname.split("/")[2] || "def"].position}
                    type='nav'
                >
                    <Link
                        className={[
                            classes.link,
                            pathname === "/admin" ? classes.active : null,
                        ].join(" ")}
                        to='/admin'
                    >
                        СНП
                    </Link>
                    <Link
                        className={[
                            classes.link,
                            pathname === "/admin/putg" ? classes.active : null,
                        ].join(" ")}
                        to='/admin/putg'
                    >
                        ПУТГ
                    </Link>
                    <Link
                        className={[
                            classes.link,
                            pathname === "/admin/putgm" ? classes.active : null,
                        ].join(" ")}
                        to='/admin/putgm'
                    >
                        ПУТГм
                    </Link>
                </Tabs>

                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </div>

            <div className={classes.side}>
                <List title='Материалы' isOpen>
                    {materials?.split(";").map(mat => {
                        const parts = mat.split("@")
                        return (
                            <Item key={parts[0]}>
                                {parts[0]} {parts[1]}
                            </Item>
                        )
                    })}
                </List>
                <List title='Температура эксплуатации'>
                    {temp?.split(";").map(temp => {
                        const parts = temp.split("@")
                        return <Item key={parts[0]}>{parts[1]}</Item>
                    })}
                </List>
                <List title='Тип модифицирующего элемента'>
                    {mod?.split(";").map(mod => {
                        const parts = mod.split("@")
                        return <Item key={parts[0]}>{parts[1]}</Item>
                    })}
                </List>
                <List title='Крепление на вертикальном фланце'>
                    {moun?.split(";").map(m => {
                        return <Item key={m}>{m}</Item>
                    })}
                </List>

                <List title='Степень чистоты графитовой составляющей'>
                    {grap?.split(";").map(g => {
                        const parts = g.split("@")
                        return (
                            <Item key={parts[0]}>
                                {parts[0]} {parts[1]}
                            </Item>
                        )
                    })}
                </List>
            </div>
        </div>
    )
}
