import React, { ChangeEvent, useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ResultBlock } from "../../components/ResultBlock/ResultBlock"
import { Tabs } from "../../components/Tabs/Tabs"
import { Checkbox } from "../../components/UI/Checkbox/Checkbox"
import { Select } from "../../components/UI/Select/Select"
import { Mounting } from "../../components/Mounting/Mounting"
import { Dispatch, RootState } from "../../store/store"
import SNPService from "../../service/snp"
import { ISNP, ISNPReq } from "../../types/snp"
import classes from "../Putg/putg.module.scss"
import { Materials } from "../../components/Materials/Materials"
import { Graphite } from "../../components/Graphite/Graphite"
import { Jumper } from "../../components/Jumper/Jumper"

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

    const [st, setSet] = useState(stfl[0]?.id || "")
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
    const [holes, setHoles] = useState(false)

    const [filler, setFiller] = useState("0")
    const [tm, setTm] = useState("")
    const [temp, setTemp] = useState("0")
    const [mod, setMod] = useState("0")

    const [pass, setPass] = useState("10")
    const [D2, setD2] = useState("10")
    const [pressure, setPressure] = useState("10")
    const [thickness, setThickness] = useState("2,0")

    const fetchSnp = useCallback(async (req: ISNPReq) => {
        console.log("fetchSnp")

        const res = await SNPService.get(req)
        setSnp(res.data)

        const tmp = res.data.filter(s => s.typeFlId.includes(flange))
        let index = tmp.findIndex(s => s.typePr.includes(type.value))
        if (index === -1) index = 0

        setTm(tmp[index].fillers.split(";")[0])
        setCurSnp(tmp[index])
    }, [])

    useEffect(() => {
        if (stfl.length === 0) dispatch.addit.getStFl()
        if (typeFl.length === 0) dispatch.addit.getTypeFl()
        if (!addit) dispatch.addit.getAddit()
        fetchSnp({ flangeId: "1", standId: "1" })
    }, [stfl.length, typeFl.length, addit, dispatch.addit, fetchSnp])

    useEffect(() => {
        if (stfl.length > 0) setSet(stfl[0].id)
    }, [stfl])

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
        }
    }

    const mounHandler = (value: string) => {
        setMoun(value)
    }
    const jumperHandler = (value: string) => {
        setJumper(value)
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

    return (
        <>
            <div className={classes.container}>
                <div className={`${classes.block} ${classes.full}`}>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>
                            Стандарт на прокладку / стандарт на фланец
                        </p>
                        {stfl.length > 0 && (
                            <Select value={st} onChange={() => {}}>
                                {stfl.map(d => (
                                    <Option key={d.id} value={d.id}>
                                        {d.stand} / {d.flange}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип фланца</p>
                        {typeFl.length > 0 && (
                            <Select value={flange} onChange={flangeHandler}>
                                {typeFl
                                    .filter(fl => snp.some(s => s.typeFlId === fl.id))
                                    .map(fl => (
                                        <Option key={fl.id} value={fl.id}>
                                            {fl.short} {fl.title} {fl.descr}
                                        </Option>
                                    ))}
                            </Select>
                        )}
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип СНП</p>
                        {types && type ? (
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
                        ) : null}
                    </div>
                </div>
                <div className={`${classes.block} ${classes.snpDraw}`}>
                    <p className={classes.titleGroup}>Чертеж типа фланца</p>
                    <div className={classes.blockImage}>
                        <img
                            className={classes.image}
                            width={600}
                            height={319}
                            src={curSnp?.typeFlUrl}
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <div className={classes.container}>
                <div className={`${classes.block} ${classes.full}`}>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Условный проход, мм</p>
                        <Select value={pass} onChange={() => {}}>
                            <Option value='10'>10</Option>
                            <Option value='15'>15</Option>
                            <Option value='20'>20</Option>
                        </Select>
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>D2 (для всех давлений)</p>
                        <Select value={D2} onChange={() => {}}>
                            <Option value='10'>10</Option>
                            <Option value='15'>15</Option>
                            <Option value='20'>20</Option>
                        </Select>
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Давление Ру, МПа</p>
                        <Select value={pressure} onChange={() => {}}>
                            <Option value='10'>10</Option>
                            <Option value='15'>15</Option>
                            <Option value='20'>20</Option>
                        </Select>
                    </div>

                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Толщина прокладки</p>
                        <Select value={thickness} onChange={() => {}}>
                            <Option value='1,0'>1,0</Option>
                            <Option value='2,0'>2,0</Option>
                            <Option value='3,0'>3,0</Option>
                        </Select>
                    </div>
                </div>
                <div className={`${classes.block} ${classes.snpDrawFl}`}>
                    <p className={classes.titleGroup}>Чертеж типа фланца</p>
                    <div className={`${classes.blockImage} ${classes.typeDraw}`}>
                        <img
                            className={classes.image}
                            width={800}
                            height={348}
                            src={curSnp?.typeUrl}
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <div className={classes.sideContainer}>
                <Graphite
                    className={classes.group}
                    classTitle={classes.titleGroup}
                    onChange={() => {}}
                    value='2'
                    grap={curSnp?.graphite || ""}
                />
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Тип наполнителя</p>
                    {addit?.fillers && (
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
                    )}
                </div>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Температура эксплуатации</p>
                    {addit?.temperature && (
                        <Select value='0' onChange={() => {}}>
                            {addit?.temperature.split(";").map(fil => {
                                const parts = fil.split("@")
                                return (
                                    <Option key={parts[0]} value={parts[0]}>
                                        {parts[1]}
                                    </Option>
                                )
                            })}
                        </Select>
                    )}
                </div>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Модифицирующий элемент</p>
                    <Select value='0' onChange={() => {}}>
                        <Option value='0'>0 нет</Option>
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

                <p className={classes.title}>Конструктивные элементы</p>
                <Jumper
                    className={`${classes.group} ${classes.inline}`}
                    checked={isJumper}
                    checkedHandler={isJumperHandler}
                    value={jumper}
                    valueHandler={jumperHandler}
                    width=''
                    widthHandler={() => {}}
                />
                <div className={classes.group}>
                    <Checkbox
                        id='holes'
                        name='holes'
                        label='Отверстия в наруж. ограничителе'
                        checked={holes}
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
                {curSnp?.materials.split("&").map((mater, idx) => (
                    <Materials
                        key={mater.split(";")[0]}
                        className={`${classes.group} ${classes.inline} ${classes.mater}`}
                        classTitle={classes.titleGroup}
                        value={mat[idx]}
                        onChange={matHandler(idx)}
                        mater={mater}
                    />
                ))}

                <div className={classes.message}>
                    {(isJumper && jumper !== "A" && jumper !== "M" && jumper !== "J") || holes ? (
                        <p className={classes.warn}>К заявке приложите файл с чертежом.</p>
                    ) : null}
                </div>
            </div>
            <ResultBlock
                className={classes.resultContainer}
                description='Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque non aperiam ea, earum accusamus harum, repellendus dolorem delectus veniam itaque temporibus doloribus quia soluta fugit sit eligendi mollitia consectetur. Impedit porro cum possimus quidem ut!'
                designation=' Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti vero'
            />
        </>
    )
}
