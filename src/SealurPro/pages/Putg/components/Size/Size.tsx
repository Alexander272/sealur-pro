import { FC } from "react"
import { useSelector } from "react-redux"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { ProState } from "../../../../store/store"
import classes from "../../../style/pages.module.scss"

const { Option } = Select

//TODO Надо придумать что сделать с картинками (текущий вариант не очень подходит т.к. их слишком много и они зависят и от конструкции и от обтюратора)
// возможно стоит их хранить в бд вместе с обтюраторами в putg.construction

// Размеры зависят от обтюратора (не от конструкции)
const imgUrls = {
    "100": {
        "01": "/image/putg/constraction/100-01.webp",
    },
}

type Props = {}

export const Size: FC<Props> = () => {
    const construction = useSelector((state: ProState) => state.putg.constration)
    const obturation = useSelector((state: ProState) => state.putg.obturation)

    const dns = useSelector((state: ProState) => state.putg.dns)
    const dn = useSelector((state: ProState) => state.putg.dn)
    const sizes = useSelector((state: ProState) => state.putg.sizes)
    const size = useSelector((state: ProState) => state.putg.size)
    const pn = useSelector((state: ProState) => state.putg.pn)
    const h = useSelector((state: ProState) => state.putg.h)
    const oh = useSelector((state: ProState) => state.putg.oh)
    const s2 = useSelector((state: ProState) => state.putg.s2)
    const s3 = useSelector((state: ProState) => state.putg.s3)

    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.full}`}>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Проход, DN</p>
                    <Select value={dn} onChange={() => {}}>
                        {dns.map(dn => (
                            <Option key={dn.dn} value={dn.dn}>
                                {dn.dn}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className={classes.group}>
                    <p className={classes.titleGroup}>Давление, PN</p>
                    <Select value={pn} onChange={() => {}}>
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
                    <Select value={h} onChange={() => {}}>
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
                            onChange={() => {}}
                        />
                    )}
                </div>
            </div>
            <div className={`${classes.block} ${classes.putgDrawFl}`}>
                <p className={classes.titleGroup}>Чертеж прокладки</p>
                <div className={classes.blockImage}>
                    <div className={classes.imageContainer}>
                        <img
                            className={classes.image}
                            width={800}
                            height={180}
                            src={imgUrls[construction as "100"][obturation as "01"]}
                            alt='gasket drawing'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
