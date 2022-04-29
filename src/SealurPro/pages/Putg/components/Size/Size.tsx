import { FC } from "react"
import { useSelector } from "react-redux"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { ProState } from "../../../../store/store"
import classes from "../../../style/pages.module.scss"

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

    const imageUrl = useSelector((state: ProState) => state.putg.imageUrl)

    if (!sizes.length) return <div className={classes.container}></div>

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
                            src={imageUrl}
                            alt='gasket drawing'
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
