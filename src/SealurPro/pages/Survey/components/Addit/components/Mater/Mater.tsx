import { FC } from "react"
import { Tabs } from "../../../../../../../components/Tabs/Tabs"
import { Input } from "../../../../../../../components/UI/Input/Input"
import { Select } from "../../../../../../../components/UI/Select/Select"
import classes from "../../../../survey.module.scss"

const { Option } = Select

type Props = {}

export const Mater: FC<Props> = () => {
    return (
        <div className={classes.fb50}>
            <div className={classes.inline}>
                <p>Материал фланца</p>
                <Select value='mpa' onChange={() => {}}>
                    <Option value='mpa'>Мпа</Option>
                    <Option value='kgs'>
                        кгс/см<sup>2</sup>
                    </Option>
                    <Option value='class'>класс давления</Option>
                </Select>
            </div>
            <div className={classes.inline}>
                <p>Материал болтов/шпилек</p>
                <Select value='mpa' onChange={() => {}}>
                    <Option value='mpa'>Мпа</Option>
                    <Option value='kgs'>
                        кгс/см<sup>2</sup>
                    </Option>
                    <Option value='class'>класс давления</Option>
                </Select>
            </div>
            <div className={classes.inline}>
                <p>&Oslash; болтов/шпилек</p>
                <Select value='mpa' disabled onChange={() => {}}>
                    <Option value='mpa'>Мпа</Option>
                    <Option value='kgs'>
                        кгс/см<sup>2</sup>
                    </Option>
                    <Option value='class'>класс давления</Option>
                </Select>
            </div>
            <div className={classes.inline}>
                <p>Количествово болтов/шпилек, шт</p>
                <Input
                    name='diffto'
                    type='number'
                    orentation='horizontal'
                    placeholder='0'
                    disabled
                />
            </div>
            <div className={classes.inline}>
                <p>Наличие смазки на крепеже</p>
                <Tabs initWidth={53} onClick={() => {}}>
                    <p className={[classes.variants, classes.active].join(" ")} data-type='no'>
                        Нет
                    </p>
                    <p className={[classes.variants].join(" ")} data-type='yes'>
                        Да
                    </p>
                </Tabs>
            </div>
        </div>
    )
}
