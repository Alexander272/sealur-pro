import { useCallback, useLayoutEffect, useRef, useState } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import OrderService from "../../service/order"
import { store } from "../../../store/store"
import { Dispatch, ProState } from "../../store/store"
import { IOrder } from "../../types/order"
import { OrderItem } from "./components/OrderItem"
import { Button } from "../../../components/UI/Button/Button"
import { Order } from "./components/Order"
import classes from "./orders.module.scss"

export default function Orders() {
    const [orders, setOrders] = useState<IOrder[]>([])
    const [isOpen, setIsOpen] = useState(false)
    const orderId = useRef("")

    const isOrderCreated = useSelector((state: ProState) => state.list.isOrderCreated)
    const curOrderId = useSelector((state: ProState) => state.list.orderId)

    const { list } = useDispatch<Dispatch>()

    const navigate = useNavigate()

    const fetchOrders = useCallback(async () => {
        try {
            const res = await OrderService.getAll(store.getState().user.userId)
            setOrders(res.data || [])
        } catch (error: any) {
            toast.error(error.message)
        }
    }, [])

    useLayoutEffect(() => {
        fetchOrders()
    }, [fetchOrders])

    const closeHandler = () => setIsOpen(false)

    const proHandler = () => {
        navigate("/pro")
    }

    const listHandler = () => {
        list.getPositions(store.getState().user.userId)
        navigate("/pro/list")
    }

    const copyHandler = (orderId: string) => async () => {
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

        await OrderService.copy(oId, { orderId })
        toast.success("Заказ скопирован")
    }

    const moreHandler = (id: string) => () => {
        orderId.current = id
        setIsOpen(true)
    }

    return (
        <div className={classes.container}>
            <div className={classes.line}>
                <Button rounded='round' onClick={proHandler}>
                    Вернуться к выбору
                </Button>
                <Button rounded='round' variant='grayPrimary' onClick={listHandler}>
                    Перейти к списку
                </Button>
            </div>

            <Order orderId={orderId.current} isOpen={isOpen} onClose={closeHandler} />

            {orders.length ? (
                orders.map(o => (
                    <OrderItem
                        key={o.id}
                        order={o}
                        onCopy={copyHandler(o.id)}
                        onMore={moreHandler(o.id)}
                    />
                ))
            ) : (
                <p>Заказов пока нет</p>
            )}
        </div>
    )
}
