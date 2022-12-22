import { ChangeEvent, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs } from "../../../../../../../components/Tabs/Tabs"
import { Input } from "../../../../../../../components/UI/Input/Input"
import { Select } from "../../../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../../../store/store"
import { IPadSize, ISizeInt, MaterFields } from "../../../../../../types/survey"
import classes from "../../../../survey.module.scss"

const { Option } = Select

type Props = {}

export const Mater: FC<Props> = () => {
    const materials = useSelector((state: ProState) => state.survey.materials)
    const boltmaterials = useSelector((state: ProState) => state.survey.boltMaterials)
    const bolts = useSelector((state: ProState) => state.survey.bolts)

    const type = useSelector((state: ProState) => state.survey.type.type)
    const size = useSelector((state: ProState) => state.survey.size)
    const anSize = useSelector((state: ProState) => state.survey.anotherSize)
    const mater = useSelector((state: ProState) => state.survey.mater)
    const bolt = useSelector((state: ProState) => state.survey.bolt)

    const { survey } = useDispatch<Dispatch>()

    const changeMaterDataHandler = (field: MaterFields) => (value: string) => {
        survey.setMaterData({ field, value })
    }

    const changeLubricantHandler = (type: string) => {
        if (type === "yes") survey.setLubricant(true)
        else survey.setLubricant(false)
    }

    const changeCountBoltHandler = (event: ChangeEvent<HTMLInputElement>) => {
        let newSize: ISizeInt & IPadSize = {} as ISizeInt & IPadSize
        Object.assign(newSize, size)
        newSize.countBolt = +event.target.value
        survey.setAnotherSize(newSize)
    }

    const changeBoltHandler = (value: string) => {
        survey.setBolt(value)
    }

    return (
        <div className={classes.fb50}>
            <div className={classes.inline}>
                <p>Материал фланца</p>
                <Select value={mater.material} onChange={changeMaterDataHandler("material")}>
                    {materials.map(m => (
                        <Option key={m.id} value={m.id}>
                            {m.title}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className={classes.inline}>
                <p>Материал болтов/шпилек</p>
                <Select
                    value={mater.boltMaterial}
                    onChange={changeMaterDataHandler("boltMaterial")}
                >
                    {boltmaterials.map(m => (
                        <Option key={m.id} value={m.id}>
                            {m.title}
                        </Option>
                    ))}
                </Select>
            </div>
            <div className={classes.inline}>
                <p>&Oslash; болтов/шпилек</p>
                {type === "stand" ? (
                    <p className={classes.bolt}>{size?.bolt}</p>
                ) : (
                    <Select value={bolt} onChange={changeBoltHandler}>
                        {bolts.map(b => (
                            <Option key={b.id} value={b.id}>
                                {b.title}
                            </Option>
                        ))}
                    </Select>
                )}
            </div>
            <div className={classes.inline}>
                <p>Количество болтов/шпилек, шт.</p>
                <Input
                    name='diffto'
                    type='number'
                    orentation='horizontal'
                    value={
                        type === "stand"
                            ? size?.countBolt.toString() || "0"
                            : anSize.countBolt.toString()
                    }
                    onChange={changeCountBoltHandler}
                    disabled={type === "stand"}
                />
            </div>
            <div className={classes.inline}>
                <p>Наличие смазки на крепеже</p>
                <Tabs initWidth={53} onClick={changeLubricantHandler}>
                    <p
                        className={[classes.variants, !mater.lubricant && classes.active].join(" ")}
                        data-type='no'
                    >
                        Нет
                    </p>
                    <p
                        className={[classes.variants, mater.lubricant && classes.active].join(" ")}
                        data-type='yes'
                    >
                        Да
                    </p>
                </Tabs>
            </div>
        </div>
    )
}
