import React, { FC } from "react"
import { Button } from "../../../../../components/UI/Button/Button"
import { IUser } from "../../../../../types/user"
import classes from "../../users.module.scss"

type Props = {
    user: IUser
    onReject: () => void
    onConfirm: () => void
}

export const NewUser: FC<Props> = ({ user, onReject, onConfirm }) => {
    return (
        <div className={classes.item}>
            <p className={classes.item_row}>
                <span>Предприятие:</span> <span>{user.organization}</span>
            </p>
            <p className={classes.item_row}>
                <span>Город:</span> <span>{user.city}</span>
            </p>
            <p className={classes.item_row}>
                <span>Ф.И.О.:</span> <span>{user.name}</span>
            </p>
            <p className={classes.item_row}>
                <span>Должность:</span> <span>{user.position}</span>
            </p>
            <p className={classes.item_row}>
                <span>Email:</span> <span>{user.email}</span>
            </p>
            <p className={classes.item_row}>
                <span>Контактный телефон:</span> <span>{user.phone}</span>
            </p>
            <div className={classes.buttons}>
                <Button variant='danger' fullWidth onClick={onReject}>
                    Отклонить
                </Button>
                <Button fullWidth onClick={onConfirm}>
                    Подтвердить
                </Button>
            </div>
        </div>
    )
}
