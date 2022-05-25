import { FC, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { ConfirmModal } from "../../../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../../../components/Modal/hooks/useModal"
import { Checkbox } from "../../../../../../../components/UI/Checkbox/Checkbox"
import PutgmService from "../../../../../../service/putgm"
import { Dispatch, ProState } from "../../../../../../store/store"
import { IPUTGM, IPutgmDTO } from "../../../../../../types/putgm"
import classes from "./type.module.scss"

type Props = {}

export const Type: FC<Props> = () => {
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)
    const putgms = useSelector((state: ProState) => state.putgm.putgms)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const form = useSelector((state: ProState) => state.putgm.form)
    const flange = useSelector((state: ProState) => state.putgm.flange)

    const dispatch = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()

    const t = useRef("")

    // создание новой прокладки
    const createNewPutgm = (curType: string) => {
        let typeFlId = "1"
        if (curType === "Б") typeFlId = "2"
        if (curType === "В") typeFlId = "3"
        const newPutgm: IPUTGM = {
            id: "new",
            typeFlId: typeFlId,
            typePr: `ПУТГм-${curType}`,
            form,
            construction: [
                { grap: "2", basis: [] },
                { grap: "1", basis: [] },
            ],
            temperatures: [
                { grap: "2", temps: [] },
                { grap: "1", temps: [] },
            ],
            basis: { values: [], default: "", obturators: [] },
            obturator: { values: [], default: "", obturators: [] },
            coating: ["*"],
            mounting: ["*"],
            graphite: ["2", "1"],
        }

        return newPutgm
    }

    // выбор прокладки (добавление если ее нет)
    const choseTypeHandler = (type: string) => () => {
        if (putgm?.id === "new") {
            t.current = type
            toggle()
            return
        }

        const tmp = putgms.filter(s => s.typePr.includes(`ПУТГм-${type}`))
        if (!tmp.length) {
            const newPutgm = createNewPutgm(type)
            dispatch.putgm.setPutgms([...putgms, newPutgm])
            dispatch.putgm.setPutgm(newPutgm)
            dispatch.putgm.setConstructions([])
            dispatch.putgm.setTemp("")
            return
        }

        dispatch.putgm.setPutgm(tmp[0])
        dispatch.putgm.setConstructions(tmp[0].construction[0]?.basis || [])
        // dispatch.putgm.setTemp(tmp[0].construction[0]?.temperatures[0]?.temp || "")
    }

    // добавление (удаление) прокладки
    const changeTypeHandler = (curType: string) => () => {
        const tmp = putgms.filter(s => s.typePr.includes(`ПУТГм-${curType}`))
        if (tmp.length) {
            if (tmp[0].id !== "new" && putgm?.id === "new") {
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

        if (putgm?.id === "new") {
            toast.info("Перед добавлением новой прокладки необходимо сохранить (удалить) текущую")
            return
        }

        const newPutgm = createNewPutgm(curType)
        dispatch.putgm.setPutgms([...putgms, newPutgm])
        dispatch.putgm.setPutgm(newPutgm)
        dispatch.putgm.setConstructions([])
        dispatch.putgm.setTemp("")
    }

    // закрытие модалки
    const cancelHandler = () => {
        toggle()
    }

    // закрытие модалки без сохранения изменений
    const denyHandler = (isToggle = true) => {
        const newPutgms = putgms.filter(p => p.id !== "new")
        dispatch.putgm.setPutgms([...newPutgms])
        const tmp = newPutgms.filter(p => p.typePr.includes(t.current))
        if (isToggle) toggle()

        if (!tmp.length) {
            const newPutgm = createNewPutgm(t.current)
            dispatch.putgm.setPutgms([...newPutgms, newPutgm])
            dispatch.putgm.setPutgm(newPutgm)
            dispatch.putgm.setConstructions([])
            dispatch.putgm.setTemp("")
            return
        }

        dispatch.putgm.setPutgm(tmp[0])
        dispatch.putgm.setConstructions(tmp[0].construction[0]?.basis || [])
        // dispatch.putgm.setTemp(tmp[0].construction[0]?.temperatures[0]?.temp || "")
        t.current = ""
    }

    // закрытие модалки с сохранением и переходом на другую прокладку
    const saveHandler = async () => {
        if (!putgm) {
            toast.error("Тип путгм не добавлен")
            toggle()
            return
        }

        let id = ""
        try {
            dispatch.putgm.setLoading(true)
            const data: IPutgmDTO = {
                flangeId: flange,
                typeFlId: putgm.typeFlId,
                typePr: putgm.typePr,
                form: putgm.form,
                construction: putgm.construction,
                temperatures: putgm.temperatures,
                basis: putgm.basis,
                obturator: putgm.obturator,
                coating: putgm.coating,
                mounting: putgm.mounting,
                graphite: putgm.graphite,
            }

            if (putgm.id === "new") {
                const res = await PutgmService.create(data)
                id = res.id || ""
                toast.success("Успешно создано")
            } else {
                await PutgmService.update(data, putgm.id)
                id = putgm.id
                toast.success("Успешно обновлено")
            }
        } catch (error: any) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            dispatch.putgm.setLoading(false)
        }

        let tmp = [...putgms]
        tmp = tmp.map(p => {
            if (p.id === putgm.id) return { ...putgm, id: id }
            return p
        })

        dispatch.putgm.setPutgms(tmp)
        toggle()

        const newPutgs = tmp.filter(s => s.typePr.includes(t.current))
        if (!newPutgs.length) {
            const newPutgm = createNewPutgm(t.current)
            dispatch.putgm.setPutgms([...tmp, newPutgm])
            dispatch.putgm.setPutgm(newPutgm)
            dispatch.putgm.setConstructions([])
            dispatch.putgm.setTemp("")
            return
        }
        dispatch.putgm.setPutgm(newPutgs[0])
        dispatch.putgm.setConstructions(newPutgs[0].construction[0]?.basis || [])
        // dispatch.putgm.setTemp(tmp[0].construction[0]?.temperatures[0]?.temp || "")
        t.current = ""
    }

    // удаление прокладки
    const deleteHandler = async () => {
        let id = putgm?.id || ""
        if (!putgm?.typePr.includes(t.current)) {
            const tmp = putgms.find(p => p.typePr.includes(t.current))
            id = tmp?.id || ""
        }

        try {
            dispatch.putgm.setLoading(true)
            await PutgmService.delete(id)
            toast.success("Успешно удалено")
        } catch (error) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            dispatch.putgm.setLoading(false)
        }

        const newPutgs = putgms.filter(p => p.typePr !== `ПУТГм-${t.current}`)
        dispatch.putgm.setPutgms(newPutgs)
        dispatch.putgm.setPutgm(newPutgs[0] || null)
        toggle()
    }

    const renderTypes = () => {
        return typeFl.map(t => {
            let s = putgms.find(p => p.typePr.toLowerCase() === `ПУТГм-${t.short}`.toLowerCase())

            return (
                <div key={t.id} className={classes.types}>
                    <p
                        onClick={choseTypeHandler(t.short || t.id)}
                        className={`${classes.type} ${
                            putgm?.typePr.toLowerCase() === `ПУТГм-${t.short}`.toLowerCase()
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
                title={putgm?.id === "new" ? "Сохранить изменения?" : "Удалить прокладку?"}
                isOpen={isOpen}
                isNo={putgm?.id === "new"}
                toggle={cancelHandler}
                cancelHandler={cancelHandler}
                denyHandler={denyHandler}
                confirmHandler={putgm?.id === "new" ? saveHandler : deleteHandler}
            />
            {renderTypes()}
        </>
    )
}
