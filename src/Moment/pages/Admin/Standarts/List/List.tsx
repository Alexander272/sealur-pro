import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../components/Modal/Modal"
import { Button } from "../../../../../components/UI/Button/Button"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import AdminService from "../../../../service/admin"
import { ITypeFlange } from "../../../../types/flange"
import { IStandart } from "../../../../types/standart"
import classes from "../standarts.module.scss"

type Props = {
    types: ITypeFlange[] | undefined
    typeId: string | null
    chageType: (id: string) => void
    standarts: IStandart[] | undefined
    standart: IStandart | null
    onClick: (standart: IStandart) => void
}

export const List: FC<Props> = ({ types, typeId, chageType, standarts, standart, onClick }) => {
    const { toggle, isOpen } = useModal()
    const { toggle: toggleConfirm, isOpen: isOpenConfirm } = useModal()
    const { register, handleSubmit, setValue, watch } = useForm<IStandart>()
    const { mutate } = useSWRConfig()

    if (!types || !typeId) return <div className={classes.list}></div>

    const watchId = watch("id")

    const selectHandler = (standart: IStandart) => () => onClick(standart)

    const openModalHandler = (standart: IStandart | null) => (event: React.MouseEvent) => {
        event.stopPropagation()
        if (standart) {
            setValue("id", standart.id)
            setValue("title", standart.title)
            setValue("titleDn", standart.titleDn)
            setValue("titlePn", standart.titlePn)
            setValue("typeId", standart.typeId)
            setValue("isInch", standart.isInch)
            setValue("isNeedRow", standart.isNeedRow)
            setValue("rows", standart.rows)
        } else {
            setValue("id", "")
            setValue("title", "")
            setValue("titleDn", "")
            setValue("titlePn", "")
            setValue("typeId", typeId)
            setValue("isInch", false)
            setValue("isNeedRow", false)
            setValue("rows", [])
        }
        toggle()
    }

    const saveHandler = async (data: IStandart) => {
        try {
            if (data.id) {
                await AdminService.update(`/sealur-moment/standarts/${data.id}`, data)
            } else {
                await AdminService.create(`/sealur-moment/standarts`, data)
            }
            mutate(`/sealur-moment/standarts/?typeId=${typeId}`)
        } catch (error) {
            toast.error("Произошла ошибка")
        } finally {
            toggle()
        }
    }

    const deleteHandler = async () => {
        try {
            await AdminService.delete(`/sealur-moment/standarts/${watchId}`)
            mutate(`/sealur-moment/standarts/?typeId=${typeId}`)
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
                title='Удалить стандарт?'
                isOpen={isOpenConfirm}
                toggle={toggleConfirm}
                cancelHandler={toggleConfirm}
                confirmHandler={deleteHandler}
            />
            <Modal isOpen={isOpen} toggle={toggle}>
                <Modal.Header
                    title={watchId === "" ? "Добавить стандарт" : "Редактировать стандарт"}
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

            <h5 className={classes["list-title"]}>Тип фланца</h5>
            <div className={classes["list-button"]}>
                <Select value={typeId} onChange={chageType}>
                    {types.map(t => (
                        <Select.Option key={t.id} value={t.id}>
                            {t.title}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <h5 className={classes["list-title"]}>Стандарты</h5>
            <div className={classes["list-button"]}>
                <Button variant='grayPrimary' fullWidth onClick={openModalHandler(null)}>
                    Добавить
                </Button>
            </div>
            <div className={`${classes["list-content"]} scroll`}>
                {standarts ? (
                    standarts.map(s => (
                        <p
                            key={s.id}
                            className={[
                                classes["list-item"],
                                standart?.id === s.id ? classes["list-item--active"] : "",
                            ].join(" ")}
                            onClick={selectHandler(s)}
                        >
                            {s.title}
                            <span className={classes["edit-icon"]} onClick={openModalHandler(s)}>
                                &#9998;
                            </span>
                        </p>
                    ))
                ) : (
                    <p>Нет ни одного стандарта</p>
                )}
            </div>
        </div>
    )
}
