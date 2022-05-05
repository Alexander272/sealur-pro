import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../../../store/store"
import classes from "./table.module.scss"

type Props = {}

const Table: FC<Props> = () => {
    const list = useSelector((state: ProState) => state.list.list)

    const dispatch = useDispatch<Dispatch>()

    if (!list.length)
        return (
            <div className={classes.table}>
                <p className={classes.empty}>Список пуст</p>
            </div>
        )

    const changeCountHandler = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch.list.changeCount({ id, count: event.target.value })
    }

    return (
        <div className={classes.table}>
            <div className={classes.row}>
                <p className={classes.th}>Обозначение</p>
                <p className={classes.th}>Количество</p>
                <p className={classes.th}>Размеры</p>
                <p className={classes.th}>Чертеж</p>
                <p className={classes.th}>Описание</p>
            </div>
            {/* //TODO добавить возможность удаления строк и полное очищение таблицы */}
            {list.map(d => (
                <div className={`${classes.row} ${classes.tr}`} key={d.id}>
                    <p className={classes.td}>{d.designation}</p>
                    <input
                        className={`${classes.td} ${classes.input}`}
                        value={d.count}
                        onChange={changeCountHandler(d.id)}
                        type='number'
                        min={1}
                    />
                    {/* <p className={classes.td}>{d.count}</p> */}
                    <p className={classes.td}>{d.sizes}</p>
                    {/* //TODO сделать ссылкой */}
                    <p className={classes.td}>{d.drawing?.name}</p>
                    <p className={`${classes.td} ${classes.description} scroll`}>{d.description}</p>
                </div>
            ))}
        </div>
    )
}

export default Table
