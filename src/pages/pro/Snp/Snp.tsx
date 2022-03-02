import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ResultBlock } from "../../../components/ResultBlock/ResultBlock"
import { Tabs } from "../../../components/Tabs/Tabs"
import { Checkbox } from "../../../components/UI/Checkbox/Checkbox"
import { Select } from "../../../components/UI/Select/Select"
import { Mounting } from "../../../components/Mounting/Mounting"
import { Materials } from "../../../components/Materials/Materials"
import { Graphite } from "../../../components/Graphite/Graphite"
import { Jumper } from "../../../components/Jumper/Jumper"
import { Input } from "../../../components/UI/Input/Input"
import { Dispatch, RootState } from "../../../store/store"
import { ISNP, ISNPReq } from "../../../types/snp"
import { ISize, ISizeReq } from "../../../types/size"
import ReadService from "../../../service/read"
import classes from "../Putg/putg.module.scss"
import { FileInput } from "../../../components/UI/FileInput/FileInput"

const types = [
    {
        value: "А",
        width: 39,
    },
    {
        value: "Б",
        width: 38,
    },
    {
        value: "В",
        width: 37,
    },
    {
        value: "Г",
        width: 36,
    },
    {
        value: "Д",
        width: 41,
    },
]

const { Option } = Select

export default function Snp() {
    // const loading = useSelector((state: RootState) => state.flange.loading)
    const stfl = useSelector((state: RootState) => state.addit.stfl)
    const typeFl = useSelector((state: RootState) => state.addit.typeFl)
    const addit = useSelector((state: RootState) => state.addit.addit)

    const dispatch = useDispatch<Dispatch>()

    const [st, setSt] = useState(stfl[0]?.id || "")
    const [flange, setFlange] = useState("1")
    const [snp, setSnp] = useState<ISNP[]>([])
    const [curSnp, setCurSnp] = useState<ISNP | null>(null)

    const [type, setType] = useState({
        value: "Д",
        index: types.findIndex(t => t.value === "Д"),
    })

    const [mat, setMat] = useState<string[]>([])
    const [isMoun, setIsMoun] = useState(false)
    const [moun, setMoun] = useState("")
    const [isJumper, setIsJumper] = useState(false)
    const [jumper, setJumper] = useState("A")
    const [jumpWidth, setJumpWidth] = useState("")
    const [holes, setHoles] = useState(false)

    const [grap, setGrap] = useState("2")
    const [filler, setFiller] = useState("0")
    const [tm, setTm] = useState("")
    const [temp, setTemp] = useState("0")
    const [mod, setMod] = useState("0")

    const [sizes, setSizes] = useState<{ data: ISize[]; dn: string[] } | null>(null)
    const [curSize, setCurSize] = useState<ISize | null>(null)
    const [d4, setD4] = useState("")
    const [d3, setD3] = useState("")
    const [d2, setD2] = useState("")
    const [d1, setD1] = useState("")

    const [pass, setPass] = useState("")
    const [allD2, setAllD2] = useState<string[] | null>(null)
    const [pressure, setPressure] = useState("")
    const [thickness, setThickness] = useState("")
    const [athic, setAThick] = useState("")

    const [isOpenIr, setIsOpenIr] = useState(false)
    const [isOpenOr, setIsOpenOr] = useState(false)
    const [isOpenFrame, setIsOpenFrame] = useState(false)

    const fetchSnp = useCallback(async (req: ISNPReq) => {
        console.log("fetchSnp")

        const res = await ReadService.getSnp(req)
        setSnp(res.data)

        const tmp = res.data.filter(s => s.typeFlId.includes(flange))
        let index = tmp.findIndex(s => s.typePr.includes(type.value))
        if (index === -1) index = 0

        setTm(tmp[index].fillers.split(";")[0])
        setCurSnp(tmp[index])
    }, [])

    const fetchSize = useCallback(
        async (req: ISizeReq) => {
            console.log("fetchSize")
            const res = await ReadService.getSize(req)

            const s = stfl.find(s => s.id === st)
            if (s?.standId === "1") {
                const d2 = new Set<string>()
                for (let i = 0; i < res.data.length; i++) {
                    d2.add(res.data[i].d2)
                }
                setAllD2(Array.from(d2))
            } else {
                setAllD2(null)
            }

            setCurSize(res.data[0])
            setPass(res.data[0].dn)
            setPressure(res.data[0].pn.split(";")[0])
            setSizes(res)
        },
        [st, stfl]
    )

    const fetchDef = useCallback(async () => {
        console.log("fetchDef")
        const res = await ReadService.getDefault()

        setSnp(res.data.snp)
        const tmp = res.data.snp.filter(s => s.typeFlId.includes(flange))
        let index = tmp.findIndex(s => s.typePr.includes(type.value))
        if (index === -1) index = 0
        setTm(tmp[index].fillers.split(";")[0])
        setCurSnp(tmp[index])

        setSizes(res.data.size)
        setCurSize(res.data.size.data[0])
        setPass(res.data.size.data[0].dn)
        setPressure(res.data.size.data[0].pn.split(";")[0])

        const d2 = new Set<string>()
        for (let i = 0; i < res.data.size.data.length; i++) {
            d2.add(res.data.size.data[i].d2)
        }
        setAllD2(Array.from(d2))

        dispatch.addit.setTypeFl(res.data.typeFl)
    }, [])

    useEffect(() => {
        fetchDef()
        dispatch.addit.getStFl()
        dispatch.addit.getAddit()
    }, [fetchDef, dispatch.addit])

    useEffect(() => {
        if (stfl.length > 0) setSt(stfl[0].id)
    }, [stfl])

    useEffect(() => {
        if (curSize) {
            setThickness(curSize.h.split(";")[0])
            setD4(curSize.d4 || "")
            setD3(curSize.d3)
            setD2(curSize.d2)
            setD1(curSize.d1 || "")
        }
    }, [curSize])

    useEffect(() => {
        if (addit?.mounting) setMoun(addit?.mounting.split(";")[0])
    }, [addit?.mounting])

    useEffect(() => {
        setMat([])
        curSnp?.defMat.split("&").forEach(m => {
            setMat(prev => [...prev, m])
        })
    }, [curSnp?.defMat])

    const flangeHandler = (value: string) => {
        setFlange(value)
        const tmp = snp.filter(s => s.typeFlId.includes(value))
        setCurSnp(tmp[0])
        setType({ value: tmp[0].typePr, index: types.findIndex(t => t.value === tmp[0].typePr) })
    }

    const typeHandler = (event: React.MouseEvent<any>) => {
        const type = (event.target as HTMLParagraphElement).dataset.type
        const idx = (event.target as HTMLParagraphElement).dataset.index
        if (type && idx) {
            setType({ value: type, index: +idx })

            const tmp = snp.filter(s => s.typePr.includes(type))
            setCurSnp(tmp[0])
            setFlange(tmp[0].typeFlId)

            const s = stfl.find(s => s.id === st)
            fetchSize({
                typePr: `снп-${type}`,
                flShort: s!.short,
                typeFlId: tmp[0].typeFlId,
                standId: s!.standId,
            })
        }
    }

    const passHandler = (value: string) => {
        setPass(value)
        let size = sizes?.data.find(s => s.pn.includes(pressure) && s.dn === value)
        if (size) {
            setCurSize(size)
        } else {
            size = sizes?.data.find(s => s.dn === value)
            if (size) {
                setCurSize(size)
                setPressure(size.pn.split(";")[0])
            }
        }
    }
    const pressHandler = (value: string) => {
        setPressure(value)
        const size = sizes?.data.find(s => s.pn.includes(value) && s.dn === pass)
        if (size) setCurSize(size)
    }
    const allD2Handler = (value: string) => {
        let size = sizes?.data.find(s => s.pn.includes(pressure) && s.d2 === value)
        if (size) {
            setPass(size.dn)
            setCurSize(size)
        } else {
            size = sizes?.data.find(s => s.d2 === value)
            if (size) {
                setPass(size.dn)
                setPressure(size.pn.split(";")[0])
                setCurSize(size)
            }
        }
    }
    const ThicHandler = (value: string) => {
        setThickness(value)
    }

    const mounHandler = (value: string) => {
        setMoun(value)
    }
    const jumperHandler = (value: string) => {
        setJumper(value)
    }
    const grapHandler = (value: string) => {
        setGrap(value)
    }

    const tempHandler = (value: string) => {
        setTemp(value)
        const curTm = tm.split("@")[+value]
        if (!curTm.split(",").includes(mod)) {
            setMod(curTm.split(",")[0])
        }
    }

    const modHandler = (value: string) => {
        setMod(value)
        tm.split("@").forEach((curTm, idx) => {
            if (curTm.includes(value)) {
                if (temp !== idx.toString()) setTemp(idx.toString())
            }
        })
    }

    const matHandler = (idx: number) => (value: string) => {
        setMat(prev => {
            const arr = [...prev]
            arr[idx] = value
            return arr
        })
    }

    const fillerHandler = (value: string) => {
        setFiller(value)
        setTm(curSnp?.fillers.split(";")[+value] || "")
    }

    const isJumperHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setIsJumper(event.target.checked)
    const isMounHandler = (event: ChangeEvent<HTMLInputElement>) => setIsMoun(event.target.checked)
    const holesHandler = (event: ChangeEvent<HTMLInputElement>) => setHoles(event.target.checked)
    const athicHandler = (event: ChangeEvent<HTMLInputElement>) => setAThick(event.target.value)
    const jumpWidthHandler = (event: ChangeEvent<HTMLInputElement>) =>
        setJumpWidth(event.target.value)

    const createDescr = (): string => {
        const s = stfl.find(s => s.id === st)
        let matname = ["", "", ""]
        addit?.materials.split(";").forEach(m => {
            mat.forEach((mat, idx) => {
                if (m.split("@")[0] === mat) {
                    matname[idx] = m.split("@")[1]
                }
            })
        })

        let rings
        switch (type.value) {
            case "Д":
                rings = `(с наружным ${matname[2]} и внутренним ${matname[0]} ограничительными кольцами), с металлическим каркасом из ленты ${matname[1]}`
                break
            case "Г":
                rings = `(с наружным ограничительным кольцом ${matname[1]}), с металлическим каркасом из ленты ${matname[0]}`
                break
            case "В":
                rings = `(с внутренним ограничительным кольцом ${matname[0]}), с металлическим каркасом из ленты ${matname[1]}`
                break
            case "Б":
                rings = `(без ограничительных колец), с металлическим каркасом из ленты ${matname[0]}`
                break
            case "А":
                rings = `(без ограничительных колец), с металлическим каркасом из ленты ${matname[0]}`
                break
        }

        const fil = addit?.fillers.split(";")[+filler].split("@")[2]

        let gr = ""
        addit?.graphite.split(";").forEach(g => {
            if (g.split("@")[0] === grap) gr = g.split("@")[2]
        })
        const tfl = typeFl.find(typefl => typefl.id === curSnp?.typeFlId)

        let sizes = ""
        if (d4 !== "" && curSnp?.typePr !== "Г") sizes += d4 + "*"
        sizes += `${d3}*${d2}`
        if (d1 !== "") sizes += "*" + d1

        let thick = thickness
        if (thickness === "др.") thick = athic

        let modif = ""
        if (mod !== "0") {
            let m = addit?.mod.split(";")[+mod].split("@")
            if (m) modif = `, с добавлением ${m[3]}`
        }

        let mount = ""
        if (isMoun) mount = `, с фиксатором ${moun}`

        let h = ""
        if (holes) h = `, с отверстиями (по чертежу)`

        let jum = ""
        if (isJumper) {
            let width = ""
            if (jumpWidth !== "") width = ` шириной ${jumpWidth}мм`
            jum = `, с перемычкой типа ${jumper}${width}`
        }

        let res = `Спирально-навитая прокладка (СНП) по ${s?.stand} типа ${type.value} ${rings} и наполнителем из ${fil} ${gr}, для применения на фланце "${tfl?.title}" по ${s?.flange} с размерами ${sizes}, толщиной ${thick}мм${modif}${mount}${h}${jum}`

        return res
    }

    const createDesig = (): string => {
        let res: string = ""
        const s = stfl.find(s => s.id === st)

        const fil = addit?.fillers.split(";")[+filler].split("@")[0]
        const py = pressure.split(" ")[0]

        let thick = thickness
        if (thickness === "др.") thick = athic

        let mater = mat.join("")
        if (mater === curSnp?.defMat.replaceAll("&", "")) mater = ""
        if (mater !== "") {
            if (type.value === "Г") mater = 0 + mater
            if (type.value === "В") mater += 0
            if (type.value === "Б" || type.value === "А") mater = 0 + mater + 0
            mater = "-" + mater
        }

        let modif = ""
        let m = addit?.mod.split(";")[+mod].split("@")[2]
        if (m) modif = `-${m}`

        let mount = ""
        if (isMoun) mount = `(${moun})`
        if (holes) mount = `(черт.)`
        if (isMoun && holes) mount = `(${moun}, черт.)`

        let sizes = ""
        if (d4 !== "" && curSnp?.typePr !== "Г") sizes += d4 + " x "
        sizes += `${d3} x ${d2}`
        if (d1 !== "") sizes += " x " + d1

        switch (s?.standId) {
            case "1":
                res = `СНП-${type.value}-${fil}-${d2}-${py}-${thick}${mater}${modif}${mount} ${s.stand} [${sizes}]`
                break
        }

        return res
    }

    const createExcretion = (t: string, pos: string) => {
        let cl = t + pos
        if (type.value === "Д" || type.value === "Г") {
            return <div className={`${classes.e} ${classes[cl]}`}></div>
        } else {
            return <div className={`${classes.a} ${classes[cl]}`}></div>
        }
    }

    return (
        <>
            <h3 className={classes.description}>Спирально-навитые прокладки</h3>
            <div className={classes.container}>
                <div className={`${classes.block} ${classes.full}`}>
                    {stfl.length > 0 && (
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>
                                Стандарт на прокладку / стандарт на фланец
                            </p>
                            <Select value={st} onChange={() => {}}>
                                {stfl.map(d => (
                                    <Option key={d.id} value={d.id}>
                                        {d.stand} / {d.flange}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    )}
                    {typeFl.length > 0 && (
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>Тип фланца</p>
                            <Select value={flange} onChange={flangeHandler}>
                                {typeFl
                                    .filter(tfl => snp.some(s => s.typeFlId === tfl.id))
                                    .map(tfl => (
                                        <Option key={tfl.id} value={tfl.id}>
                                            {tfl.short} {tfl.title} {tfl.descr}
                                        </Option>
                                    ))}
                            </Select>
                        </div>
                    )}
                    {types && type ? (
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>Тип СНП</p>
                            <Tabs
                                initWidth={types[type.index].width}
                                initPos={types.reduce((ac, cur, index) => {
                                    if (index >= type.index) return ac
                                    return ac + cur.width
                                }, 0)}
                                onClick={typeHandler}
                            >
                                {types.map((t, idx) => (
                                    <p
                                        key={t.value}
                                        className={[
                                            classes.variants,
                                            type.value === t.value ? classes.active : "",
                                        ].join(" ")}
                                        data-type={t.value}
                                        data-index={idx}
                                    >
                                        {t.value}
                                    </p>
                                ))}
                            </Tabs>
                        </div>
                    ) : null}
                </div>
                <div className={`${classes.block} ${classes.snpDraw}`}>
                    <p className={classes.titleGroup}>Чертеж типа фланца</p>
                    <div className={classes.blockImage}>
                        <img
                            className={classes.image}
                            width={600}
                            height={319}
                            src={curSnp?.typeFlUrl}
                            alt='flange type drawing'
                        />
                    </div>
                </div>
            </div>
            <div className={classes.container}>
                <div className={`${classes.block} ${classes.full}`}>
                    {sizes?.dn && (
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>Условный проход, мм</p>
                            <Select
                                value={sizes.dn.includes(pass) ? pass : sizes.dn[0]}
                                onChange={passHandler}
                            >
                                {sizes?.dn.map(dn => (
                                    <Option key={dn} value={dn}>
                                        {dn}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    )}
                    {allD2 && (
                        <div className={classes.group}>
                            <p className={classes.titleGroup}>D2</p>
                            <Select value={curSize?.d2 || ""} onChange={allD2Handler}>
                                {allD2.map(d => (
                                    <Option key={d} value={d}>
                                        {d}
                                    </Option>
                                ))}
                            </Select>
                        </div>
                    )}
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Давление Ру, МПа</p>
                        {sizes?.data && (
                            <Select value={pressure} onChange={pressHandler}>
                                {sizes?.data
                                    .filter(s => s.dn === pass)
                                    .map(s => {
                                        if (s.pn.includes(";")) {
                                            return s.pn.split(";").map(pn => (
                                                <Option key={pn} value={pn}>
                                                    {pn}
                                                </Option>
                                            ))
                                        }
                                        return (
                                            <Option key={s.pn} value={s.pn}>
                                                {s.pn}
                                            </Option>
                                        )
                                    })}
                            </Select>
                        )}
                    </div>

                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Толщина прокладки</p>
                        <div className={classes.thic}>
                            {curSize?.h && (
                                <Select value={thickness} onChange={ThicHandler}>
                                    {curSize.h.split(";").map(h => (
                                        <Option key={h} value={h}>
                                            {h}
                                        </Option>
                                    ))}
                                    <Option value='др.'>др.</Option>
                                </Select>
                            )}
                            {thickness === "др." && (
                                <Input
                                    placeholder='толщина'
                                    min={0.1}
                                    step={0.1}
                                    value={athic}
                                    type='number'
                                    name='thickness'
                                    onChange={athicHandler}
                                />
                            )}
                        </div>
                    </div>
                </div>
                <div className={`${classes.block} ${classes.snpDrawFl}`}>
                    <p className={classes.titleGroup}>Чертеж прокладки</p>
                    <div className={`${classes.blockImage}`}>
                        <div className={classes.imageContainer}>
                            <img
                                className={classes.image}
                                width={800}
                                height={348}
                                src={curSnp?.typeUrl}
                                alt='gasket drawing'
                            />
                            {isOpenIr && (
                                <>
                                    {createExcretion("ir", "Left")}
                                    {createExcretion("ir", "Right")}
                                </>
                            )}
                            {isOpenOr && (
                                <>
                                    {createExcretion("or", "Left")}
                                    {createExcretion("or", "Right")}
                                </>
                            )}
                            {isOpenFrame && (
                                <>
                                    {createExcretion("fr", "Left")}
                                    {createExcretion("fr", "Right")}
                                </>
                            )}

                            {type.value === "Д" || type.value === "Г" ? (
                                <>
                                    <p className={`${classes.sizes} ${classes.e} ${classes.h}`}>
                                        {thickness !== "др." ? thickness : athic}
                                    </p>
                                    {type.value === "Д" && (
                                        <p
                                            className={`${classes.sizes} ${classes.e} ${classes.d1}`}
                                        >
                                            {d1} <span className={classes.d}>(D1)</span>
                                        </p>
                                    )}
                                    <p className={`${classes.sizes} ${classes.e} ${classes.d2}`}>
                                        {d2}{" "}
                                        <span
                                            className={`${classes.d} ${
                                                st === "1" || st === "2" ? classes.da : ""
                                            }`}
                                        >
                                            (D2)
                                        </span>
                                    </p>
                                    <p className={`${classes.sizes} ${classes.e} ${classes.d3}`}>
                                        {d3} <span className={classes.d}>(D3)</span>
                                    </p>
                                    <p className={`${classes.sizes} ${classes.e} ${classes.d4}`}>
                                        {d4} <span className={classes.d}>(D4)</span>
                                    </p>
                                </>
                            ) : null}
                            {type.value === "В" ? (
                                <>
                                    <p className={`${classes.sizes} ${classes.v} ${classes.h}`}>
                                        {thickness !== "др." ? thickness : athic}
                                    </p>
                                    <p className={`${classes.sizes} ${classes.v} ${classes.d1}`}>
                                        {d1} <span className={classes.d}>(D1)</span>
                                    </p>
                                    <p className={`${classes.sizes} ${classes.v} ${classes.d2}`}>
                                        {d2}{" "}
                                        <span
                                            className={`${classes.d} ${
                                                st === "1" || st === "2" ? classes.da : ""
                                            }`}
                                        >
                                            (D2)
                                        </span>
                                    </p>
                                    <p className={`${classes.sizes} ${classes.v} ${classes.d3}`}>
                                        {d3} <span className={classes.d}>(D3)</span>
                                    </p>
                                </>
                            ) : null}
                            {type.value === "Б" || type.value === "А" ? (
                                <>
                                    <p className={`${classes.sizes} ${classes.a} ${classes.h}`}>
                                        {thickness !== "др." ? thickness : athic}
                                    </p>
                                    <p className={`${classes.sizes} ${classes.a} ${classes.d2}`}>
                                        {d2}{" "}
                                        <span
                                            className={`${classes.d} ${
                                                st === "1" || st === "2" ? classes.da : ""
                                            }`}
                                        >
                                            (D2)
                                        </span>
                                    </p>
                                    <p className={`${classes.sizes} ${classes.a} ${classes.d3}`}>
                                        {d3} <span className={classes.d}>(D3)</span>
                                    </p>
                                </>
                            ) : null}
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.sideContainer}>
                <Graphite
                    className={classes.group}
                    classTitle={classes.titleGroup}
                    onChange={grapHandler}
                    value={grap}
                    grap={curSnp?.graphite || ""}
                />
                {addit?.fillers && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип наполнителя</p>
                        <Select value={filler} onChange={fillerHandler}>
                            {addit?.fillers.split(";").map((fil, idx) => {
                                const parts = fil.split("@")
                                return (
                                    <Option key={parts[0]} value={idx.toString()}>
                                        {parts[1]}
                                    </Option>
                                )
                            })}
                        </Select>
                    </div>
                )}
                {addit?.temperature && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Температура эксплуатации</p>
                        <Select value={temp} onChange={tempHandler}>
                            {addit?.temperature.split(";").map(fil => {
                                const parts = fil.split("@")
                                return (
                                    <Option key={parts[0]} value={parts[0]}>
                                        {parts[1]}
                                    </Option>
                                )
                            })}
                        </Select>
                    </div>
                )}
                {addit?.mod && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Модифицирующий элемент</p>
                        <Select value={mod} onChange={modHandler}>
                            {addit?.mod ? (
                                addit?.mod.split(";").map(m => {
                                    const parts = m.split("@")
                                    return (
                                        <Option key={parts[0]} value={parts[0]}>
                                            {parts[1]}
                                        </Option>
                                    )
                                })
                            ) : (
                                <></>
                            )}
                        </Select>
                    </div>
                )}

                <p className={classes.title}>Конструктивные элементы</p>
                <Jumper
                    className={`${classes.group} ${classes.inline}`}
                    checked={isJumper}
                    checkedHandler={isJumperHandler}
                    value={jumper}
                    valueHandler={jumperHandler}
                    width={jumpWidth}
                    widthHandler={jumpWidthHandler}
                    disabled={st === "1" || st === "3"}
                />
                <div className={classes.group}>
                    <Checkbox
                        id='holes'
                        name='holes'
                        label='Отверстия в наруж. ограничителе'
                        checked={holes}
                        disabled={type.value === "В"}
                        onChange={holesHandler}
                    />
                </div>
                <Mounting
                    className={`${classes.group} ${classes.inline}`}
                    checked={isMoun}
                    checkedHandler={isMounHandler}
                    mounting={curSnp?.mounting || ""}
                    value={moun}
                    valueHandler={mounHandler}
                />

                <p className={classes.title}>Материалы</p>
                {curSnp?.materials.split("&").map((mater, idx) => {
                    const name = mater.split(";")[0]
                    let openHandler = setIsOpenFrame
                    if (name === "Внутреннее кольцо") openHandler = setIsOpenIr
                    if (name === "Наружное кольцо") openHandler = setIsOpenOr

                    return (
                        <Materials
                            key={name}
                            className={`${classes.group} ${classes.inline} ${classes.mater}`}
                            classTitle={classes.titleGroup}
                            value={mat[idx]}
                            onChange={matHandler(idx)}
                            mater={mater}
                            onOpen={openHandler}
                        />
                    )
                })}
                {/* <input type='file' placeholder='Прикрепите файл' /> */}
                <FileInput name='drawing' id='file' label='Прикрепить чертеж' />

                <div className={classes.message}>
                    {(isJumper && jumper !== "A" && jumper !== "M" && jumper !== "J") || holes ? (
                        <p className={classes.warn}>К заявке приложите файл с чертежом.</p>
                    ) : null}
                </div>
            </div>
            <ResultBlock
                className={classes.resultContainer}
                description={createDescr()}
                designation={createDesig()}
            />
        </>
    )
}
