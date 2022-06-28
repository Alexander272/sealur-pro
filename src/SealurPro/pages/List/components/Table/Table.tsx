import React, { FC, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Dispatch, ProState } from "../../../../store/store"
import { IDrawing } from "../../../../types/drawing"
import classes from "./table.module.scss"

type Props = {}

const Table: FC<Props> = () => {
    const throttled = useRef<any>()

    const list = useSelector((state: ProState) => state.list.list)
    const orderId = useSelector((state: ProState) => state.list.orderId)

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

        clearTimeout(throttled.current)
        throttled.current = setTimeout(() => {
            console.log("====>", event.target.value)
            dispatch.list.updatePosition({ orderId, id, count: event.target.value })
            // setFilteredCities(
            //     citiesArray.filter(city => city.toLowerCase().includes(query.toLowerCase()))
            // )
        }, 500)
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
                                {(d.drawing as IDrawing).name ? (
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
