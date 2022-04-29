import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs } from "../../../../../components/Tabs/Tabs"
import { Select } from "../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../store/store"
import { Gasket } from "./Gasket/Gasket"
import classes from "../../../style/pages.module.scss"

const { Option } = Select

const types = [
    {
        type: "Round",
        title: "Круглая",
    },
    {
        type: "Oval",
        title: "Овальная",
    },
    {
        type: "Rectangular",
        title: "Прямоугольная",
    },
]

const imgUrls = {
    1: "/image/putg/PUTG-A.webp",
    2: "/image/putg/PUTG-B.webp",
    3: "/image/putg/PUTG-C.webp",
}

type Props = {}

export const Main: FC<Props> = () => {
    const flanges = useSelector((state: ProState) => state.addit.fl)
    const flangesType = useSelector((state: ProState) => state.addit.typeFl)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const flange = useSelector((state: ProState) => state.putg.flange)

    const dispatch = useDispatch<Dispatch>()

    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.full}`}>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Конфигурация прокладки</p>
                    <Tabs initWidth={85} onClick={() => {}}>
                        {types.map(t => (
                            <p
                                key={t.type}
                                className={[
                                    classes.variants,
                                    putg?.form === t.type ? classes.active : null,
                                ].join(" ")}
                                data-type={t.type}
                            >
                                {t.title}
                            </p>
                        ))}
                    </Tabs>
                </div>

                <div className={classes.group}>
                    <p className={classes.titleGroup}>Стандарт на фланец</p>
                    <Select value={flange || "1"} onChange={() => {}}>
                        {flanges.map(f => (
                            <Option key={f.id} value={f.id}>
                                {f.title}
                            </Option>
                        ))}
                    </Select>
                </div>

                <div className={classes.group}>
                    <p className={classes.titleGroup}>Тип фланца</p>
                    {/* // TODO надо бы фильровать типы как в снп */}
                    {flangesType.length > 0 && (
                        <Select value={putg?.typeFlId || "1"} onChange={() => {}}>
                            {flangesType.map(t => (
                                <Option key={t.id} value={t.id}>
                                    {t.short} {t.title}
                                </Option>
                            ))}
                        </Select>
                    )}
                </div>

                <Gasket />
            </div>
            <div className={`${classes.block} ${classes.putgDrawing}`}>
                <p className={classes.titleGroup}>Чертеж типа фланца</p>
                <div className={classes.blockImage}>
                    <img
                        className={classes.image}
                        width={500}
                        height={266}
                        src={imgUrls[(putg?.typeFlId as "1") || "1"]}
                        alt='flange type drawing'
                    />
                </div>
            </div>
        </div>
    )
}
