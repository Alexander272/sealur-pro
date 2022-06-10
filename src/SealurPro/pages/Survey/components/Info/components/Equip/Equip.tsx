import { ChangeEvent, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../../../../../../../components/UI/Input/Input"
import { Dispatch, ProState } from "../../../../../../store/store"
import { EquipFields } from "../../../../../../types/survey"
import classes from "../../../../survey.module.scss"

type Props = {}

export const Equipment: FC<Props> = () => {
    const equip = useSelector((state: ProState) => state.survey.equip)

    const { survey } = useDispatch<Dispatch>()

    const changeEquipDataHandler =
        (field: EquipFields) => (event: ChangeEvent<HTMLInputElement>) => {
            survey.setEqipData({ field, value: event.target.value })
        }

    return (
        <>
            <p className={classes.title}>Описание оборудования</p>
            <div className={classes.field}>
                <Input
                    label='Установка/название тех. процесса'
                    id='techprocess'
                    name='techprocess'
                    orentation='horizontal'
                    value={equip.techprocess}
                    onChange={changeEquipDataHandler("techprocess")}
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Оборудование (агрегат)'
                    id='equipment'
                    name='equipment'
                    orentation='horizontal'
                    value={equip.equipment}
                    onChange={changeEquipDataHandler("equipment")}
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Применяемое уплотнение/проблемы'
                    id='seal'
                    name='seal'
                    orentation='horizontal'
                    value={equip.seal}
                    onChange={changeEquipDataHandler("seal")}
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Предприятие - Потребитель'
                    id='consumer'
                    name='consumer'
                    orentation='horizontal'
                    value={equip.consumer}
                    onChange={changeEquipDataHandler("consumer")}
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Завод изготовитель оборудования'
                    id='factory'
                    name='factory'
                    orentation='horizontal'
                    value={equip.factory}
                    onChange={changeEquipDataHandler("factory")}
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Разработчик документации'
                    id='developer'
                    name='developer'
                    orentation='horizontal'
                    value={equip.developer}
                    onChange={changeEquipDataHandler("developer")}
                />
            </div>
        </>
    )
}
