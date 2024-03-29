import { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs } from "../../../../../../components/Tabs/Tabs"
import { Select } from "../../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../../store/store"
import { Type } from "./components/Type"
import classes from "../../../pages.module.scss"

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

const initTabs = {
    Round: {
        width: 85,
        position: 0,
    },
    Oval: {
        width: 100,
        position: 85,
    },
    Rectangular: {
        width: 141,
        position: 185,
    },
}

type Props = {}

export const Main: FC<Props> = () => {
    const flanges = useSelector((state: ProState) => state.addit.fl)
    const flange = useSelector((state: ProState) => state.putgm.flange)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const form = useSelector((state: ProState) => state.putgm.form)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        dispatch.putgm.getPutgm({ flange: "1", req: { form: "Round", flangeId: "1" } })
    }, [dispatch.putgm])

    useEffect(() => {
        dispatch.putgm.getPutgmImage(putgm?.form || "Round")
    }, [putgm?.form, dispatch.putgm])

    const flHandler = (value: string) => {
        dispatch.putgm.setFlange(value)
        dispatch.putgm.getPutgm({ flange: value, req: { form: form, flangeId: value } })
    }

    const formHandler = (type: string) => {
        let flange = flanges[0].id
        if (type !== "Round") flange = "0"

        dispatch.putgm.getPutgm({
            flange: flange,
            req: { form: type as "Round", flangeId: flange || "1" },
        })
        dispatch.putgm.setFlange(flange)
    }

    return (
        <>
            <div className={classes.line}>
                <Tabs
                    initWidth={initTabs[form].width}
                    initPos={initTabs[form].position}
                    onClick={formHandler}
                >
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
            {form === "Round" ? (
                <div className={classes.line}>
                    {flanges && (
                        <Select value={flange} onChange={flHandler}>
                            {flanges.map(f => (
                                <Option key={f.id} value={f.id}>
                                    {f.title}
                                </Option>
                            ))}
                        </Select>
                    )}
                    {/* <Button>Добавить</Button> */}
                </div>
            ) : null}
            <div className={classes.group}>
                <p>Тип фланца</p>
                <div className={classes.line}>
                    <Type />
                </div>
            </div>
        </>
    )
}
