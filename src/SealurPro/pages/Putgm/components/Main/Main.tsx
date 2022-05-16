import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs } from "../../../../../components/Tabs/Tabs"
import { Select } from "../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../store/store"
import { Gasket } from "./components/Gasket/Gasket"
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
    1: "/image/putgm/PUTGm-A.webp",
    2: "/image/putgm/PUTGm-B.webp",
    3: "/image/putgm/PUTGm-V.webp",
}

type Props = {}

export const Main: FC<Props> = () => {
    const flanges = useSelector((state: ProState) => state.addit.fl)
    const flangesType = useSelector((state: ProState) => state.addit.typeFl)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const flange = useSelector((state: ProState) => state.putgm.flange)
    const form = useSelector((state: ProState) => state.putgm.form)
    const putgms = useSelector((state: ProState) => state.putgm.putgms)

    const dispatch = useDispatch<Dispatch>()

    const flangeHandler = (value: string) => {
        // dispatch.putg.getPutg({ flange: value, req: { form, flangeId: value } })
    }

    const formHandler = (value: string) => {
        // if (value === "Round")
        //     dispatch.putg.getPutg({
        //         flange: flanges[0].id,
        //         req: { form: value, flangeId: flanges[0].id },
        //     })
        // else dispatch.putg.getPutg({ flange: "0", req: { form: value as "Round", flangeId: "0" } })
    }

    const changeTypeFlHandler = (value: string) => {
        // const tmp = putgs.filter(p => p.typeFlId.includes(value))
        // dispatch.putg.changePutg(tmp[0])
    }

    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.full}`}>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Конфигурация прокладки</p>
                    <Tabs initWidth={85} onClick={formHandler}>
                        {types.map(t => (
                            <p
                                key={t.type}
                                className={[
                                    classes.variants,
                                    form === t.type ? classes.active : null,
                                ].join(" ")}
                                data-type={t.type}
                            >
                                {t.title}
                            </p>
                        ))}
                    </Tabs>
                </div>

                {form === "Round" && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Стандарт на фланец</p>
                        <Select value={flange || "1"} onChange={flangeHandler}>
                            {flanges.map(f => (
                                <Option key={f.id} value={f.id}>
                                    {f.title}
                                </Option>
                            ))}
                        </Select>
                    </div>
                )}

                <div className={classes.group}>
                    <p className={classes.titleGroup}>Тип фланца</p>
                    {flangesType.length > 0 && (
                        <Select value={putgm?.typeFlId || "1"} onChange={changeTypeFlHandler}>
                            {flangesType
                                // .filter(tfl => putgms.some(p => p.typeFlId === tfl.id))
                                .map(t => (
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
                        width={450}
                        height={239}
                        src={imgUrls[(putgm?.typeFlId as "1") || "1"]}
                        alt='flange type drawing'
                    />
                </div>
            </div>
        </div>
    )
}
