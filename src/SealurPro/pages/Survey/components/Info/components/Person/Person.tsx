import { FC } from "react"
import { Input } from "../../../../../../../components/UI/Input/Input"
import classes from "../../../../survey.module.scss"

type Props = {}

export const Person: FC<Props> = () => {
    return (
        <>
            <p className={classes.title}>Контактное лицо</p>
            <div className={classes.field}>
                <Input
                    label='Наименование предприятия *'
                    id='organization'
                    name='organization'
                    orentation='horizontal'
                />
            </div>
            <div className={classes.field}>
                <Input label='Ф.И.О. *' id='name' name='name' orentation='horizontal' />
            </div>
            <div className={classes.field}>
                <Input
                    label='Email *'
                    type='email'
                    id='email'
                    name='email'
                    orentation='horizontal'
                />
            </div>
            <div className={classes.field}>
                <Input label='Город' id='city' name='city' orentation='horizontal' />
            </div>
            <div className={classes.field}>
                <Input label='Должность' id='position' name='position' orentation='horizontal' />
            </div>
            <div className={classes.field}>
                <Input label='Телефон' id='phone' name='phone' orentation='horizontal' />
            </div>
        </>
    )
}
