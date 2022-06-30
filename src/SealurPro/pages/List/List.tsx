import { useEffect, useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { toast } from "react-toastify"
import { ConfirmModal } from "../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../components/Modal/hooks/useModal"
import { ProUrl } from "../../../components/routes"
import { Button } from "../../../components/UI/Button/Button"
import OrderService from "../../service/order"
import { Dispatch, ProState } from "../../store/store"
import { store } from "../../../store/store"
import { Items } from "./components/Items/Items"
import Table from "./components/Table/Table"
import classes from "./list.module.scss"

export default function List() {
    const items = useSelector((state: ProState) => state.list.list)
    const isOrderCreated = useSelector((state: ProState) => state.list.isOrderCreated)
    const orderId = useSelector((state: ProState) => state.list.orderId)

    const navigate = useNavigate()

    const { list } = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()

    const backHandler = () => {
        navigate(-1)
    }

    const [windowSize, setWindwoSize] = useState<"small" | "normal">("normal")

    useLayoutEffect(() => {
        if (!isOrderCreated) list.getPositions(store.getState().user.userId)
    }, [isOrderCreated, list])

    useEffect(() => {
        if (window.innerWidth <= 1100) setWindwoSize("small")
        else setWindwoSize("normal")
    }, [])

    const deleteAllItems = () => {
        list.deleteOrder(orderId)
        toggle()
    }

    const saveHandler = async () => {
        try {
            const res = await OrderService.saveAndGet(orderId)
            const blob = new Blob([res.data])

            const href = URL.createObjectURL(blob)
            const link = document.createElement("a")
            link.href = href
            link.download = res.headers["content-disposition"].split("=")[1]
            document.body.appendChild(link)
            link.click()
            document.body.removeChild(link)
        } catch (error: any) {
            console.log(error)
            toast.error(error.message)
        }
    }

    return (
        <div className={classes.container}>
            <ConfirmModal
                title='Очистить список?'
                isOpen={isOpen}
                toggle={toggle}
                cancelHandler={toggle}
                confirmHandler={deleteAllItems}
            />
            <div className={classes.line}>
                <div className={classes.btns}>
                    {items.length ? (
                        <>
                            <Button variant='danger' rounded='round' onClick={toggle}>
                                Очистить список
                            </Button>
                            <Button variant='grayPrimary' rounded='round' onClick={saveHandler}>
                                Сохранить список
                            </Button>
                            <Button rounded='round'>Отправить список</Button>
                        </>
                    ) : null}
                </div>
                <nav className={classes.buttons}>
                    <Button.Link to={`${ProUrl}/survey`} variant='grayPrimary' rounded='round'>
                        Заполнить опросный лист
                    </Button.Link>
                    <Button onClick={backHandler} rounded='round'>
                        Вернуться к выбору
                    </Button>
                </nav>
            </div>

            {windowSize === "normal" ? <Table /> : <Items />}
        </div>
    )
}
