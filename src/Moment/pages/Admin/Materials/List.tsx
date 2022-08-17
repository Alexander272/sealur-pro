import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { ConfirmModal } from "../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../components/Modal/Modal"
import { Button } from "../../../../components/UI/Button/Button"
import { Input } from "../../../../components/UI/Input/Input"
import MaterialService from "../../../service/materials"
import { IFullMaterial } from "../../../types/materials"
import classes from "./materials.module.scss"

type Props = {
    materials: IFullMaterial[] | undefined
    material: IFullMaterial
    onClick: (material: IFullMaterial) => void
}

export const List: FC<Props> = ({ materials, material, onClick }) => {
    const { toggle, isOpen } = useModal()
    const { toggle: toggleConfirm, isOpen: isOpenConfirm } = useModal()
    const { register, handleSubmit, setValue, watch } = useForm<IFullMaterial>()
    const { mutate } = useSWRConfig()

    if (!materials) return null

    const watchId = watch("id")

    const selectHandler = (material: IFullMaterial) => () => onClick(material)

    const openModalHandler = (material: IFullMaterial | null) => (event: React.MouseEvent) => {
        event.stopPropagation()
        if (material) {
            setValue("title", material.title)
            setValue("id", material.id)
        } else {
            setValue("title", "")
            setValue("id", "")
        }
        toggle()
    }

    const saveHandler = async (data: IFullMaterial) => {
        try {
            if (data.id) {
                await MaterialService.updateMaterialData(
                    `/sealur-moment/materials/${data.id}`,
                    data
                )
            } else {
                await MaterialService.createMaterialData(`/sealur-moment/materials`, data)
            }
            mutate("/sealur-moment/materials/empty")
        } catch (error) {
            toast.error("Произошла ошибка")
        } finally {
            toggle()
        }
    }

    const deleteHandler = async () => {
        try {
            await MaterialService.deleteMaterialData(`/sealur-moment/materials/${watchId}`)
            mutate("/sealur-moment/materials/empty")
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
                title='Удалить метриал?'
                isOpen={isOpenConfirm}
                toggle={toggleConfirm}
                cancelHandler={toggleConfirm}
                confirmHandler={deleteHandler}
            />
            <Modal isOpen={isOpen} toggle={toggle}>
                <Modal.Header
                    title={watchId === "" ? "Добавить материал" : "Редактировать материал"}
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

            <h3 className={classes["list-title"]}>Материалы</h3>

            <div className={classes["list-button"]}>
                <Button variant='grayPrimary' onClick={openModalHandler(null)} fullWidth>
                    Добавить
                </Button>
            </div>

            <div className={`${classes["list-content"]} scroll`}>
                {materials.map(m => (
                    <p
                        key={m.id}
                        className={[
                            classes["list-item"],
                            material.id === m.id ? classes["list-item--active"] : "",
                        ].join(" ")}
                        onClick={selectHandler(m)}
                    >
                        {m.title}
                        {m.IsEmptyAlpha || m.IsEmptyElasticity || m.IsEmptyVoltage ? (
                            <span className={classes["warn-icon"]}>&#10069;</span>
                        ) : null}
                        <span className={classes["edit-icon"]} onClick={openModalHandler(m)}>
                            &#9998;
                        </span>
                    </p>
                ))}
            </div>
        </div>
    )
}
