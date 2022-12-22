import { FC, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import SNPService from "../../../../../../../service/snp"
import { ISNP, ISNPDTO } from "../../../../../../../types/snp"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { ConfirmModal } from "../../../../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../../../../components/Modal/hooks/useModal"
import classes from "./type.module.scss"

type Props = {}

const types = ["А", "Б", "В", "Г", "Д"]

export const AdminType: FC<Props> = () => {
    const { isOpen, toggle } = useModal()

    const isModified = useRef(false)
    const isCurSnp = useRef(false)
    const t = useRef("")

    const stfl = useSelector((state: ProState) => state.addit.stfl)
    const snps = useSelector((state: ProState) => state.snp.snps)
    const snp = useSelector((state: ProState) => state.snp.snp)
    const st = useSelector((state: ProState) => state.snp.st)

    const dispatch = useDispatch<Dispatch>()

    // выбор прокладки (добавление если ее нет)
    const choseTypeHandler = (type: string) => () => {
        const isMod = checkSnp(type)
        if (isMod) return
        t.current = type

        const tmp = snps.filter(s => s.typePr.includes(type))
        if (!tmp.length) {
            const newSNP = createNewSnp(type)
            dispatch.snp.setSnps([...snps, newSNP])
            dispatch.snp.setSnp(newSNP)
            dispatch.snp.setFil("")
            dispatch.snp.setTemp("")
            return
        }

        dispatch.snp.setSnp(tmp[0])
        dispatch.snp.setFil(tmp[0].fillers[0].id)
        dispatch.snp.setTemp(tmp[0].fillers[0].temps[0].id || "")
    }

    // проверка. есть ли прокладка с таким типом в массиве
    const checkSnp = (type: string) => {
        if (!snps.length) return false

        if (type === snp?.typePr) {
            isCurSnp.current = true
            return false
        }
        isCurSnp.current = false

        const s = snps.find(s => JSON.stringify(s) === JSON.stringify(snp))

        if (snp?.id === "new" || !s) {
            isModified.current = true
            t.current = type
            toggle()
            return true
        }
        return false
    }

    // добавление (удаление) прокладки
    const changeTypeHandler = (curType: string) => () => {
        const isMod = checkSnp(curType)
        if (isMod) return
        t.current = curType

        const tmp = snps.find(s => s.typePr.includes(curType))
        if (!tmp) {
            const newSNP = createNewSnp(curType)
            dispatch.snp.setSnps([...snps, newSNP])
            dispatch.snp.setSnp(newSNP)
            dispatch.snp.setFil("")
            dispatch.snp.setTemp("")
        } else {
            toggle()
        }
    }

    // создание новой прокладки
    const createNewSnp = (curType: string) => {
        let typeFlId = "1"
        if (curType === "Б" || curType === "В") typeFlId = "2"
        if (curType === "А") typeFlId = "3"
        const newSNP: ISNP = {
            id: "new",
            typeFlId: typeFlId,
            typePr: curType,
            fillers: [],
            frame: { values: [], default: "" },
            ir: { values: [], default: "" },
            or: { values: [], default: "" },
            mounting: ["*"],
            graphite: ["*"],
        }

        return newSNP
    }

    // закрытие модалки
    const cancelHandler = () => {
        // t.current = ""
        toggle()
    }

    // закрытие модалки без сохранения изменений
    const denyHandler = () => {
        const newSnps = snps.filter(s => s.id !== "new")
        dispatch.snp.setSnps([...newSnps])
        const tmp = newSnps.filter(s => s.typePr.includes(t.current))
        toggle()

        if (!tmp.length) {
            const newSNP = createNewSnp(t.current)
            dispatch.snp.setSnps([...newSnps, newSNP])
            dispatch.snp.setSnp(newSNP)
            dispatch.snp.setFil("")
            dispatch.snp.setTemp("")
            return
        }
        dispatch.snp.setSnp(tmp[0])
        dispatch.snp.setFil(tmp[0].fillers[0].id)
        dispatch.snp.setTemp(tmp[0].fillers[0].temps[0].id || "")
        t.current = ""
        isModified.current = false
    }

    // закрытие модалки с сохранением и переходом на другую прокладку
    const saveHandler = async () => {
        if (!snp) {
            toast.error("Тип снп не добавлен")
            toggle()
            return
        }
        if (!snp.fillers.length) {
            toast.error("Наполнитель не выбран")
            toggle()
            return
        }

        const sf = stfl.find(s => s.id === st)
        if (!sf) return

        let id = ""
        try {
            dispatch.snp.setLoading(true)
            const data: ISNPDTO = {
                standId: sf.standId,
                flangeId: sf.flangeId,
                typeFlId: snp.typeFlId,
                typePr: snp.typePr,
                fillers: snp.fillers,
                frame: snp.frame,
                ir: snp.ir,
                or: snp.or,
                mounting: snp.mounting,
                graphite: snp.graphite,
            }

            if (snp.id === "new") {
                const res = await SNPService.create(data)
                id = res.id || ""
                toast.success("Успешно создано")
            } else {
                await SNPService.update(data, snp.id)
                id = snp.id
                toast.success("Успешно обновлено")
            }
        } catch (error: any) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            dispatch.snp.setLoading(false)
        }

        let tmp = [...snps]
        tmp = tmp.map(s => {
            if (s.id === snp.id) return { ...snp, id: id }
            return s
        })

        dispatch.snp.setSnps(tmp)

        const nextSnp = tmp.filter(s => s.typePr.includes(t.current))
        toggle()
        if (!nextSnp.length) {
            const newSNP = createNewSnp(t.current)
            tmp = [...tmp, newSNP]
            dispatch.snp.setSnps(tmp)
            dispatch.snp.setSnp(newSNP)
            dispatch.snp.setFil("")
            dispatch.snp.setTemp("")
            return
        }
        dispatch.snp.setSnp(nextSnp[0])
        dispatch.snp.setFil(nextSnp[0].fillers[0].id)
        dispatch.snp.setTemp(nextSnp[0].fillers[0].temps[0].id || "")
        t.current = ""
        isModified.current = false
    }

    // удаление прокладки
    const deleteHandler = async () => {
        isModified.current = false
        const tmp = snps.find(s => s.typePr.includes(t.current))
        if (tmp!.id !== "new") {
            try {
                dispatch.snp.setLoading(true)
                await SNPService.delete(tmp!.id)
                toast.success("Успешно удалено")
            } catch (error) {
                toast.error("Не удалось выполнить запрос на сервер")
            } finally {
                dispatch.snp.setLoading(false)
            }
        }
        const newSnps = snps.filter(s => s.typePr !== t.current)
        dispatch.snp.setSnps(newSnps)
        dispatch.snp.setSnp(newSnps[0] || null)
        toggle()
    }

    const renderTypes = () => {
        return types.map(t => {
            let s = snps.find(s => s.typePr === t)

            return (
                <div key={t} className={classes.types}>
                    <p
                        onClick={choseTypeHandler(t)}
                        className={`${classes.type} ${snp?.typePr === t ? classes.active : ""}`}
                    >
                        {t}
                    </p>
                    <Checkbox
                        id={t}
                        name={t}
                        onChange={changeTypeHandler(t)}
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
                title={
                    isModified.current && !isCurSnp.current
                        ? "Сохранить изменения?"
                        : "Удалить прокладку?"
                }
                isOpen={isOpen}
                isNo={isModified.current && !isCurSnp.current}
                toggle={cancelHandler}
                cancelHandler={cancelHandler}
                denyHandler={denyHandler}
                confirmHandler={
                    isModified.current && !isCurSnp.current ? saveHandler : deleteHandler
                }
            />
            {renderTypes()}
        </>
    )
}
