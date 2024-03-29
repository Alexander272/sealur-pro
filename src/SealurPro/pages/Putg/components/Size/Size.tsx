import { ChangeEvent, FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../store/store"
import { Sizes } from "./components/Sizes/Sizes"
import classes from "../../../style/pages.module.scss"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"
import { InputSize } from "./components/InputSize/InputSize"

const { Option } = Select

type Props = {}

export const Size: FC<Props> = () => {
    const dns = useSelector((state: ProState) => state.putg.dns)
    const dn = useSelector((state: ProState) => state.putg.dn)
    const sizes = useSelector((state: ProState) => state.putg.sizes)
    const size = useSelector((state: ProState) => state.putg.size)
    const pn = useSelector((state: ProState) => state.putg.pn)
    const h = useSelector((state: ProState) => state.putg.h)
    const oh = useSelector((state: ProState) => state.putg.oh)

    const flanges = useSelector((state: ProState) => state.addit.fl)

    const imageUrl = useSelector((state: ProState) => state.putg.imageUrl)
    const obturator = useSelector((state: ProState) => state.putg.obturator)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const flange = useSelector((state: ProState) => state.putg.flange)

    const notStand = useSelector((state: ProState) => state.putg.notStand)

    const dispatch = useDispatch<Dispatch>()

    //TODO тут костыль (надо бы придумать как сделать нормально)
    useEffect(() => {
        const fl = flanges.find(f => f.id === flange)

        if (fl && putg?.typePr) {
            let typePr = putg.typePr
            if (["042", "043", "044"].includes(obturator)) typePr = `${putg.typePr}-${obturator}`

            dispatch.putg.getSizes({
                flShort: fl.short,
                typePr: typePr,
                typeFlId: putg?.typeFlId || "1",
                standId: "0",
            })
        }
    }, [obturator, dispatch.putg, flange, flanges, putg?.typePr, putg?.typeFlId])

    const changeDnHandler = (value: string) => {
        const tmpSizes = sizes.filter(s => s.dn === value)
        if (!size) return

        let idx = tmpSizes.findIndex(s => s.pn.includes(pn))
        if (idx === -1) {
            dispatch.putg.setPn(tmpSizes[0].pn.split(";")[0])
            idx = 0
        }
        dispatch.putg.changeSize(tmpSizes[idx])
    }

    const changePnHandler = (value: string) => {
        if (!size?.pn.includes(value)) {
            const tmpSize = sizes.find(s => s.dn.toString() === dn && s.pn.includes(value))
            if (tmpSize) dispatch.putg.changeSize(tmpSize)
        }
        dispatch.putg.setPn(value)
    }

    const changeHHandler = (value: string) => {
        let idx = size?.h.split(";").findIndex(h => h === value)
        dispatch.putg.changeH(idx || 0)
    }

    const changeOhHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch.putg.changeOH(event.target.value.replaceAll(".", ","))
    }

    const changeNotStand = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch.putg.setNotStand(event.target.checked)
    }

    if (!sizes || !dns || !size) return <div className={classes.container}></div>

    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.full}`}>
                {notStand && <InputSize />}
                {!notStand && (
                    <>
                        {dns.length && (
                            <div className={classes.group}>
                                <p className={classes.titleGroup}>Проход, DN</p>
                                <Select value={dn} onChange={changeDnHandler}>
                                    {dns.map(dn => (
                                        <Option key={dn.dn} value={dn.dn}>
                                            {dn.dn}
                                        </Option>
                                    ))}
                                </Select>
                            </div>
                        )}

                        <div className={classes.group}>
                            <p className={classes.titleGroup}>Давление, PN</p>
                            {sizes.length && (
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
                            )}
                        </div>
                    </>
                )}

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
            <div className={`${classes.block} ${classes.putgDrawFl}`}>
                <p className={classes.titleGroup}>Чертеж прокладки</p>
                <div className={classes.blockImage}>
                    <div className={classes.imageContainer}>
                        <img
                            className={classes.image}
                            width={500}
                            height={113}
                            src={imageUrl}
                            alt='gasket drawing'
                        />
                        <Sizes
                            d1={size?.d1 || "0"}
                            d2={size?.d2 || "0"}
                            d3={size?.d3 || "0"}
                            d4={size?.d4 || "0"}
                        />
                    </div>
                </div>
                <div className={classes.inline}>
                    <Checkbox
                        id='not_stand'
                        name='notStand'
                        label='нестандартный фланец'
                        checked={notStand}
                        onChange={changeNotStand}
                    />
                    <p className={classes.max}>(ввести размеры в ручную)</p>
                </div>
            </div>
        </div>
    )
}
