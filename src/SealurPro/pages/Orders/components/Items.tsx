import React, { FC } from "react"
import { Button } from "../../../../components/UI/Button/Button"
import { IPosition } from "../../../types/order"
import classes from "../orders.module.scss"

type Props = {
    positions: IPosition[]
    onCopy: (pos: IPosition) => () => void
}

export const Items: FC<Props> = ({ positions, onCopy }) => {
    return (
        <>
            {positions.map(p => (
                <div className={classes.positions} key={p.id}>
                    <p>
                        <b>Обозначение</b>: {p.designation}
                    </p>
                    <p>
                        <b>Количество</b>: {p.count}
                    </p>
                    <p>
                        <b>Размеры</b>: {p.sizes}
                    </p>
                    <p>
                        <b>Чертеж</b>: {p.drawing}
                    </p>
                    <p className={classes.descr}>
                        <b>Описание</b>: {p.description}
                    </p>
                    <Button fullWidth variant='grayPrimary' onClick={onCopy(p)}>
                        Копировать
                    </Button>
                </div>
            ))}
        </>
    )
}
