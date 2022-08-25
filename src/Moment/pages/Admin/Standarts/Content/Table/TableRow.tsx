import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { ConfirmModal } from "../../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../../components/Modal/hooks/useModal"
import AdminService from "../../../../../service/admin"
import { IBolt } from "../../../../../types/bolts"
import { IFullSize } from "../../../../../types/sizes"
import classes from "../../standarts.module.scss"

type Props = {
    size: IFullSize
    bolts: IBolt[]
    standartId: string
    row: 0 | 1
}

export const TableRow: FC<Props> = ({ size, bolts, standartId, row }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { dirtyFields },
    } = useForm<IFullSize>({
        defaultValues: size,
    })
    const { mutate } = useSWRConfig()
    const { toggle, isOpen } = useModal()

    const saveHandler = async (data: IFullSize) => {
        const newData: IFullSize = {
            id: data.id,
            standId: data.standId,
            d: +data.d,
            d6: +data.d6,
            dOut: +data.dOut,
            h: +data.h,
            length: +data.length,
            pn: +data.pn,
            s0: +data.s0,
            s1: +data.s1,
            count: +data.count,
            boltId: data.boltId,
            row: row,
        }

        try {
            await AdminService.update(`/sealur-moment/flange-sizes/${size.id}`, newData)
            mutate(`/sealur-moment/flange-sizes?standartId=${standartId}`)
            reset({}, { keepDirty: false })
        } catch (error) {
            toast.error("Произошла ошибка")
        }
    }

    const deleteHandler = async () => {
        try {
            await AdminService.delete(`/sealur-moment/flange-sizes/${size.id}`)
            mutate(`/sealur-moment/flange-sizes?standartId=${standartId}`)
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
                    {...register("pn", {
                        required: true,
                    })}
                />
                <input
                    className={classes.column}
                    type='number'
                    step={0.001}
                    {...register("dOut", {
                        required: true,
                    })}
                />
                <input
                    className={classes.column}
                    type='number'
                    step={0.001}
                    {...register("d", {
                        required: true,
                    })}
                />
                <input
                    className={classes.column}
                    type='number'
                    step={0.001}
                    {...register("d6", {
                        required: true,
                    })}
                />
                <input
                    className={classes.column}
                    type='number'
                    step={0.001}
                    {...register("h", {
                        required: true,
                    })}
                />
                <input
                    className={classes.column}
                    type='number'
                    step={0.001}
                    {...register("length", {
                        required: true,
                    })}
                />
                <input
                    className={classes.column}
                    type='number'
                    step={0.001}
                    {...register("s0", {
                        required: true,
                    })}
                />
                <input
                    className={classes.column}
                    type='number'
                    step={0.001}
                    {...register("s1", {
                        required: true,
                    })}
                />
                <input
                    className={classes.column}
                    type='number'
                    {...register("count", {
                        required: true,
                    })}
                />
                <select
                    {...register("boltId", {
                        required: true,
                    })}
                    className={classes["column-select"]}
                >
                    {bolts.map(b => (
                        <option key={b.id} value={b.id}>
                            {b.title}
                        </option>
                    ))}
                </select>
                {Object.keys(dirtyFields).length !== 0 ? (
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
