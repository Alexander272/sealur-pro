import { ChangeEvent, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../../../../../../../components/UI/Input/Input"
import { Dispatch, ProState } from "../../../../../../store/store"
import { UserFields } from "../../../../../../types/survey"
import classes from "../../../../survey.module.scss"

type Props = {}

export const Person: FC<Props> = () => {
    const user = useSelector((state: ProState) => state.survey.user)

    const { survey } = useDispatch<Dispatch>()

    const changeUserDataHandler = (name: UserFields) => (event: ChangeEvent<HTMLInputElement>) => {
        survey.setUserData({ field: name, value: event.target.value })
    }

    return (
        <>
            <p className={classes.title}>Контактное лицо</p>
            <div className={classes.field}>
                <Input
                    label='Наименование предприятия *'
                    id='organization'
                    name='organization'
                    orentation='horizontal'
                    value={user.organization || ""}
                    onChange={changeUserDataHandler("organization")}
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Ф.И.О. *'
                    id='name'
                    name='name'
                    orentation='horizontal'
                    value={user.name || ""}
                    onChange={changeUserDataHandler("name")}
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Email *'
                    type='email'
                    id='email'
                    name='email'
                    orentation='horizontal'
                    value={user.email || ""}
                    onChange={changeUserDataHandler("email")}
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Город'
                    id='city'
                    name='city'
                    orentation='horizontal'
                    value={user.city || ""}
                    onChange={changeUserDataHandler("city")}
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Должность'
                    id='position'
                    name='position'
                    orentation='horizontal'
                    value={user.position || ""}
                    onChange={changeUserDataHandler("position")}
                />
            </div>
            <div className={classes.field}>
                <Input
                    label='Телефон'
                    id='phone'
                    name='phone'
                    orentation='horizontal'
                    value={user.phone || ""}
                    onChange={changeUserDataHandler("phone")}
                />
            </div>
        </>
    )
}
