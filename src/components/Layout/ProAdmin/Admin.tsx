import { Suspense, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Link, Outlet, useLocation } from "react-router-dom"
import { Dispatch, RootState } from "../../../store/store"
import { GrapForm } from "../../AdditForms/GrapForm"
import { MatForm } from "../../AdditForms/MatForm"
import { ModForm } from "../../AdditForms/ModForm"
import { MounForm } from "../../AdditForms/MounForm"
import { TempForm } from "../../AdditForms/TempForm"
import { useModal } from "../../Modal/hooks/useModal"
import { Modal } from "../../Modal/Modal"
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

    const updateMatHandler = (value: string) => {
        setFormType("mat")
        const parts = value.split("@")
        setData({ short: parts[0], title: parts[1] })
        toggle()
    }

    const updateTempHandler = (value: string) => {
        setFormType("temp")
        const parts = value.split("@")
        setData({ id: parts[0], title: parts[1] })
        toggle()
    }

    const updateModHandler = (value: string) => {
        setFormType("mod")
        const parts = value.split("@")
        setData({ id: parts[0], title: parts[1], short: parts[2], description: parts[3] })
        toggle()
    }

    const updateMounHandler = (value: string) => {
        setFormType("moun")
        const parts = value.split("@")
        setData({ id: parts[0], title: parts[1] })
        toggle()
    }

    const updateGrapHandler = (value: string) => {
        setFormType("grap")
        const parts = value.split("@")
        setData({ short: parts[0], title: parts[1], description: parts[2] })
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
                    {materials?.split(";").map(mat => {
                        const parts = mat.split("@")
                        return (
                            <Item key={parts[0]} value={mat}>
                                {parts[0]} {parts[1]}
                            </Item>
                        )
                    })}
                </List>
                <List
                    title='Температура эксплуатации'
                    addHandler={openFormHandler("temp")}
                    updateHandler={updateTempHandler}
                >
                    {temp?.split(";").map(temp => {
                        const parts = temp.split("@")
                        return (
                            <Item key={parts[0]} value={temp}>
                                {parts[1]}
                            </Item>
                        )
                    })}
                </List>
                <List
                    title='Тип модифицирующего элемента'
                    addHandler={openFormHandler("mod")}
                    updateHandler={updateModHandler}
                >
                    {mod?.split(";").map(mod => {
                        const parts = mod.split("@")
                        return (
                            <Item key={parts[0]} value={mod}>
                                {parts[1]}
                            </Item>
                        )
                    })}
                </List>
                <List
                    title='Крепление на вертикальном фланце'
                    addHandler={openFormHandler("moun")}
                    updateHandler={updateMounHandler}
                >
                    {moun?.split(";").map(m => {
                        const parts = m.split("@")
                        return (
                            <Item key={m} value={m}>
                                {parts[1]}
                            </Item>
                        )
                    })}
                </List>

                <List
                    title='Степень чистоты графитовой составляющей'
                    addHandler={openFormHandler("grap")}
                    updateHandler={updateGrapHandler}
                >
                    {grap?.split(";").map(g => {
                        const parts = g.split("@")
                        return (
                            <Item key={parts[0]} value={g}>
                                {parts[0]} {parts[1]}
                            </Item>
                        )
                    })}
                </List>
            </div>
        </div>
    )
}
