import { FC } from "react"
import { Input } from "../../../../../../../components/UI/Input/Input"
import { Select } from "../../../../../../../components/UI/Select/Select"
import classes from "../../../../survey.module.scss"

const { Option } = Select

type Props = {}

export const Temp: FC<Props> = () => {
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
                />
                <Input
                    label='до'
                    id='diffto'
                    name='diffto'
                    type='number'
                    orentation='horizontal'
                    placeholder='0'
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
                />
                <p>/</p>
                <Input
                    id='prestest'
                    name='prestest'
                    type='number'
                    placeholder='0.0'
                    min={0}
                    step={0.1}
                />
                <Select value='mpa' onChange={() => {}}>
                    <Option value='mpa'>Мпа</Option>
                    <Option value='kgs'>
                        кгс/см<sup>2</sup>
                    </Option>
                    <Option value='class'>класс давления</Option>
                </Select>
            </div>
            <div className={`${classes.inline} `}>
                <p className={classes.nodeTitle}>Среда, состав/концентрация</p>
                <Input name='environ' />
            </div>
        </div>
    )
}
