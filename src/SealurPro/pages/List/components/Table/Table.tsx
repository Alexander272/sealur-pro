import React, { FC, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Dispatch, ProState } from "../../../../store/store"
import classes from "./table.module.scss"

type Props = {}

const Table: FC<Props> = () => {
    const list = useSelector((state: ProState) => state.list.list)

    const dispatch = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()
    const currentId = useRef("")

    if (!list.length)
        return (
            <div className={classes.table}>
                <p className={classes.empty}>Список пуст</p>
            </div>
        )

    const changeCountHandler = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch.list.changeCount({ id, count: event.target.value })
    }

    const openHadnler = (id: string) => () => {
        currentId.current = id
        toggle()
    }

    const deleteHandler = () => {
        console.log(currentId.current)
        //TODO добавить удаление прокладки и чертежа (если он есть)

        dispatch.list.deleteItem(currentId.current)
    }

    return (
        <>
            <ConfirmModal
                title='Удалить?'
                isOpen={isOpen}
                toggle={toggle}
                cancelHandler={toggle}
                confirmHandler={deleteHandler}
            />
            <div className={classes.table}>
                <div className={classes.row}>
                    <p className={classes.th}>Обозначение</p>
                    <p className={classes.th}>Количество</p>
                    <p className={classes.th}>Размеры</p>
                    <p className={classes.th}>Чертеж</p>
                    <p className={classes.th}>Описание</p>
                </div>
                {/* //TODO добавить полное очищение таблицы */}
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
                        {d.drawing ? (
                            <p className={classes.td}>
                                <a href={d.drawing?.link} download={d.drawing?.name}>
                                    {d.drawing?.name}
                                </a>
                            </p>
                        ) : (
                            <p className={classes.td}></p>
                        )}
                        <p className={`${classes.td} ${classes.description} scroll`}>
                            {d.description}
                        </p>

                        <p className={classes.delete} onClick={openHadnler(d.id)}>
                            &times;
                        </p>
                    </div>
                ))}
            </div>
        </>
    )
}

export default Table
