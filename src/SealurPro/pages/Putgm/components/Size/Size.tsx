import { ChangeEvent, FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"
import { Dispatch, ProState } from "../../../../store/store"
import { Sizes } from "./components/Sizes/Sizes"
import { InputSize } from "./components/InputSize/InputSize"
import classes from "../../../style/pages.module.scss"

const { Option } = Select

type Props = {}

export const Size: FC<Props> = () => {
    const dns = useSelector((state: ProState) => state.putgm.dns)
    const dn = useSelector((state: ProState) => state.putgm.dn)
    const sizes = useSelector((state: ProState) => state.putgm.sizes)
    const size = useSelector((state: ProState) => state.putgm.size)
    const pn = useSelector((state: ProState) => state.putgm.pn)
    const h = useSelector((state: ProState) => state.putgm.h)
    const oh = useSelector((state: ProState) => state.putgm.oh)

    const flanges = useSelector((state: ProState) => state.addit.fl)

    const imageUrl = useSelector((state: ProState) => state.putgm.imageUrl)
    const construction = useSelector((state: ProState) => state.putgm.construction)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const flange = useSelector((state: ProState) => state.putgm.flange)

    const notStand = useSelector((state: ProState) => state.putgm.notStand)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        const fl = flanges.find(f => f.id === flange)

        if (fl && putgm?.typePr && construction) {
            let typePr = `${putgm.typePr}-${construction}`

            dispatch.putgm.getSizes({
                flShort: fl.short,
                typePr: typePr,
                typeFlId: putgm?.typeFlId || "1",
                standId: "0",
            })
        }
    }, [construction, dispatch.putgm, flange, flanges, putgm?.typePr, putgm?.typeFlId])

    const changeDnHandler = (value: string) => {
        const tmpSizes = sizes.filter(s => s.dn === value)
        if (!size) return

        let idx = tmpSizes.findIndex(s => s.pn.includes(pn))
        if (idx === -1) {
            dispatch.putgm.setPn(tmpSizes[0].pn.split(";")[0])
            idx = 0
        }
        dispatch.putgm.changeSize(tmpSizes[idx])
    }

    const changePnHandler = (value: string) => {
        if (!size?.pn.includes(value)) {
            const tmpSize = sizes.find(s => s.dn.toString() === dn && s.pn.includes(value))
            if (tmpSize) dispatch.putgm.changeSize(tmpSize)
        }
        dispatch.putgm.setPn(value)
    }

    const changeHHandler = (value: string) => {
        let idx = size?.h.split(";").findIndex(h => h === value)
        dispatch.putgm.changeH(idx || 0)
    }

    const changeOhHandler = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch.putgm.changeOH(event.target.value.replaceAll(".", ","))
    }

    const changeNotStand = (event: ChangeEvent<HTMLInputElement>) => {
        dispatch.putgm.setNotStand(event.target.checked)
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
