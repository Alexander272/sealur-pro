import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Checkbox } from "../../../../components/UI/Checkbox/Checkbox"
import { Select } from "../../../../components/UI/Select/Select"
import ReadService from "../../../../service/read"
import { Dispatch, RootState } from "../../../../store/store"
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

        setCurSnp(tmp[index])
    }, [])

    useEffect(() => {
        if (stfl.length) {
            fetchSnp({ standId: stfl[0].standId, flangeId: stfl[0].flangeId })
        }
    }, [stfl])

    const typeHanlder = (type: string) => () => setType(type)

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

    const addMod = (mod: string) => () => {
        console.log(mod)
        let tmp = ""
        tm.split("@").forEach(t => {
            if (t.split(">")[0] === temp) tmp = t
        })

        //TODO при повторяющихся значениях в поле fillers значения в селекте тоже повторяются
        console.log(tmp)
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
                    <Checkbox name={parts[1]} id={parts[1]} checked={isAdded} onChange={() => {}} />
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
                if (t.split(">")[0] === temp) {
                    if (t.split(">")[1].includes(parts[0])) isAdded = true
                }
            })

            return (
                <div key={parts[0]} className={classes.listItem}>
                    <Checkbox
                        name={parts[1]}
                        id={parts[1]}
                        checked={isAdded}
                        onChange={addMod(parts[0])}
                    />
                    <p className={classes.filItem} onClick={addMod(parts[0])}>
                        {parts[1]}
                    </p>
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
                            return (
                                <div key={parts[0]} className={classes.listItem}>
                                    <Checkbox
                                        name={parts[1]}
                                        id={parts[1]}
                                        checked={(curSnp?.fillers.split(";")[idx].length || "") > 0}
                                        onChange={() => {}}
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
                    {tm && <div className={`${classes.list} scroll`}>{renderTemp()}</div>}
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Модифицирующий элемент</p>
                    {/* <p className={classes.add}>Добавить</p> */}
                    {tm && <div className={`${classes.list} scroll`}>{renderMod()}</div>}
                </div>
            </div>
        </div>
    )
}
