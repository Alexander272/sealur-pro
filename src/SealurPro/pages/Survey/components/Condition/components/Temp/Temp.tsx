import { ChangeEvent, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../../../../../../../components/UI/Input/Input"
import { Select } from "../../../../../../../components/UI/Select/Select"
import { Dispatch, ProState } from "../../../../../../store/store"
import { TempFields } from "../../../../../../types/survey"
import classes from "../../../../survey.module.scss"

const { Option } = Select

type Props = {}

export const Temp: FC<Props> = () => {
    const temp = useSelector((state: ProState) => state.survey.temperature)

    const { survey } = useDispatch<Dispatch>()

    const changeTempDataHandler = (field: TempFields) => (event: ChangeEvent<HTMLInputElement>) => {
        survey.setTempData({ field, value: event.target.value })
    }

    const changePressureHandler = (value: string) => {
        survey.setTempData({ field: "pressure", value })
    }

    return (
        <div className={classes.fb60}>
            <div className={`${classes.inline} ${classes.tem}`}>
                <p className={classes.nodeTitle}>Рабочая температура, &#8451;</p>
                <Input
                    label='от'
                    id='difffrom'
                    name='difffrom'
                    type='number'
                    orentation='horizontal'
                    placeholder='0'
                    value={temp.diffFrom}
                    onChange={changeTempDataHandler("diffFrom")}
                />
                <Input
                    label='до'
                    id='diffto'
                    name='diffto'
                    type='number'
                    orentation='horizontal'
                    placeholder='0'
                    value={temp.diffTo}
                    onChange={changeTempDataHandler("diffTo")}
                />
            </div>
            <div className={`${classes.inline} ${classes.tem}`}>
                <p className={classes.nodeTitle}>Давление рабочее/испытаний</p>
                <Input
                    id='preswork'
                    name='preswork'
                    type='number'
                    min={0}
                    step={0.1}
                    placeholder='0.0'
                    value={temp.presWork}
                    onChange={changeTempDataHandler("presWork")}
                />
                <p>/</p>
                <Input
                    id='prestest'
                    name='prestest'
                    type='number'
                    placeholder='0.0'
                    min={0}
                    step={0.1}
                    value={temp.presTest}
                    onChange={changeTempDataHandler("presTest")}
                />
                <Select value={temp.pressure} onChange={changePressureHandler}>
                    <Option value='mpa'>Мпа</Option>
                    <Option value='kgs'>
                        кгс/см<sup>2</sup>
                    </Option>
                    <Option value='class'>класс давления</Option>
                </Select>
            </div>
            <div className={`${classes.inline} `}>
                <p className={classes.nodeTitle}>Среда, состав/концентрация</p>
                <Input
                    name='environ'
                    id='environ'
                    value={temp.environ}
                    onChange={changeTempDataHandler("environ")}
                />
            </div>
        </div>
    )
}
