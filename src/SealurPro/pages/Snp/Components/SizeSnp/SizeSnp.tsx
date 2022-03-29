import { ChangeEvent, FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../../../store/store"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Excretion } from "./components/Excretion/Excretion"
import { Sizes } from "./components/Sizes/Sizes"
import classes from "../../../style/pages.module.scss"

const imgUrls = {
    Д: "/image/snp/SNP-P-E.webp",
    Г: "/image/snp/SNP-P-D.webp",
    В: "/image/snp/SNP-P-C.webp",
    Б: "/image/snp/SNP-P-AB.webp",
    А: "/image/snp/SNP-P-AB.webp",
}

const { Option } = Select

type Props = {}

export const SizeSnp: FC<Props> = () => {
    const loading = useSelector((state: ProState) => state.snp.loading)

    const dns = useSelector((state: ProState) => state.snp.dns)
    const dn = useSelector((state: ProState) => state.snp.dn)
    const sizes = useSelector((state: ProState) => state.snp.sizes)
    const size = useSelector((state: ProState) => state.snp.size)
    const pn = useSelector((state: ProState) => state.snp.pn)
    const h = useSelector((state: ProState) => state.snp.h)
    const oh = useSelector((state: ProState) => state.snp.oh)
    const s2 = useSelector((state: ProState) => state.snp.s2)
    const s3 = useSelector((state: ProState) => state.snp.s3)

    const st = useSelector((state: ProState) => state.snp.st)
    const typePr = useSelector((state: ProState) => state.snp.snp?.typePr)

    const isOpenFr = useSelector((state: ProState) => state.snp.isOpenFr)
    const isOpenIr = useSelector((state: ProState) => state.snp.isOpenIr)
    const isOpenOr = useSelector((state: ProState) => state.snp.isOpenOr)

    const { snp } = useDispatch<Dispatch>()

    const [d2, setD2] = useState<number[]>([])

    // заполнение D2 для стандартов где он используется
    useEffect(() => {
        if (st === "1" || st === "2") {
            const d2 = new Set<number>()
            for (let i = 0; i < sizes.length; i++) {
                d2.add(sizes[i].d2)
            }
            setD2(Array.from(d2))
        }
    }, [st, sizes])

    if (loading) return null

    const changeDnHandler = (value: string) => {
        const tmpSizes = sizes.filter(s => s.dn === value)
        if (!size) return

        let idx = tmpSizes.findIndex(s => s.pn.includes(pn))
        if (idx === -1) {
            snp.changePn(tmpSizes[0].pn.split(";")[0])
            idx = 0
        }
        snp.changeSize(tmpSizes[idx])
    }

    const changeD2Handler = (value: string) => {
        const tmpSizes = sizes.filter(s => s.d2.toString() === value)
        if (!size) return

        let idx = tmpSizes.findIndex(s => s.pn.includes(pn))
        if (idx === -1) {
            snp.changePn(tmpSizes[0].pn.split(";")[0])
            idx = 0
        }
        snp.changeSize(tmpSizes[idx])
    }

    const changePnHandler = (value: string) => {
        snp.changePn(value)
    }

    const changeHHandler = (value: string) => {
        let idx = size?.h.split(";").findIndex(h => h === value)
        snp.changeH(idx || 0)
    }

    const changeOhHandler = (event: ChangeEvent<HTMLInputElement>) => {
        snp.changeOH(event.target.value.replaceAll(".", ","))
    }

    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.full}`}>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Условный проход, мм</p>
                    <Select value={dn} onChange={changeDnHandler}>
                        {dns.map(dn => (
                            <Option key={dn.dn} value={dn.dn}>
                                {dn.dn}
                            </Option>
                        ))}
                    </Select>
                </div>
                {d2 && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>D2</p>
                        <Select value={size?.d2.toString() || ""} onChange={changeD2Handler}>
                            {d2.map(d => (
                                <Option key={d} value={d.toString()}>
                                    {d}
                                </Option>
                            ))}
                        </Select>
                    </div>
                )}
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Давление Ру, МПа</p>
                    <Select value={pn} onChange={changePnHandler}>
                        {sizes
                            .filter(s => s.dn === dn)
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
                </div>

                <div className={classes.group}>
                    <p className={classes.titleGroup}>Толщина прокладки</p>
                    <div className={classes.thic}>
                        <Select value={h} onChange={changeHHandler}>
                            {size?.h.split(";").map(h => (
                                <Option key={h} value={h}>
                                    {h}
                                </Option>
                            ))}
                            <Option value='др.'>др.</Option>
                        </Select>
                        {h === "др." && (
                            <Input
                                placeholder='толщина'
                                min={0.1}
                                step={0.1}
                                value={oh.replaceAll(",", ".")}
                                type='number'
                                name='thickness'
                                onChange={changeOhHandler}
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
                            src={imgUrls[(typePr as "Д") || "Д"]}
                            alt='gasket drawing'
                        />
                        {/* Элементы отвечающие за подкраску участков прокладки */}
                        <Excretion
                            typePr={typePr || ""}
                            isOpenFr={isOpenFr}
                            isOpenIr={isOpenIr}
                            isOpenOr={isOpenOr}
                        />

                        {/* Вывод размеров */}
                        <Sizes
                            typePr={typePr || ""}
                            h={h}
                            oh={oh}
                            s2={s2}
                            s3={s3}
                            st={st}
                            d1={size?.d1 || 0}
                            d2={size?.d2 || 0}
                            d3={size?.d3 || 0}
                            d4={size?.d4 || 0}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
