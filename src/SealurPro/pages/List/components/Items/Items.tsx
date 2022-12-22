import React, { FC, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Dispatch, ProState } from "../../../../store/store"
import { IDrawing } from "../../../../types/drawing"
import classes from "./item.module.scss"

type Props = {}

export const Items: FC<Props> = () => {
    const list = useSelector((state: ProState) => state.list.list)
    const orderId = useSelector((state: ProState) => state.list.orderId)

    const dispatch = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()
    const currentId = useRef("")
    const throttled = useRef<any>()

    if (!list.length)
        return (
            <div className={classes.item}>
                <p className={classes.empty}>Список пуст</p>
            </div>
        )

    const changeCountHandler = (id: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        dispatch.list.changeCount({ id, count: event.target.value })

        clearTimeout(throttled.current)
        throttled.current = setTimeout(() => {
            dispatch.list.updatePosition({ orderId, id, count: event.target.value })
        }, 500)
    }

    const openHadnler = (id: string) => () => {
        currentId.current = id
        toggle()
    }

    const deleteHandler = () => {
        dispatch.list.deletePosition({ orderId, id: currentId.current })
        toggle()
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
                        {d.drawing && (d.drawing as IDrawing).name ? (
                            <a
                                href={(d.drawing as IDrawing).link}
                                download={(d.drawing as IDrawing).name}
                            >
                                {(d.drawing as IDrawing).name}
                            </a>
                        ) : (
                            d.drawing
                        )}
                    </p>
                    <p className={classes.text}>
                        <b>Описание</b>: {d.description}
                    </p>
                </div>
            ))}
        </>
    )
}
