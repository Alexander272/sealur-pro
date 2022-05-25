import { FC } from "react"
import { Input } from "../../../../../../../components/UI/Input/Input"
import classes from "../../../../survey.module.scss"

type Props = {}

export const Equipment: FC<Props> = () => {
    return (
        <>
            <p className={classes.title}>Описание оборудования</p>
            <div className={classes.field}>
                <Input
                    label='Установка/название тех. процесса'
                    id='techprocess'
                    name='techprocess'
                    orentation='horizontal'
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Оборудование (агрегат)'
                    id='equipment'
                    name='equipment'
                    orentation='horizontal'
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Применяемое уплотнение/проблемы'
                    id='seal'
                    name='seal'
                    orentation='horizontal'
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Предприятие - Потребитель'
                    id='consumer'
                    name='consumer'
                    orentation='horizontal'
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Завод изготовитель оборудования'
                    id='factory'
                    name='factory'
                    orentation='horizontal'
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Разработчик документации'
                    id='dev'
                    name='dev'
                    orentation='horizontal'
                />
            </div>
        </>
    )
}
