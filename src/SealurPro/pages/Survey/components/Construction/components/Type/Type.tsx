import { FC } from "react"
import { Tabs } from "../../../../../../../components/Tabs/Tabs"
import { Select } from "../../../../../../../components/UI/Select/Select"
import classes from "../../../../survey.module.scss"

const { Option } = Select

type Props = {}

export const Type: FC<Props> = () => {
    return (
        <>
            <p className={classes.title}>Конструкция узла</p>
            <div className={`${classes.inline} ${classes.node}`}>
                <p className={classes.nodeTitle}>Тип фланцевого соединения</p>
                <Select value='ledge' onChange={() => {}}>
                    <Option value='ledge'>Соединительный выступ</Option>
                    <Option value='ledge_trough'>Выступ-впадина</Option>
                    <Option value='tenon'>Шип-паз</Option>
                    <Option value='groove'>Паз - гладкая поверхность</Option>
                    <Option value='lock_melt'>Замок (под плав головку теплообменника)</Option>
                    <Option value='lock'>Замок</Option>
                    <Option value='plug'>Под резьбую пробку</Option>
                    <Option value='another'>Другой</Option>
                </Select>
                <p className={classes.flange}>1-1/ RF/ В1/ В2</p>
            </div>
            <div className={`${classes.inline} ${classes.stand}`}>
                <Tabs initWidth={124} initPos={142}>
                    <p className={[classes.variants].join(" ")} data-type='not_stand'>
                        Нестандартный
                        <br />
                        фланец
                    </p>
                    <p className={[classes.variants, classes.active].join(" ")} data-type='stand'>
                        Стандартный
                        <br />
                        фланец
                    </p>
                </Tabs>
                <Select value='gost12815' onChange={() => {}}>
                    <Option value='gost12815'>ГОСТ 12815 (трубопроводы)</Option>
                    <Option value='gost28759'>ГОСТ 28759 (сосуды и аппараты)</Option>
                    <Option value='asmeb165'>ASME B 16.5</Option>
                    <Option value='asmeb1647a'>ASME B 16.47A</Option>
                    <Option value='asmeb1647b'>ASME B 16.47B</Option>
                    <Option value='din'>DIN/EN 1092</Option>
                </Select>
            </div>
        </>
    )
}
