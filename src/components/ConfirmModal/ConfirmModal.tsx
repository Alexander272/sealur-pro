import { FC } from "react"
import { Modal } from "../Modal/Modal"
import { Button } from "../UI/Button/Button"
import classes from "./modal.module.scss"

type Props = {
    title: string
    isOpen: boolean
    isNo?: boolean
    toggle: () => void
    cancelHandler: () => void
    denyHandler?: () => void
    confirmHandler: () => void
}

export const ConfirmModal: FC<Props> = ({
    title,
    isOpen,
    isNo,
    toggle,
    cancelHandler,
    denyHandler,
    confirmHandler,
}) => {
    return (
        <Modal isOpen={isOpen} toggle={toggle} size='small'>
            <Modal.Header title={title} />
            <Modal.Footer>
                <Button variant='grayPrimary' fullWidth onClick={cancelHandler}>
                    Отмена
                </Button>
                {isNo && (
                    <>
                        <p className={classes.offset} />
                        <Button fullWidth onClick={denyHandler}>
                            Нет
                        </Button>
                    </>
                )}
                <p className={classes.offset} />
                <Button fullWidth onClick={confirmHandler}>
                    {isNo ? "Да" : "Ок"}
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
