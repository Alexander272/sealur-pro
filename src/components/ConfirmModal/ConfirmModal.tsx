import { FC } from "react"
import { Modal } from "../Modal/Modal"
import { Button } from "../UI/Button/Button"
import classes from "./modal.module.scss"

type Props = {
    title: string
    isOpen: boolean
    toggle: () => void
    cancelHandler: () => void
    confirmHandler: () => void
}

export const ConfirmModal: FC<Props> = ({
    title,
    isOpen,
    toggle,
    cancelHandler,
    confirmHandler,
}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} size='small'>
            <Modal.Header title={title} />
            <Modal.Footer>
                <Button variant='grayPrimary' fullWidth onClick={cancelHandler}>
                    Отмена
                </Button>
                <p className={classes.offset} />
                <Button fullWidth onClick={confirmHandler}>
                    Ок
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
