import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs } from "../../../../../../../../components/Tabs/Tabs"
import { Select } from "../../../../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { ISizeInt } from "../../../../../../../types/survey"
import classes from "../../../../../survey.module.scss"

const { Option } = Select

const initTabs = {
    1: {
        width: 68,
        pos: 0,
    },
    2: {
        width: 70,
        pos: 68,
    },
}

type Props = {}

export const Dn: FC<Props> = () => {
    const [filSizes, setFilSizes] = useState<ISizeInt[]>([])

    const dns = useSelector((state: ProState) => state.survey.dns)
    const sizes = useSelector((state: ProState) => state.survey.sizes)

    const dy = useSelector((state: ProState) => state.survey.dy)
    const py = useSelector((state: ProState) => state.survey.py)
    const size = useSelector((state: ProState) => state.survey.size)
    const flange = useSelector((state: ProState) => state.survey.type.flange)
    const typeFl = useSelector((state: ProState) => state.survey.type.typeFl)
    const row = useSelector((state: ProState) => state.survey.row)

    const { survey } = useDispatch<Dispatch>()

    useEffect(() => {
        if (dy && py) {
            const tmpSizes = sizes.filter(s => s.dy === dy)
            setFilSizes(tmpSizes)

            if (tmpSizes.length) {
                let idx = tmpSizes.findIndex(s => s.py.includes(py))
                if (idx === -1) {
                    survey.setPy(tmpSizes[0].py.split(";")[0])
                    idx = 0
                }
                survey.setSize(tmpSizes[idx])
            }
        }
    }, [sizes, dy, py, survey])

    const changeDnHandler = (value: string) => {
        survey.setDy(value)
    }

    const changePnHandler = (value: string) => {
        survey.setPy(value)
    }

    const changeRowHandler = (type: string) => {
        survey.setRow(+type as 1)
    }

    return (
        <div className={classes.param}>
            <div className={classes.field}>
                <p className={classes.titleGroup}>Dy, мм</p>
                <Select value={size?.dy || ""} onChange={changeDnHandler}>
                    {dns.map(d => (
                        <Option key={d.dn} value={d.dn}>
                            {d.dn}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className={classes.field}>
                {["3", "4", "5"].includes(flange) ? (
                    <p className={classes.titleGroup}>Ру, класс давления</p>
                ) : (
                    <p className={classes.titleGroup}>
                        Py, Мпа (кгc/см<sup>2</sup>)
                    </p>
                )}

                <Select value={py} onChange={changePnHandler}>
                    {filSizes.map(s => {
                        if (s.py.includes(";")) {
                            return s.py.split(";").map(pn => (
                                <Option key={pn} value={pn}>
                                    {pn}
                                </Option>
                            ))
                        }
                        return (
                            <Option key={s.py} value={s.py}>
                                {s.py}
                            </Option>
                        )
                    })}
                </Select>
            </div>
            {flange === "1" || (flange === "3" && typeFl !== "1") ? (
                <div className={classes.field}>
                    <Tabs
                        initWidth={initTabs[row].width}
                        initPos={initTabs[row].pos}
                        onClick={changeRowHandler}
                    >
                        <p
                            className={[classes.variants, row === 1 ? classes.active : ""].join(
                                " "
                            )}
                            data-type='1'
                        >
                            Ряд 1
                        </p>
                        <p
                            className={[classes.variants, row === 2 ? classes.active : ""].join(
                                " "
                            )}
                            data-type='2'
                        >
                            Ряд 2
                        </p>
                    </Tabs>
                </div>
            ) : null}
        </div>
    )
}
