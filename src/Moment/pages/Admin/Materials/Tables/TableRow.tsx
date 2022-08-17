import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import MaterialService from "../../../../service/materials"
import classes from "../materials.module.scss"

type Row = {
    id: string
    temperature: number
    field: number
}

type Props = {
    field: "alpha" | "elasticity" | "voltage"
    data: Row
    materialId: string
}

export const TableRow: FC<Props> = ({ field, data, materialId }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { dirtyFields },
    } = useForm<Row>({
        defaultValues: data,
    })
    const { mutate } = useSWRConfig()
    const { toggle, isOpen } = useModal()

    const saveHandler = async (row: Row) => {
        const newData = {
            markId: materialId,
            temperature: +row.temperature,
            [field]: +row.field,
        }
        try {
            await MaterialService.updateMaterialData(
                `/sealur-moment/materials/${field}/${data.id}`,
                newData
            )
            mutate(`/sealur-moment/materials/${materialId}`)
            reset({}, { keepDirty: false })
        } catch (error) {
            toast.error("Произошла ошибка")
        }
    }

    const deleteHandler = async () => {
        try {
            await MaterialService.deleteMaterialData(`/sealur-moment/materials/${field}/${data.id}`)
            mutate(`/sealur-moment/materials/${materialId}`)
            reset({}, { keepDirty: false })
        } catch (error) {
            toast.error("Произошла ошибка")
        } finally {
            toggle()
        }
    }
    const openModalHandler = (event: React.MouseEvent) => {
        event.stopPropagation()
        toggle()
    }

    return (
        <>
            <ConfirmModal
                title='Удалить?'
                toggle={toggle}
                isOpen={isOpen}
                cancelHandler={toggle}
                confirmHandler={deleteHandler}
            />
            <form className={classes["table-row"]} onSubmit={handleSubmit(saveHandler)}>
                <input
                    className={classes.column}
                    type='number'
                    step={0.001}
                    {...register("temperature", {
                        required: true,
                    })}
                />
                <input
                    className={classes.column}
                    type='number'
                    step={0.001}
                    {...register("field", {
                        required: true,
                    })}
                />
                {dirtyFields.temperature || dirtyFields.field ? (
                    <button type='submit' className={classes.icon}>
                        <img src='/image/save-icon.svg' alt='save' />
                    </button>
                ) : (
                    <button onClick={openModalHandler} className={classes["icon-delete"]}>
                        &times;
                    </button>
                )}
            </form>
        </>
    )
}
