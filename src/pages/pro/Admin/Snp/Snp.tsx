import { useCallback, useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { AdminGrap } from "../../../../components/AdminGrap/AdminGrap"
import { AdminMat } from "../../../../components/AdminMat/AdminMat"
import { AdminMoun } from "../../../../components/AdminMoun/AdminMoun"
import { Materials } from "../../../../components/Materials/Materials"
import { useModal } from "../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../components/Modal/Modal"
import { SizeTable } from "../../../../components/SizeTable/SizeTable"
import { Button } from "../../../../components/UI/Button/Button"
import { Checkbox } from "../../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../../components/UI/Input/Input"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { Select } from "../../../../components/UI/Select/Select"
import AdditService from "../../../../service/addit"
import ReadService from "../../../../service/read"
import { Dispatch, RootState } from "../../../../store/store"
import { IAddit, IFiller } from "../../../../types/addit"
import { ISize, ISizeReq } from "../../../../types/size"
import { ISNP, ISNPReq } from "../../../../types/snp"
import classes from "../pages.module.scss"

const { Option } = Select

const types = ["А", "Б", "В", "Г", "Д"]

export default function SNP() {
    const loading = useSelector((state: RootState) => state.addit.loading)
    const stfl = useSelector((state: RootState) => state.addit.stfl)
    const addit = useSelector((state: RootState) => state.addit.addit)

    const [st, setSt] = useState(stfl[0]?.id || "")
    const [snp, setSnp] = useState<ISNP[]>([])
    const [curSnp, setCurSnp] = useState<ISNP | null>(null)
    const [type, setType] = useState("Д")

    const [filler, setFiller] = useState("")
    const [tm, setTm] = useState("")
    const [temp, setTemp] = useState("0")

    const [isOpenTable, setIsOpenTable] = useState(false)

    const [sizes, setSizes] = useState<ISize[]>([])
    const [data, setData] = useState<IFiller | null>(null)
    const [sending, setSending] = useState(false)

    const dispatch = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFiller>()

    useEffect(() => {
        if (!stfl.length) dispatch.addit.getStFl()
    }, [stfl.length, dispatch.addit])

    const fetchSnp = useCallback(async (req: ISNPReq) => {
        console.log("fetchSnp")
        try {
            const res = await ReadService.getSnp(req)
            setSnp(res.data || [])
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        }
    }, [])

    const fetchSize = useCallback(async (req: ISizeReq) => {
        console.log("fetchSize")
        try {
            const res = await ReadService.getSize(req)
            setSizes(res.data)
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        }
    }, [])

    useEffect(() => {
        if (stfl.length) {
            fetchSnp({ standId: stfl[0].standId, flangeId: stfl[0].flangeId })
            setSt(stfl[0].id)
        }
    }, [stfl, fetchSnp])

    useEffect(() => {
        if (!snp.length) {
            setTm("")
            setTemp("")
            setCurSnp(null)
            return
        }

        const tmp = snp.filter(s => s.typeFlId.includes(curSnp?.typeFlId || ""))
        let index = tmp.findIndex(s => s.typePr === type)
        if (index === -1) index = 0

        if (index === 0) setType(tmp[index].typePr)
        const fil = tmp[index].fillers.split(";")[0]
        setFiller(fil.split("&")[0])
        setTm(fil.split("&")[1])
        setTemp(fil.split("&")[1].split(">")[0])

        setCurSnp(tmp[index])
    }, [curSnp?.typeFlId, snp, type])

    useEffect(() => {
        if (!!curSnp?.typePr && !!stfl.length) {
            const sf = stfl.find(s => s.id === st)
            if (sf)
                fetchSize({
                    typePr: curSnp.typePr,
                    typeFlId: curSnp.typeFlId,
                    standId: sf.standId,
                    flShort: sf.short,
                })
        }
    }, [curSnp?.typePr, curSnp?.typeFlId, stfl, st, fetchSize])

    const stHandler = (value: string) => {
        const sf = stfl.find(s => s.id === value)
        if (sf) fetchSnp({ standId: sf.standId, flangeId: sf.flangeId })
        setSt(value)
    }

    const addTypeHandler = (type: string) => () => {
        console.log(type)
        const tmp = snp.find(s => s.typePr.includes(type))
        if (!tmp) {
            console.log("not found")
            let typeFlId = "1"
            if (type === "Б" || type === "В") typeFlId = "2"
            if (type === "А") typeFlId = "3"
            const newPr: ISNP = {
                id: "",
                typeFlUrl: "",
                typeUrl: "",
                typeFlId: typeFlId,
                typePr: type,
                fillers: "",
                materials: "",
                defMat: "",
                mounting: "*",
                graphite: "*",
            }

            setSnp(prev => [...prev, newPr])
            setCurSnp(newPr)
            setType(type)
        } else {
            console.log("found")
            setSnp(prev => prev.filter(s => s.typePr !== type))
            if (curSnp?.typePr === type) setCurSnp(null)
        }
    }

    const typeHanlder = (type: string) => () => {
        setType(type)
        const tmp = snp.filter(s => s.typePr.includes(type))
        if (!tmp.length) {
            setCurSnp(null)
            setFiller("")
            setTm("")
            return
        }

        setCurSnp(tmp[0])
    }

    const tempHandler = (temp: string) => () => {
        let isTemp = false
        tm.split("@").forEach(t => {
            if (t.split(">")[0] === temp) isTemp = true
        })

        if (isTemp) setTemp(temp)
        else toast.error("Перед выбором необходимо добавить температуру")
    }
    const fillerHandler = (filler: string) => () => {
        const fil = curSnp?.fillers.split(";").find(f => f.split("&")[0] === filler) || ""
        if (!fil) {
            toast.error("Наполнитель не добавлен")
            return
        }

        setFiller(filler)
        const tm = fil.split("&")[1]
        setTm(tm)
        setTemp(tm?.split(">")[0] || "")
    }

    const addFillerHandler = (id: string) => () => {
        let tmp = curSnp?.fillers.split(";") || []
        if (id === filler) {
            const cur = tmp.find(f => f.split("&")[0] === id)
            if (cur) {
                tmp = tmp.filter(f => f.split("&")[0] !== id)
                setTm("")
            } else {
                tmp.push(`${id}&`)
                setTm("")
            }
        } else {
            const cur = tmp.find(f => f.split("&")[0] === id)
            if (cur) {
                tmp = tmp.filter(f => f.split("&")[0] !== id)
            } else {
                tmp.push(`${id}&`)
            }
        }

        let snp: ISNP = {} as ISNP
        if (curSnp) snp = Object.assign(snp, curSnp, { fillers: tmp.join(";") })
        setCurSnp(snp)
    }

    const addTempHandler = (temp: string) => () => {
        let tmp = tm.split("@")
        if (tmp[0] === "") tmp = []
        let orig = ""
        tmp.forEach(t => {
            if (t.split(">")[0] === temp) orig = t
            return ""
        })

        if (orig === "") {
            tmp.push(`${temp}>`)
            tmp.sort((a, b) => {
                return +a.split(">")[0] - +b.split(">")[0]
            })
        } else {
            tmp = tmp.filter(t => t.split(">")[0] !== temp)
        }

        setTm(tmp.join("@"))

        let fillers = curSnp?.fillers || ""
        let snp: ISNP = {} as ISNP

        if (curSnp)
            snp = Object.assign(snp, curSnp, {
                fillers: fillers.replace(`${filler}&${tm}`, `${filler}&${tmp.join("@")}`),
            })
        setCurSnp(snp)
    }

    const addModHandler = (mod: string) => () => {
        if (tm === "") {
            toast.error("Наполнитель не добавлен")
            return
        }
        let orig = ""
        tm.split("@").forEach(t => {
            if (t.split(">")[0] === temp) orig = t
            return ""
        })

        if (orig === "") {
            toast.error("Температура не добавлена")
            return
        }

        let tmp = orig.split(">")[1].split(",")
        if (tmp.length === 1 && tmp[0] === "") tmp = []

        if (tmp.includes(mod)) {
            tmp = tmp.filter(t => t !== mod)
        } else {
            tmp.push(mod)
        }

        const newTm = tm.replace(orig, `${temp}>${tmp.join(",")}`)
        setTm(newTm)

        let fillers = curSnp?.fillers || ""
        let snp: ISNP = {} as ISNP
        if (curSnp)
            snp = Object.assign(snp, curSnp, {
                fillers: fillers.replace(`${filler}&${tm}`, `${filler}&${newTm}`),
            })
        setCurSnp(snp)
    }

    const mounHandler = (value: string) => {
        let snp: ISNP = {} as ISNP
        if (curSnp) snp = Object.assign(snp, curSnp, { mounting: value })
        setCurSnp(snp)
    }

    const grapHandler = (value: string) => {
        let snp: ISNP = {} as ISNP
        if (curSnp) snp = Object.assign(snp, curSnp, { graphite: value })
        setCurSnp(snp)
    }

    const defMatHandler = (name: string) => (value: string) => {
        let snp: ISNP = {} as ISNP
        if (name === "frame") {
            let newFrame = curSnp?.frame?.split("&")[0] + "&" + value
            snp = Object.assign(snp, curSnp, { frame: newFrame })
        }
        if (name === "ir") {
            let newIr = curSnp?.ir?.split("&")[0] + "&" + value
            snp = Object.assign(snp, curSnp, { ir: newIr })
        }
        if (name === "or") {
            let newOr = curSnp?.or?.split("&")[0] + "&" + value
            snp = Object.assign(snp, curSnp, { or: newOr })
        }
        setCurSnp(snp)
    }

    const matHandler = (value: string, name: string) => {
        if (!curSnp) return

        let snp: ISNP = {} as ISNP
        let defValue = ""

        if (value === "*") defValue = addit?.materials.split(";")[0].split("@")[0] || ""
        else {
            let tmp =
                addit?.materials.split(";").find(m => m.split("@")[0] === value.split(";")[0]) || ""
            defValue = tmp.split("@")[0]
            console.log(defValue)
        }

        if (name === "frame") {
            let newFrame = ""
            let isInc = value.split(";").includes(curSnp.frame!.split("&")[1])

            if (value !== "")
                newFrame = value + "&" + (isInc ? curSnp.frame!.split("&")[1] : defValue)
            snp = Object.assign(snp, curSnp, { frame: newFrame })
        }
        if (name === "ir") {
            let newIr = ""
            let isInc = value.split(";").includes(curSnp.ir!.split("&")[1])

            if (value !== "") newIr = value + "&" + (isInc ? curSnp.ir!.split("&")[1] : defValue)
            snp = Object.assign(snp, curSnp, { ir: newIr })
        }
        if (name === "or") {
            let newOr = ""
            let isInc = value.split(";").includes(curSnp.or!.split("&")[1])

            if (value !== "") newOr = value + "&" + (isInc ? curSnp.or?.split("&")[1] : defValue)
            snp = Object.assign(snp, curSnp, { or: newOr })
        }
        setCurSnp(snp)
    }

    const openFillerHandler = () => {
        setData(null)
        setValue("short", "")
        setValue("title", "")
        setValue("description", "")
        toggle()
    }

    const updateFillerHandeler = (filler: string) => () => {
        const parts = filler.split("@")
        setData({ short: parts[0], title: parts[1], description: parts[2] })
        setValue("short", parts[0])
        setValue("title", parts[1])
        setValue("description", parts[2])
        toggle()
    }

    const openTableHandler = () => setIsOpenTable(prev => !prev)

    const deleteHandler = async () => {
        if (!addit || !data) return
        let fils = addit?.fillers.split(";") || []
        fils = fils.filter(f => f !== `${data.short}@${data.title}@${data.description}`)
        console.log(fils)

        try {
            setSending(true)
            await AdditService.updateFillers(addit.id, fils.join(";"))
            let add: IAddit = {} as IAddit
            Object.assign(add, addit, { fillers: fils.join(";") })
            dispatch.addit.setAddit(add)
            toast.success("Успешно удалено")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            setSending(false)
        }
    }

    const submitHandler = async (form: any) => {
        console.log(form)
        if (!addit) return
        let fils = addit.fillers.split(";") || []
        if (!data) {
            fils?.push(`${form.short}@${form.title}@${form.description}`)
        } else {
            fils = fils?.map(f => {
                if (f === `${data.short}@${data.title}@${data.description}`)
                    return `${form.short}@${form.title}@${form.description}`
                return f
            })
        }

        try {
            setSending(true)
            await AdditService.updateFillers(addit.id, fils.join(";"))
            let add: IAddit = {} as IAddit
            Object.assign(add, addit, { fillers: fils.join(";") })
            dispatch.addit.setAddit(add)
            toast.success(data ? "Успешно обновлено" : "Успешно создано")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            setSending(false)
        }
    }

    const renderTypes = () => {
        return types.map(t => {
            let s = snp.find(s => s.typePr === t)

            return (
                <div key={t} className={classes.types}>
                    <p
                        onClick={typeHanlder(t)}
                        className={`${classes.type} ${type === t ? classes.active : ""}`}
                    >
                        {t}
                    </p>
                    <Checkbox
                        id={t}
                        name={t}
                        onChange={addTypeHandler(t)}
                        checked={!!s}
                        label={!s ? "Добавить" : "Удалить"}
                    />
                </div>
            )
        })
    }

    const renderTemp = () => {
        return addit?.temperature.split(";").map(t => {
            const parts = t.split("@")
            let isAdded = false

            tm.split("@").forEach(t => {
                if (t.split(">")[0] === parts[0]) isAdded = true
            })

            return (
                <div key={parts[0]} className={classes.listItem}>
                    <Checkbox
                        name={parts[1]}
                        id={parts[1]}
                        checked={isAdded}
                        onChange={addTempHandler(parts[0])}
                    />
                    <p
                        className={`${classes.filItem} ${temp === parts[0] ? classes.active : ""}`}
                        onClick={tempHandler(parts[0])}
                    >
                        {parts[1]}
                    </p>
                </div>
            )
        })
    }

    const renderMod = () => {
        return addit?.mod.split(";").map(m => {
            let isAdded = false
            const parts = m.split("@")
            tm.split("@").forEach(t => {
                if (t !== "") {
                    if (t.split(">")[0] === temp) {
                        if (t.split(">")[1].includes(parts[0])) isAdded = true
                    }
                }
            })

            return (
                <div key={parts[0]} className={classes.listItem}>
                    <Checkbox
                        name={parts[1]}
                        id={parts[1]}
                        checked={isAdded}
                        onChange={addModHandler(parts[0])}
                        label={parts[1]}
                    />
                    {/* <p className={classes.filItem} onClick={addMod(parts[0])}>
                        {parts[1]}
                    </p> */}
                </div>
            )
        })
    }

    if (!addit || loading) {
        return <Loader />
    }

    return (
        <div className={classes.page}>
            {sending && (
                <div className={classes.loader}>
                    <Loader background='fill' />
                </div>
            )}
            {/* <div className={classes.line}>
                <List title='Стандарт на прокладку'>
                    {stand.map(s => (
                        <Item key={s.id}>{s.title}</Item>
                    ))}
                </List>
                <List title='Стандарт на фланец'>
                    {fl.map(f => (
                        <Item key={f.id}>{f.title}</Item>
                    ))}
                </List>
            </div>*/}
            <div className={classes.line}>
                {stfl && (
                    <Select value={st} onChange={stHandler}>
                        {stfl.map(s => (
                            <Option key={s.id} value={s.id}>
                                {s.stand} / {s.flange}
                            </Option>
                        ))}
                    </Select>
                )}
                {/* <Button>Добавить</Button> */}
            </div>
            <div className={classes.group}>
                <p>Тип СНП</p>
                <div className={classes.line}>{renderTypes()}</div>
            </div>

            <Modal isOpen={isOpen} toggle={toggle}>
                <Modal.Header title={!data ? "Добавить" : "Редактировать"} onClose={toggle} />
                <Modal.Content>
                    <form className={classes.form}>
                        <Input
                            name='short'
                            label='Короткое обозначение'
                            placeholder='3'
                            register={register}
                            rule={{ required: true }}
                            error={errors.short}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='title'
                            label='Название'
                            placeholder='F.G - ТРГ (агрессивные среды)'
                            register={register}
                            rule={{ required: true }}
                            error={errors.title}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='description'
                            label='Для описания'
                            placeholder='ТРГ (FG)'
                            register={register}
                            rule={{ required: true }}
                            error={errors.description}
                            errorText='Поле не заполнено'
                        />
                    </form>
                </Modal.Content>
                <Modal.Footer>
                    <Button variant='grayPrimary' fullWidth onClick={toggle}>
                        Отмена
                    </Button>
                    <p className={classes.offset} />
                    {data ? (
                        <>
                            <Button variant='danger' fullWidth onClick={deleteHandler}>
                                Удалить
                            </Button>
                            <p className={classes.offset} />
                        </>
                    ) : null}
                    <Button fullWidth onClick={handleSubmit(submitHandler)}>
                        {data ? "Сохранить" : "Добавить"}
                    </Button>
                </Modal.Footer>
            </Modal>

            <div className={classes.line}>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Тип наполнителя</p>
                    <p className={classes.add} onClick={openFillerHandler}>
                        Добавить
                    </p>
                    <div className={`${classes.list} scroll`}>
                        {addit?.fillers.split(";").map(fil => {
                            const parts = fil.split("@")

                            const f = curSnp?.fillers
                                .split(";")
                                .find(f => f.split("&")[0] === parts[0])

                            return (
                                <div key={parts[0]} className={classes.listItem}>
                                    <Checkbox
                                        name={parts[1]}
                                        id={parts[1]}
                                        checked={!!f}
                                        onChange={addFillerHandler(parts[0])}
                                    />
                                    <p
                                        className={`${classes.filItem} ${
                                            parts[0] === filler ? classes.active : ""
                                        }`}
                                        onClick={fillerHandler(parts[0])}
                                    >
                                        {parts[0]} {parts[1]}
                                    </p>
                                    <p className={classes.icon} onClick={updateFillerHandeler(fil)}>
                                        &#9998;
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Температура эксплуатации</p>
                    {addit?.temperature && (
                        <div className={`${classes.list} scroll`}>{renderTemp()}</div>
                    )}
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Модифицирующий элемент</p>
                    {addit?.mod && <div className={`${classes.list} scroll`}>{renderMod()}</div>}
                </div>
            </div>

            <div className={classes.line}>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Внутреннее кольцо</p>
                    <Materials
                        className={classes.def}
                        classTitle={classes.defTitle}
                        value={curSnp?.ir?.split("&")[1] || "Значение не выбрано"}
                        mater={curSnp?.ir?.split("&")[0] || ""}
                        onChange={defMatHandler("ir")}
                        disabled={!curSnp?.ir}
                        title='Значение по умолчанию'
                    />
                    <p className={classes.defTitle}>Доступные значения</p>
                    {addit?.materials && (
                        <AdminMat
                            className={classes.list}
                            classItem={classes.listItem}
                            name='ir'
                            mat={curSnp?.ir?.split("&")[0] || ""}
                            onChange={matHandler}
                        />
                    )}
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Каркас</p>
                    <Materials
                        className={classes.def}
                        classTitle={classes.defTitle}
                        value={curSnp?.frame?.split("&")[1] || "Значение не выбрано"}
                        mater={curSnp?.frame?.split("&")[0] || ""}
                        onChange={defMatHandler("frame")}
                        disabled={!curSnp?.frame}
                        title='Значение по умолчанию'
                    />
                    <p className={classes.defTitle}>Доступные значения</p>
                    {addit?.materials && (
                        <AdminMat
                            className={classes.list}
                            classItem={classes.listItem}
                            name='frame'
                            mat={curSnp?.frame?.split("&")[0] || ""}
                            onChange={matHandler}
                        />
                    )}
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Наружное кольцо</p>
                    <Materials
                        className={classes.def}
                        classTitle={classes.defTitle}
                        value={curSnp?.or?.split("&")[1] || "Значение не выбрано"}
                        mater={curSnp?.or?.split("&")[0] || ""}
                        onChange={defMatHandler("or")}
                        disabled={!curSnp?.or}
                        title='Значение по умолчанию'
                    />
                    <p className={classes.defTitle}>Доступные значения</p>
                    {addit?.materials && (
                        <AdminMat
                            className={classes.list}
                            classItem={classes.listItem}
                            name='or'
                            mat={curSnp?.or?.split("&")[0] || ""}
                            onChange={matHandler}
                        />
                    )}
                </div>
            </div>
            <div className={classes.line}>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Крепление на вертикальном фланце</p>
                    {addit?.mounting && (
                        <AdminMoun
                            className={classes.list}
                            classItem={classes.listItem}
                            moun={curSnp?.mounting || ""}
                            onChange={mounHandler}
                        />
                    )}
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Степень чистоты графитовой составляющей</p>
                    {addit?.graphite && (
                        <AdminGrap
                            className={classes.list}
                            classItem={classes.listItem}
                            graphite={curSnp?.graphite || ""}
                            onChange={grapHandler}
                        />
                    )}
                </div>
            </div>

            <div className={classes.line}>
                <Button rounded='round' variant='grayPrimary' onClick={openTableHandler}>
                    Размеры
                </Button>
                <span className={classes.full} />
                <Button rounded='round'>Сохранить</Button>
            </div>

            {isOpenTable && (
                <div className={classes.table}>
                    <div className={classes.header}>
                        <h5>Размеры</h5>
                        <p onClick={openTableHandler}>&times;</p>
                    </div>
                    <SizeTable data={sizes} />
                </div>
            )}
        </div>
    )
}
