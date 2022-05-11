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

type Props = {}

export const Main: FC<Props> = () => {
    const flanges = useSelector((state: ProState) => state.addit.fl)
    const flange = useSelector((state: ProState) => state.putg.flange)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const form = useSelector((state: ProState) => state.putg.form)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        dispatch.putg.getPutg({ flange: "1", req: { form: "Round", flangeId: "1" } })
    }, [dispatch.putg])

    useEffect(() => {
        dispatch.putg.getPutgImage(putg?.form || "Round")
    }, [putg?.form, dispatch.putg])

    const flHandler = (value: string) => {
        dispatch.putg.setFlange(value)
        dispatch.putg.getPutg({ flange: value, req: { form: form, flangeId: value } })
    }

    const formHandler = (type: string) => {
        let flange = flanges[0].id
        if (type !== "Round") flange = "0"

        dispatch.putg.getPutg({
            flange: flange,
            req: { form: type as "Round", flangeId: flange || "1" },
        })
        dispatch.putg.setFlange(flange)
    }

    return (
        <>
            <div className={classes.line}>
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
