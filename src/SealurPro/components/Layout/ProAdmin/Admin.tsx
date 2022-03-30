import { Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Dispatch, ProState } from "../../../store/store"
import { GrapForm } from "../../../pages/Admin/components/AdditForms/GrapForm"
import { MatForm } from "../../../pages/Admin/components/AdditForms/MatForm"
import { ModForm } from "../../../pages/Admin/components/AdditForms/ModForm"
import { MounForm } from "../../../pages/Admin/components/AdditForms/MounForm"
import { TempForm } from "../../../pages/Admin/components/AdditForms/TempForm"
import { useModal } from "../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../components/Modal/Modal"
import { Tabs } from "../../../../components/Tabs/Tabs"
import { List } from "../../../../components/UI/List/List"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { IGrap, IMat, IMod, IMoun, ITemp } from "../../../types/addit"
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
    const addit = useSelector((state: ProState) => state.addit.addit)

    const dispatch = useDispatch<Dispatch>()

    const [formType, setFormType] = useState("mat")
    const [data, setData] = useState<any | null>(null)

    const { isOpen, toggle } = useModal()

    const location = useLocation()
    const pathname = location.pathname

    const [sending, setSending] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        if (!addit) dispatch.addit.getAddit()
        if (addit) setLoading(false)
    }, [addit, dispatch.addit])

    const openFormHandler = (formType: string) => () => {
        setData(null)
        setFormType(formType)
        toggle()
    }

    const updateMatHandler = (mat: IMat) => {
        setFormType("mat")
        setData({ short: mat.short, title: mat.title })
        toggle()
    }

    const updateTempHandler = (temp: ITemp) => {
        setFormType("temp")
        setData({ id: temp.id, title: temp.title })
        toggle()
    }

    const updateModHandler = (mod: IMod) => {
        setFormType("mod")
        setData({ id: mod.id, title: mod.title, short: mod.short, description: mod.description })
        toggle()
    }

    const updateMounHandler = (moun: IMoun) => {
        setFormType("moun")
        setData({ id: moun.id, title: moun.title })
        toggle()
    }

    const updateGrapHandler = (grap: IGrap) => {
        setFormType("grap")
        setData({ short: grap.short, title: grap.title, description: grap.description })
        toggle()
    }

    const sendHandler = () => setSending(prev => !prev)

    if (loading) {
        return <Loader />
    }

    return (
        <div className={classes.wrapper}>
            {sending && (
                <div className={classes.loader}>
                    <Loader background='fill' />
                </div>
            )}
            <Modal isOpen={isOpen} toggle={toggle}>
                <Modal.Header title={!data ? "Добавить" : "Редактировать"} onClose={toggle} />
                {formType === "mat" && (
                    <MatForm closeHandler={toggle} data={data} sendHandler={sendHandler} />
                )}
                {formType === "temp" && (
                    <TempForm closeHandler={toggle} data={data} sendHandler={sendHandler} />
                )}
                {formType === "mod" && (
                    <ModForm closeHandler={toggle} data={data} sendHandler={sendHandler} />
                )}
                {formType === "moun" && (
                    <MounForm closeHandler={toggle} data={data} sendHandler={sendHandler} />
                )}
                {formType === "grap" && (
                    <GrapForm closeHandler={toggle} data={data} sendHandler={sendHandler} />
                )}
            </Modal>
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
                <List
                    title='Материалы'
                    isOpen
                    addHandler={openFormHandler("mat")}
                    updateHandler={updateMatHandler}
                >
                    {addit?.materials.map(mat => {
                        return (
                            <Item key={mat.short} value={mat}>
                                {mat.short} {mat.title}
                            </Item>
                        )
                    })}
                </List>
                <List
                    title='Температура эксплуатации'
                    addHandler={openFormHandler("temp")}
                    updateHandler={updateTempHandler}
                >
                    {addit?.temperature.map(temp => {
                        return (
                            <Item key={temp.id} value={temp}>
                                {temp.title}
                            </Item>
                        )
                    })}
                </List>
                <List
                    title='Тип модифицирующего элемента'
                    addHandler={openFormHandler("mod")}
                    updateHandler={updateModHandler}
                >
                    {addit?.mod.map(mod => {
                        return (
                            <Item key={mod.id} value={mod}>
                                {mod.title}
                            </Item>
                        )
                    })}
                </List>
                <List
                    title='Крепление на вертикальном фланце'
                    addHandler={openFormHandler("moun")}
                    updateHandler={updateMounHandler}
                >
                    {addit?.mounting.map(m => {
                        return (
                            <Item key={m.id} value={m}>
                                {m.title}
                            </Item>
                        )
                    })}
                </List>

                <List
                    title='Степень чистоты графитовой составляющей'
                    addHandler={openFormHandler("grap")}
                    updateHandler={updateGrapHandler}
                >
                    {addit?.graphite.map(g => {
                        return (
                            <Item key={g.short} value={g}>
                                {g.short} {g.title}
                            </Item>
                        )
                    })}
                </List>
            </div>
        </div>
    )
}
