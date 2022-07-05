import React, { FC, useCallback, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import PositionService from "../../../service/position"
import OrderService from "../../../service/order"
import { Dispatch, ProState } from "../../../store/store"
import { IPosition } from "../../../types/order"
import { store } from "../../../../store/store"
import classes from "../orders.module.scss"
import { Table } from "./Table"
import { Items } from "./Items"

type Props = {
    orderId: string
    isOpen: boolean
    onClose: () => void
}

export const Order: FC<Props> = ({ orderId, isOpen, onClose }) => {
    const [positions, setPositions] = useState<IPosition[]>([])
    const [windowSize, setWindwoSize] = useState<"small" | "normal">("normal")

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

    useLayoutEffect(() => {
        if (window.innerWidth <= 1000) setWindwoSize("small")
        else setWindwoSize("normal")
    }, [])

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

            {windowSize === "normal" ? (
                <Table positions={positions} onCopy={copyHandler} />
            ) : (
                <Items positions={positions} onCopy={copyHandler} />
            )}
        </div>
    )
}
