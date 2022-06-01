import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { ConfirmModal } from "../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../components/Modal/hooks/useModal"
import { ProUrl } from "../../../components/routes"
import { Button } from "../../../components/UI/Button/Button"
import { Dispatch, ProState } from "../../store/store"
import { Items } from "./components/Items/Items"
import Table from "./components/Table/Table"
import classes from "./list.module.scss"

export default function List() {
    const items = useSelector((state: ProState) => state.list.list)

    const navigate = useNavigate()

    const { list } = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()

    const backHandler = () => {
        navigate(-1)
    }

    const [windowSize, setWindwoSize] = useState<"small" | "normal">("small")

    useEffect(() => {
        if (window.innerWidth <= 1100) setWindwoSize("small")
        else setWindwoSize("normal")
    }, [])

    const deleteAllItems = () => {
        //TODO удалить прокладки и чертежи к ним (если есть)

        list.setList([])
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
                            <Button variant='grayPrimary' rounded='round'>
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
