import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { ConfirmModal } from "../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../components/Modal/Modal"
import { Button } from "../../../../components/UI/Button/Button"
import { Input } from "../../../../components/UI/Input/Input"
import AdminService from "../../../service/admin"
import { IGasket } from "../../../types/flange"
import classes from "./gasket.module.scss"

type Props = {
    gaskets: IGasket[] | undefined
    gasket: IGasket
    onClick: (gasket: IGasket) => void
}

export const List: FC<Props> = ({ gaskets, gasket, onClick }) => {
    const { toggle, isOpen } = useModal()
    const { toggle: toggleConfirm, isOpen: isOpenConfirm } = useModal()
    const { register, handleSubmit, setValue, watch } = useForm<IGasket>()
    const { mutate } = useSWRConfig()

    if (!gaskets) return null

    const watchId = watch("id")

    const selectHandler = (gasket: IGasket) => () => onClick(gasket)

    const openModalHandler = (gasket: IGasket | null) => (event: React.MouseEvent) => {
        event.stopPropagation()
        if (gasket) {
            setValue("title", gasket.title)
            setValue("id", gasket.id)
        } else {
            setValue("title", "")
            setValue("id", "")
        }
        toggle()
    }

    const saveHandler = async (data: IGasket) => {
        try {
            if (data.id) {
                await AdminService.update(`/sealur-moment/gasket/${data.id}`, data)
            } else {
                await AdminService.create(`/sealur-moment/gasket`, data)
            }
            mutate("/sealur-moment/gasket/")
        } catch (error) {
            toast.error("Произошла ошибка")
        } finally {
            toggle()
        }
    }

    const deleteHandler = async () => {
        try {
            await AdminService.delete(`/sealur-moment/gasket/${watchId}`)
            mutate("/sealur-moment/gasket/")
            toggle()
        } catch (error) {
            toast.error("Произошла ошибка")
        } finally {
            toggleConfirm()
        }
    }

    return (
        <div className={classes.list}>
            <ConfirmModal
                title='Удалить прокладку?'
                isOpen={isOpenConfirm}
                toggle={toggleConfirm}
                cancelHandler={toggleConfirm}
                confirmHandler={deleteHandler}
            />
            <Modal isOpen={isOpen} toggle={toggle}>
                <Modal.Header
                    title={watchId === "" ? "Добавить прокладку" : "Редактировать прокладку"}
                />
                <Modal.Content>
                    <Input
                        label='Название'
                        name='title'
                        register={register}
                        rule={{ required: true }}
                    />
                </Modal.Content>
                <Modal.Footer>
                    <div className={classes["modal-btns"]}>
                        <Button variant='grayPrimary' fullWidth onClick={toggle}>
                            Отмена
                        </Button>
                        {watchId !== "" && (
                            <Button variant='danger' onClick={toggleConfirm} fullWidth>
                                Удалить
                            </Button>
                        )}
                        <Button onClick={handleSubmit(saveHandler)} fullWidth>
                            Сохранить
                        </Button>
                    </div>
                </Modal.Footer>
            </Modal>

            <h3 className={classes["list-title"]}>Прокладки</h3>

            <div className={classes["list-button"]}>
                <Button variant='grayPrimary' onClick={openModalHandler(null)} fullWidth>
                    Добавить
                </Button>
            </div>

            <div className={`${classes["list-content"]} scroll`}>
                {gaskets.map(m => (
                    <p
                        key={m.id}
                        className={[
                            classes["list-item"],
                            gasket.id === m.id ? classes["list-item--active"] : "",
                        ].join(" ")}
                        onClick={selectHandler(m)}
                    >
                        {m.title}
                        <span className={classes["edit-icon"]} onClick={openModalHandler(m)}>
                            &#9998;
                        </span>
                    </p>
                ))}
            </div>
        </div>
    )
}
