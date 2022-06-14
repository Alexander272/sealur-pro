import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs } from "../../../../../../../components/Tabs/Tabs"
import { Select } from "../../../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../../../store/store"
import { TypeFields } from "../../../../../../types/survey"
import classes from "../../../../survey.module.scss"

const { Option } = Select

const initTabs = {
    stand: {
        width: 124,
        pos: 142,
    },
    not_stand: {
        width: 142,
        pos: 0,
    },
}

type Props = {}

export const Type: FC<Props> = () => {
    const fl = useSelector((state: ProState) => state.addit.fl)
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)
    const type = useSelector((state: ProState) => state.survey.type)
    const bolts = useSelector((state: ProState) => state.survey.bolts)

    const { survey } = useDispatch<Dispatch>()

    const [onlyNotStand, setOnlyNotStand] = useState(false)

    const changeTypeDataHandler = (field: TypeFields) => (value: string) => {
        survey.setTypeData({ field, value })
    }
    const changeTypeHandler = (type: string) => {
        survey.setTypeData({ field: "type", value: type })
        if (!bolts.length) survey.getBoltMaterials()
    }

    //TODO по хорошему это надо делать без хардкода
    useEffect(() => {
        if (!["1", "2", "3"].includes(type.typeFl)) {
            setOnlyNotStand(true)
            survey.setTypeData({ field: "type", value: "not_stand" })
            if (!bolts.length) survey.getBoltMaterials()
        } else {
            setOnlyNotStand(false)
        }
    }, [type.typeFl, survey, bolts.length])

    return (
        <>
            <p className={classes.title}>Конструкция узла</p>
            <div className={`${classes.inline} ${classes.node}`}>
                <p className={classes.nodeTitle}>Тип фланцевого соединения</p>
                <Select value={type.typeFl} onChange={changeTypeDataHandler("typeFl")}>
                    {typeFl.map(f => (
                        <Option key={f.id} value={f.id}>
                            {f.title}
                        </Option>
                    ))}
                    <Option value='another'>Другой</Option>
                </Select>
                <p className={classes.flange}>{typeFl.find(f => f.id === type.typeFl)?.descr}</p>
            </div>
            <div className={`${classes.inline} ${classes.stand}`}>
                <Tabs
                    initWidth={initTabs[type.type as "stand"].width}
                    initPos={initTabs[type.type as "stand"].pos}
                    onClick={changeTypeHandler}
                    disabled={onlyNotStand}
                >
                    <p
                        className={[
                            classes.variants,
                            type.type === "not_stand" ? classes.active : "",
                        ].join(" ")}
                        data-type='not_stand'
                    >
                        Нестандартный
                        <br />
                        фланец
                    </p>
                    <p
                        className={[
                            classes.variants,
                            type.type === "stand" ? classes.active : "",
                        ].join(" ")}
                        data-type='stand'
                    >
                        Стандартный
                        <br />
                        фланец
                    </p>
                </Tabs>
                <Select
                    value={type.flange}
                    onChange={changeTypeDataHandler("flange")}
                    disabled={type.type === "not_stand"}
                >
                    {fl.map(f => (
                        <Option key={f.id} value={f.id}>
                            {f.title}
                        </Option>
                    ))}
                </Select>
            </div>
        </>
    )
}
