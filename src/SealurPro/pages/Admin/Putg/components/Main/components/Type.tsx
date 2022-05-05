import { FC, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { ConfirmModal } from "../../../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../../../components/Modal/hooks/useModal"
import { Checkbox } from "../../../../../../../components/UI/Checkbox/Checkbox"
import PutgService from "../../../../../../service/putg"
import { Dispatch, ProState } from "../../../../../../store/store"
import { IPUTG, IPutgDTO } from "../../../../../../types/putg"
import classes from "./type.module.scss"

type Props = {}

export const Type: FC<Props> = () => {
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)
    const putgs = useSelector((state: ProState) => state.putg.putgs)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const form = useSelector((state: ProState) => state.putg.form)
    const flange = useSelector((state: ProState) => state.putg.flange)

    const dispatch = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()

    const t = useRef("")

    // создание новой прокладки
    const createNewPutg = (curType: string) => {
        let typeFlId = "1"
        if (curType === "Б") typeFlId = "2"
        if (curType === "В") typeFlId = "3"
        const newPutg: IPUTG = {
            id: "new",
            typeFlId: typeFlId,
            typePr: `ПУТГ-${curType}`,
            form,
            construction: [
                { grap: "2", temperatures: [] },
                { grap: "1", temperatures: [] },
            ],
            temperatures: [
                { grap: "2", temps: [] },
                { grap: "1", temps: [] },
            ],
            reinforce: { values: [], default: "", obturators: [] },
            obturator: { values: [], default: "", obturators: [] },
            iLimiter: { values: [], default: "", obturators: [] },
            oLimiter: { values: [], default: "", obturators: [] },
            coating: ["*"],
            mounting: ["*"],
            graphite: ["2", "1"],
        }

        return newPutg
    }

    // выбор прокладки (добавление если ее нет)
    const choseTypeHandler = (type: string) => () => {
        if (putg?.id === "new") {
            t.current = type
            toggle()
            return
        }

        const tmp = putgs.filter(s => s.typePr.includes(`ПУТГ-${type}`))
        if (!tmp.length) {
            const newPutg = createNewPutg(type)
            dispatch.putg.setPutgs([...putgs, newPutg])
            dispatch.putg.setPutg(newPutg)
            dispatch.putg.setConstructions([])
            dispatch.putg.setTemp("")
            return
        }

        dispatch.putg.setPutg(tmp[0])
        dispatch.putg.setConstructions(tmp[0].construction[0]?.temperatures[0]?.constructions || [])
        dispatch.putg.setTemp(tmp[0].construction[0]?.temperatures[0]?.temp || "")
    }

    // добавление (удаление) прокладки
    const changeTypeHandler = (curType: string) => () => {
        const tmp = putgs.filter(s => s.typePr.includes(`ПУТГ-${curType}`))
        if (tmp.length) {
            if (tmp[0].id !== "new" && putg?.id === "new") {
                toast.info(
                    "Перед добавлением новой прокладки необходимо сохранить (удалить) текущую"
                )
                return
            }
            if (tmp[0].id === "new") {
                t.current = ""
                denyHandler(false)
                return
            }

            t.current = curType
            toggle()
            return
        }

        if (putg?.id === "new") {
            toast.info("Перед добавлением новой прокладки необходимо сохранить (удалить) текущую")
            return
        }

        const newPutg = createNewPutg(curType)
        dispatch.putg.setPutgs([...putgs, newPutg])
        dispatch.putg.setPutg(newPutg)
        dispatch.putg.setConstructions([])
        dispatch.putg.setTemp("")
    }

    // закрытие модалки
    const cancelHandler = () => {
        toggle()
    }

    // закрытие модалки без сохранения изменений
    const denyHandler = (isToggle = true) => {
        const newPutgs = putgs.filter(p => p.id !== "new")
        dispatch.putg.setPutgs([...newPutgs])
        const tmp = newPutgs.filter(p => p.typePr.includes(t.current))
        if (isToggle) toggle()

        if (!tmp.length) {
            const newPutg = createNewPutg(t.current)
            dispatch.putg.setPutgs([...newPutgs, newPutg])
            dispatch.putg.setPutg(newPutg)
            dispatch.putg.setConstructions([])
            dispatch.putg.setTemp("")
            return
        }

        dispatch.putg.setPutg(tmp[0])
        dispatch.putg.setConstructions(tmp[0].construction[0]?.temperatures[0]?.constructions || [])
        dispatch.putg.setTemp(tmp[0].construction[0]?.temperatures[0]?.temp || "")
        t.current = ""
    }

    // закрытие модалки с сохранением и переходом на другую прокладку
    const saveHandler = async () => {
        if (!putg) {
            toast.error("Тип путг не добавлен")
            toggle()
            return
        }

        let id = ""
        try {
            dispatch.putg.setLoading(true)
            const data: IPutgDTO = {
                flangeId: flange,
                typeFlId: putg.typeFlId,
                typePr: putg.typePr,
                form: putg.form,
                construction: putg.construction,
                temperatures: putg.temperatures,
                reinforce: putg.reinforce,
                obturator: putg.obturator,
                iLimiter: putg.iLimiter,
                oLimiter: putg.oLimiter,
                coating: putg.coating,
                mounting: putg.mounting,
                graphite: putg.graphite,
            }

            if (putg.id === "new") {
                const res = await PutgService.create(data)
                id = res.id || ""
                toast.success("Успешно создано")
            } else {
                await PutgService.update(data, putg.id)
                id = putg.id
                toast.success("Успешно обновлено")
            }
        } catch (error: any) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            dispatch.putg.setLoading(false)
        }

        let tmp = [...putgs]
        tmp = tmp.map(p => {
            if (p.id === putg.id) return { ...putg, id: id }
            return p
        })

        dispatch.putg.setPutgs(tmp)
        toggle()

        const newPutgs = tmp.filter(s => s.typePr.includes(t.current))
        if (!newPutgs.length) {
            const newPutg = createNewPutg(t.current)
            dispatch.putg.setPutgs([...newPutgs, newPutg])
            dispatch.putg.setPutg(newPutg)
            dispatch.putg.setConstructions([])
            dispatch.putg.setTemp("")
            return
        }
        dispatch.putg.setPutg(tmp[0])
        dispatch.putg.setConstructions(tmp[0].construction[0]?.temperatures[0]?.constructions || [])
        dispatch.putg.setTemp(tmp[0].construction[0]?.temperatures[0]?.temp || "")
        t.current = ""
    }

    // удаление прокладки
    const deleteHandler = async () => {
        let id = putg?.id || ""
        if (!putg?.typePr.includes(t.current)) {
            const tmp = putgs.find(p => p.typePr.includes(t.current))
            id = tmp?.id || ""
        }

        try {
            dispatch.putg.setLoading(true)
            await PutgService.delete(id)
            toast.success("Успешно удалено")
        } catch (error) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            dispatch.putg.setLoading(false)
        }

        const newPutgs = putgs.filter(p => p.typePr !== `ПУТГ-${t.current}`)
        dispatch.putg.setPutgs(newPutgs)
        dispatch.putg.setPutg(newPutgs[0] || null)
        toggle()
    }

    const renderTypes = () => {
        return typeFl.map(t => {
            let s = putgs.find(p => p.typePr.toLowerCase() === `ПУТГ-${t.short}`.toLowerCase())

            return (
                <div key={t.id} className={classes.types}>
                    <p
                        onClick={choseTypeHandler(t.short || t.id)}
                        className={`${classes.type} ${
                            putg?.typePr.toLowerCase() === `ПУТГ-${t.short}`.toLowerCase()
                                ? classes.active
                                : ""
                        }`}
                    >
                        {t.short} {t.title}
                    </p>
                    <Checkbox
                        id={t.short || t.id}
                        name={t.short || t.id}
                        onChange={changeTypeHandler(t.short || t.id)}
                        checked={!!s}
                        label={!s ? "Добавить" : "Удалить"}
                    />
                </div>
            )
        })
    }

    return (
        <>
            <ConfirmModal
                title={putg?.id === "new" ? "Сохранить изменения?" : "Удалить прокладку?"}
                isOpen={isOpen}
                isNo={putg?.id === "new"}
                toggle={cancelHandler}
                cancelHandler={cancelHandler}
                denyHandler={denyHandler}
                confirmHandler={putg?.id === "new" ? saveHandler : deleteHandler}
            />
            {renderTypes()}
        </>
    )
}
