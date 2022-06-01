import React, { FC, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Dispatch, ProState } from "../../../../store/store"
import classes from "./item.module.scss"

type Props = {}

export const Items: FC<Props> = () => {
    const list = useSelector((state: ProState) => state.list.list)

    const dispatch = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()
    const currentId = useRef("")

    if (!list.length)
        return (
            <div className={classes.item}>
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
        //TODO добавить удаление и чертежа (если он есть)

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
            {list.map(d => (
                <div className={classes.item} key={d.id}>
                    <p className={classes.delete} onClick={openHadnler(d.id)}>
                        &times;
                    </p>
                    <p className={classes.text}>
                        <b>Обозначение</b>: {d.designation}
                    </p>
                    <div className={classes.count}>
                        <p>
                            <b>Количество</b>:
                        </p>
                        <input
                            className={`${classes.td} ${classes.input}`}
                            value={d.count}
                            onChange={changeCountHandler(d.id)}
                            type='number'
                            min={1}
                        />
                    </div>
                    <p className={classes.text}>
                        <b>Размеры</b>: {d.sizes}
                    </p>
                    <p className={classes.text}>
                        <b>Чертеж</b>:{" "}
                        <a href={d.drawing?.link} download={d.drawing?.name}>
                            {d.drawing?.name}
                        </a>
                    </p>
                    <p className={classes.text}>
                        <b>Описание</b>: {d.description}
                    </p>
                </div>
            ))}
        </>
    )
}
