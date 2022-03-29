import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs } from "../../../../../components/Tabs/Tabs"
import { Select } from "../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../store/store"
import classes from "../../../style/pages.module.scss"

const { Option } = Select

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

const imgUrls = {
    1: "/image/snp/A.webp",
    2: "/image/snp/B.webp",
    3: "/image/snp/V.webp",
}

type Props = {}

export const MainSnp: FC<Props> = () => {
    const loading = useSelector((state: ProState) => state.snp.loading)
    const stfl = useSelector((state: ProState) => state.addit.stfl)
    const typesFl = useSelector((state: ProState) => state.addit.typeFl)

    const snps = useSelector((state: ProState) => state.snp.snps)
    const typePr = useSelector((state: ProState) => state.snp.snp?.typePr) || ""
    const typeFl = useSelector((state: ProState) => state.snp.snp?.typeFlId) || ""
    const st = useSelector((state: ProState) => state.snp.st)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        const sf = stfl.find(s => s.id === st)
        if (sf) {
            dispatch.snp.getSizes({
                flShort: sf.short,
                standId: sf.standId,
                typePr: typePr,
                typeFlId: typeFl,
            })
        }
    }, [dispatch, st, stfl, typePr, typeFl])

    const renderTypes = () => {
        const usedTypes = types.filter(t => snps.some(s => s.typePr === t.value))
        const idx = types.findIndex(t => t.value === typePr)

        return (
            <Tabs
                initWidth={usedTypes[idx].width}
                initPos={usedTypes.reduce((ac, cur, index) => {
                    if (index >= idx) return ac
                    return ac + cur.width
                }, 0)}
                onClick={changeTypePrHandler}
            >
                {usedTypes.map((t, idx) => (
                    <p
                        key={t.value}
                        className={[
                            classes.variants,
                            typePr === t.value ? classes.active : "",
                        ].join(" ")}
                        data-type={t.value}
                        data-index={idx}
                    >
                        {t.value}
                    </p>
                ))}
            </Tabs>
        )
    }

    const changeStHandler = (value: string) => {
        const sf = stfl.find(s => s.id === st)
        if (sf) {
            dispatch.snp.getSnp({ st: value, req: { standId: sf.standId, flangeId: sf.flangeId } })
        }
    }

    const changeTypeFlHandler = (value: string) => {
        const tmp = snps.filter(s => s.typeFlId.includes(value))
        dispatch.snp.changeSnp(tmp[0])
    }

    const changeTypePrHandler = (value: string) => {
        const tmp = snps.filter(s => s.typePr.includes(value))
        dispatch.snp.changeSnp(tmp[0])
    }

    if (loading) return null

    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.full}`}>
                {stfl.length > 0 && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>
                            Стандарт на прокладку / стандарт на фланец
                        </p>
                        <Select value={st} onChange={changeStHandler}>
                            {stfl.map(d => (
                                <Option key={d.id} value={d.id}>
                                    {d.stand} / {d.flange}
                                </Option>
                            ))}
                        </Select>
                    </div>
                )}
                {typesFl.length > 0 && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип фланца</p>
                        <Select value={typeFl} onChange={changeTypeFlHandler}>
                            {typesFl
                                .filter(tfl => snps.some(s => s.typeFlId === tfl.id))
                                .map(tfl => (
                                    <Option key={tfl.id} value={tfl.id}>
                                        {tfl.short} {tfl.title} {tfl.descr}
                                    </Option>
                                ))}
                        </Select>
                    </div>
                )}
                {typePr && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип СНП</p>
                        {renderTypes()}
                    </div>
                )}
            </div>
            <div className={`${classes.block} ${classes.snpDraw}`}>
                <p className={classes.titleGroup}>Чертеж типа фланца</p>
                <div className={classes.blockImage}>
                    <img
                        className={classes.image}
                        width={600}
                        height={319}
                        src={imgUrls[typeFl as "1"]}
                        alt='flange type drawing'
                    />
                </div>
            </div>
        </div>
    )
}
