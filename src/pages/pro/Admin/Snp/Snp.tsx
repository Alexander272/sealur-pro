import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { AdminMat } from "../../../../components/AdminMat/AdminMat"
import { AdminMoun } from "../../../../components/AdminMoun/AdminMoun"
import { SizeTable } from "../../../../components/SizeTable/SizeTable"
import { Button } from "../../../../components/UI/Button/Button"
import { Checkbox } from "../../../../components/UI/Checkbox/Checkbox"
import { Select } from "../../../../components/UI/Select/Select"
import ReadService from "../../../../service/read"
import { Dispatch, RootState } from "../../../../store/store"
import { ISize, ISizeReq } from "../../../../types/size"
import { ISNP, ISNPReq } from "../../../../types/snp"
import classes from "../pages.module.scss"

const { Option } = Select

const types = ["А", "Б", "В", "Г", "Д"]

export default function SNP() {
    const stfl = useSelector((state: RootState) => state.addit.stfl)
    const addit = useSelector((state: RootState) => state.addit.addit)

    const [st, setSt] = useState(stfl[0]?.id || "")
    const [flange, setFlange] = useState(stfl[0]?.flangeId || "")
    const [snp, setSnp] = useState<ISNP[]>([])
    const [curSnp, setCurSnp] = useState<ISNP | null>(null)
    const [type, setType] = useState("Д")

    const [filler, setFiller] = useState("0")
    const [tm, setTm] = useState("")
    const [temp, setTemp] = useState("0")

    const [frame, setFrame] = useState("")
    const [ir, setIr] = useState("")
    const [or, setOr] = useState("")

    const [isOpenTable, setIsOpenTable] = useState(false)

    const [sizes, setSizes] = useState<ISize[]>([])

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        if (!stfl.length) dispatch.addit.getStFl()
    }, [stfl.length, dispatch.addit])

    const fetchSnp = useCallback(async (req: ISNPReq) => {
        console.log("fetchSnp")

        const res = await ReadService.getSnp(req)
        setSnp(res.data)

        const tmp = res.data.filter(s => s.typeFlId.includes(flange))
        let index = tmp.findIndex(s => s.typePr.includes(type))
        if (index === -1) index = 0

        const fil = tmp[index].fillers.split(";")[0]
        setTm(fil)
        setTemp(fil.split(">")[0])

        setFrame(tmp[index]?.materials.split("&").find(mat => mat.split(";")[0] === "Каркас") || "")
        setOr(
            tmp[index]?.materials.split("&").find(mat => mat.split(";")[0] === "Наружное кольцо") ||
                ""
        )
        setIr(
            tmp[index]?.materials
                .split("&")
                .find(mat => mat.split(";")[0] === "Внутреннее кольцо") || ""
        )

        setCurSnp(tmp[index])
    }, [])

    const fetchSize = useCallback(async (req: ISizeReq) => {
        console.log("fetchSize")
        const res = await ReadService.getSize(req)
        setSizes(res.data)
    }, [])

    useEffect(() => {
        if (stfl.length) {
            fetchSnp({ standId: stfl[0].standId, flangeId: stfl[0].flangeId })
            setSt(stfl[0].id)
            setFlange(stfl[0].flangeId)
        }
    }, [stfl, fetchSnp])

    useEffect(() => {
        console.log(!!curSnp && !!stfl.length)

        if (!!curSnp && !!stfl.length) {
            const sf = stfl.find(s => s.id === st)
            console.log(sf, st)

            if (sf)
                fetchSize({
                    typePr: curSnp.typePr,
                    typeFlId: curSnp.typeFlId,
                    standId: sf.standId,
                    flShort: sf.short,
                })
        }
    }, [curSnp, stfl, st, fetchSize])

    const typeHanlder = (type: string) => () => {
        setType(type)
        const tmp = snp.filter(s => s.typePr.includes(type))
        setCurSnp(tmp[0])
        setFrame(tmp[0]?.materials.split("&").find(mat => mat.split(";")[0] === "Каркас") || "")
        setOr(
            tmp[0]?.materials.split("&").find(mat => mat.split(";")[0] === "Наружное кольцо") || ""
        )
        setIr(
            tmp[0]?.materials.split("&").find(mat => mat.split(";")[0] === "Внутреннее кольцо") ||
                ""
        )
    }

    const tempHandler = (temp: string) => () => {
        let isTemp = false
        tm.split("@").forEach(t => {
            if (t.split(">")[0] === temp) isTemp = true
        })

        if (isTemp) setTemp(temp)
        else toast.error("Перед выбором необходимо включить температуру")
    }
    const fillerHandler = (filler: string) => () => {
        setFiller(filler)
        const fil = curSnp?.fillers.split(";")[+filler] || ""
        setTm(fil)
        setTemp(fil.split(">")[0])
    }

    const addFillerHandler = (idx: number) => () => {
        const tmp = curSnp?.fillers.split(";") || []
        if (idx.toString() === filler) {
            if (tmp[idx] === "") {
                tmp[idx] = "0>"
                setTm("0>")
            } else {
                tmp[idx] = ""
                setTm("")
            }
        } else {
            if (tmp[idx] === "") tmp[idx] = "0>"
            else tmp[idx] = ""
        }

        let snp: ISNP = {} as ISNP
        if (curSnp) snp = Object.assign(snp, curSnp, { fillers: tmp.join(";") })
        setCurSnp(snp)
    }

    const addTempHandler = (temp: string) => () => {
        if (tm === "") {
            toast.error("Наполнитель не добавлен")
            return
        }
        let tmp = tm.split("@")
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
        if (tmp.includes(mod)) {
            tmp = tmp.filter(t => t !== mod)
        } else {
            tmp.push(mod)
        }

        const newTm = tm.replace(orig, `${temp}>${tmp.join(",")}`)
        setTm(newTm)
    }

    const mounHandler = (value: string) => {
        let snp: ISNP = {} as ISNP
        if (curSnp) snp = Object.assign(snp, curSnp, { mounting: value })
        setCurSnp(snp)
    }

    const matHandler = (value: string, name: string) => {
        if (name === "frame") setFrame(value)
        if (name === "ir") setIr(value)
        if (name === "or") setOr(value)
    }

    const openHandler = () => setIsOpenTable(prev => !prev)

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
                        onChange={() => {}}
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

    return (
        <div className={classes.page}>
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
                    <Select value='1' onChange={() => {}}>
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

            <div className={classes.line}>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Тип наполнителя</p>
                    <p className={classes.add}>Добавить</p>
                    <div className={`${classes.list} scroll`}>
                        {addit?.fillers.split(";").map((fil, idx) => {
                            const parts = fil.split("@")
                            const f = curSnp?.fillers.split(";")[idx] || ""
                            return (
                                <div key={parts[0]} className={classes.listItem}>
                                    <Checkbox
                                        name={parts[1]}
                                        id={parts[1]}
                                        checked={f.length > 0}
                                        onChange={addFillerHandler(idx)}
                                    />
                                    <p
                                        className={`${classes.filItem} ${
                                            idx.toString() === filler ? classes.active : ""
                                        }`}
                                        onClick={fillerHandler(idx.toString())}
                                    >
                                        {parts[0]} {parts[1]}
                                    </p>
                                </div>
                            )
                        })}
                    </div>
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Температура эксплуатации</p>
                    {/* <p className={classes.add}>Добавить</p> */}
                    {addit?.temperature && (
                        <div className={`${classes.list} scroll`}>{renderTemp()}</div>
                    )}
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Модифицирующий элемент</p>
                    {/* <p className={classes.add}>Добавить</p> */}
                    {addit?.mod && <div className={`${classes.list} scroll`}>{renderMod()}</div>}
                </div>
            </div>

            <div className={classes.line}>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Внутреннее кольцо</p>
                    {addit?.materials && (
                        <AdminMat
                            className={classes.list}
                            classItem={classes.listItem}
                            name='ir'
                            mat={ir.replace("Внутреннее кольцо;", "")}
                            onChange={matHandler}
                        />
                    )}
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Каркас</p>
                    {addit?.materials && (
                        <AdminMat
                            className={classes.list}
                            classItem={classes.listItem}
                            name='frame'
                            mat={frame.replace("Каркас;", "")}
                            onChange={matHandler}
                        />
                    )}
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Наружное кольцо</p>
                    {addit?.materials && (
                        <AdminMat
                            className={classes.list}
                            classItem={classes.listItem}
                            name='or'
                            mat={or.replace("Наружное кольцо;", "")}
                            onChange={matHandler}
                        />
                    )}
                </div>
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
            </div>

            <div className={classes.line}>
                <Button rounded='round' onClick={openHandler}>
                    Размеры
                </Button>
                <span className={classes.full} />
                <Button rounded='round'>Сохранить</Button>
            </div>

            {isOpenTable && (
                <div className={classes.table}>
                    <div className={classes.header}>
                        <h5>Размеры</h5>
                        <p onClick={openHandler}>&times;</p>
                    </div>
                    <SizeTable data={sizes} />
                </div>
            )}
        </div>
    )
}
