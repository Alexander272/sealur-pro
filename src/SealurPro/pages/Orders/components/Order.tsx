import React, { FC, useCallback, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import PositionService from "../../../service/position"
import { Dispatch, ProState } from "../../../store/store"
import { IPosition } from "../../../types/order"
import { store } from "../../../../store/store"
import classes from "../orders.module.scss"
import OrderService from "../../../service/order"

type Props = {
    orderId: string
    isOpen: boolean
    onClose: () => void
}

export const Order: FC<Props> = ({ orderId, isOpen, onClose }) => {
    const [positions, setPositions] = useState<IPosition[]>([])

    const isOrderCreated = useSelector((state: ProState) => state.list.isOrderCreated)
    const curOrderId = useSelector((state: ProState) => state.list.orderId)

    const { list } = useDispatch<Dispatch>()

    const fetchOrders = useCallback(async () => {
        try {
            if (orderId !== "") {
                const res = await PositionService.get(orderId)
                setPositions(res.data)
            }
        } catch (error: any) {
            toast.error(error.message)
        }
    }, [orderId])

    useLayoutEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    const copyHandler = (pos: IPosition) => async () => {
        if (orderId === "") return

        let oId = curOrderId
        if (!isOrderCreated) {
            const res = await OrderService.create({
                count: 0,
                userId: store.getState().user.userId,
            })
            list.setIsOrderCreated(true)
            list.setOrderId(res.id || "")
            oId = res.id || ""
        }

        await PositionService.copy(oId, {
            designation: pos.designation,
            count: pos.count.toString(),
            sizes: pos.sizes,
            drawing: pos.drawing,
            description: pos.description,
            orderId: orderId,
        })
        toast.success("Позиция скопирована")
    }

    return (
        <div className={`${classes.order} ${isOpen ? classes.open : ""} scroll`}>
            <div className={classes.close} onClick={onClose}>
                &times;
            </div>
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

                        <p className={`${classes.td} ${classes.copy}`} onClick={copyHandler(d)}>
                            <img src='/image/data-transfer.svg' alt='copy' />
                        </p>
                    </div>
                ))}
            </div>
        </div>
    )
}
