import React, { FC } from "react"
import { IPosition } from "../../../types/order"
import classes from "../orders.module.scss"

type Props = {
    positions: IPosition[]
    onCopy: (pos: IPosition) => () => void
}

export const Table: FC<Props> = ({ positions, onCopy }) => {
    return (
        <div className={classes.table}>
            <div className={classes.row}>
                <p className={classes.th}>Обозначение</p>
                <p className={classes.th}>Количество</p>
                <p className={classes.th}>Размеры</p>
                <p className={classes.th}>Чертеж</p>
                <p className={classes.th}>Описание</p>
                <p className={classes.th}>Копировать</p>
            </div>

            {positions.map(d => (
                <div className={`${classes.row} ${classes.tr}`} key={d.id}>
                    <p className={classes.td}>{d.designation}</p>
                    <p className={classes.td}>{d.count}</p>
                    <p className={classes.td}>{d.sizes}</p>
                    <p className={classes.td}>{d.drawing}</p>
                    <p className={`${classes.td} ${classes.description}`}>{d.description}</p>

                    <p className={`${classes.td} ${classes.copy}`} onClick={onCopy(d)}>
                        <img src='/image/data-transfer.svg' alt='copy' />
                    </p>
                </div>
            ))}
        </div>
    )
}
