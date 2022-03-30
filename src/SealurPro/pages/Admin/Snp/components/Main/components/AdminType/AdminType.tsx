import { FC, useRef } from "react"
import { ISNP, ISNPDTO } from "../../../../../../../types/snp"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { ConfirmModal } from "../../../../../../../../components/ConfirmModal/ConfirmModal"
import SNPService from "../../../../../../../service/snp"
import { useModal } from "../../../../../../../../components/Modal/hooks/useModal"
import { toast } from "react-toastify"
import { useSelector } from "react-redux"
import { ProState } from "../../../../../../../store/store"
import classes from "./type.module.scss"

type Props = {
    snps: ISNP[]
    type: string
    st: string
    snp: ISNP | null
    clickHandler: (type: string, snp: ISNP, isNew?: boolean) => void
    changeHandler: (type: string, newSnp: ISNP, isNew: boolean) => void
    denyHandler: () => void
    saveHandler: (id: string, type: string, newSnp: ISNP | null) => void
    sendHandler: (isSend: boolean) => void
}

const types = ["А", "Б", "В", "Г", "Д"]

export const AdminType: FC<Props> = ({
    snps,
    type,
    st,
    snp,
    clickHandler,
    changeHandler,
    denyHandler,
    saveHandler,
    sendHandler,
}) => {
    const { isOpen, toggle } = useModal()
    const isModified = useRef(false)
    const isCurSnp = useRef(false)
    const t = useRef("")
    const stfl = useSelector((state: ProState) => state.addit.stfl)

    const typeHandler = (type: string) => () => {
        const isMod = checkSnp(type)
        if (isMod) return
        t.current = type

        const tmp = snps.filter(s => s.typePr.includes(type))
        if (!tmp.length) {
            const newSNP = createNewSnp(type)
            // clickHandler(type, newSNP, true)
            return
        }

        clickHandler(type, tmp[0])
    }

    const checkSnp = (type: string) => {
        if (!snps.length) return false
        console.log(type, snp?.typePr, type === snp?.typePr)

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

    // TODO исправить
    const changeTypeHandler = (curType: string) => () => {
        console.log(curType !== type, curType, type)
        const isMod = checkSnp(curType)
        if (isMod) return
        t.current = curType

        const tmp = snps.find(s => s.typePr.includes(curType))
        // if (!tmp) {
        //     const newSNP = createNewSnp(curType)
        //     changeHandler(curType, newSNP, true)
        // } else {
        //     toggle()
        // }
    }

    const createNewSnp = (curType: string) => {
        let typeFlId = "1"
        if (curType === "Б" || curType === "В") typeFlId = "2"
        if (curType === "А") typeFlId = "3"
        // const newSNP: ISNP = {
        //     id: "new",
        //     typeFlUrl: "",
        //     typeUrl: "",
        //     typeFlId: typeFlId,
        //     typePr: curType,
        //     fillers: "",
        //     frame: "",
        //     ir: "",
        //     or: "",
        //     mounting: "*",
        //     graphite: "*",
        // }

        // return newSNP
    }

    const cancelHandler = () => {
        // t.current = ""
        toggle()
    }

    const deny = () => {
        denyHandler()
        const tmp = snps.filter(s => s.typePr.includes(t.current))
        toggle()

        if (!tmp.length) {
            const newSNP = createNewSnp(t.current)
            // clickHandler(t.current, newSNP, true)
            return
        }
        clickHandler(t.current, tmp[0])
        t.current = ""
        isModified.current = false
    }

    const save = async () => {
        if (!snp) {
            toast.error("Тип снп не добавлен")
            toggle()
            return
        }
        if (!snp.fillers) {
            toast.error("Наполнитель не выбран")
            toggle()
            return
        }

        let id = ""
        const sf = stfl.find(s => s.id === st)
        if (!sf) return

        try {
            sendHandler(true)
            // const data: ISNPDTO = {
            //     standId: sf.standId,
            //     flangeId: sf.flangeId,
            //     typeFlId: curSnp.typeFlId,
            //     typePr: curSnp.typePr,
            //     fillers: curSnp.fillers,
            //     frame: curSnp.frame || "",
            //     ir: curSnp.ir || "",
            //     or: curSnp.or || "",
            //     mounting: curSnp.mounting,
            //     graphite: curSnp.graphite,
            // }

            // if (curSnp.id === "new") {
            //     const res = await SNPService.create(data)
            //     id = res.id || ""
            //     toast.success("Успешно создано")
            // } else {
            //     await SNPService.update(data, curSnp.id)
            //     id = curSnp.id
            //     toast.success("Успешно обновлено")
            // }
        } catch (error: any) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            sendHandler(false)
        }

        const tmp = snps.filter(s => s.typePr.includes(t.current))
        toggle()

        if (!tmp.length) {
            const newSNP = createNewSnp(t.current)
            // saveHandler(id, t.current, newSNP)
            return
        }
        saveHandler(id, t.current, null)
        t.current = ""
        isModified.current = false
    }

    const deleteHandler = async () => {
        isModified.current = false
        const tmp = snps.find(s => s.typePr.includes(t.current))
        if (tmp!.id !== "new") {
            try {
                sendHandler(true)
                await SNPService.delete(tmp!.id)
                toast.success("Успешно удалено")
            } catch (error) {
                toast.error("Не удалось выполнить запрос на сервер")
            } finally {
                sendHandler(false)
            }
        }
        changeHandler(t.current, tmp!, false)
        toggle()
    }

    const renderTypes = () => {
        return types.map(t => {
            let s = snps.find(s => s.typePr === t)

            return (
                <div key={t} className={classes.types}>
                    <p
                        onClick={typeHandler(t)}
                        className={`${classes.type} ${type === t ? classes.active : ""}`}
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
                denyHandler={deny}
                confirmHandler={isModified.current && !isCurSnp.current ? save : deleteHandler}
            />
            {renderTypes()}
        </>
    )
}
