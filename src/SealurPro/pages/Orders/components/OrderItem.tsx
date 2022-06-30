import React, { FC } from "react"
import { Button } from "../../../../components/UI/Button/Button"
import { IOrder } from "../../../types/order"
import { stampToDate } from "../../../utils/date"
import classes from "../orders.module.scss"

type Props = {
    order: IOrder
    onCopy: () => void
    onMore: () => void
}

export const OrderItem: FC<Props> = ({ order, onCopy, onMore }) => {
    return (
        <div className={classes.item}>
            <p className={classes.title}>Заказ от {stampToDate(+order.date)}</p>
            <p className={classes.count}>Позиций в заказе: {order.count}</p>
            <div className={classes.buttons}>
                <Button onClick={onCopy}>Скопировать</Button>
                <Button onClick={onMore} variant='grayPrimary'>
                    Подробнее
                </Button>
            </div>
        </div>
    )
}
