import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import AdminService from "../../../../service/admin"
import classes from "../gasket.module.scss"

type Props = {
    scheme: {
        key: string
        title: string
    }[]
    data: any
    style: any
    gasketId: string
}

export const TableRow: FC<Props> = ({ scheme, data, style, gasketId }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { dirtyFields },
    } = useForm({
        defaultValues: data,
    })
    const { mutate } = useSWRConfig()
    const { toggle, isOpen } = useModal()

    const saveHandler = async (row: any) => {
        let newData: any = {
            id: data.id,
        }
        scheme.forEach(s => {
            newData[s.key] = +row[s.key]
        })

        try {
            await AdminService.update(`/sealur-moment/gasket-data/${data.id}`, newData)
            mutate(`/sealur-moment/gasket/full-data?gasketId=${gasketId}`)
            reset({}, { keepDirty: false })
        } catch (error) {
            toast.error("Произошла ошибка")
        }
    }

    const deleteHandler = async () => {
        try {
            await AdminService.delete(`/sealur-moment/gasket-data/${data.id}`)
            mutate(`/sealur-moment/gasket/full-data?gasketId=${gasketId}`)
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
            <form
                key={data.id}
                className={classes["content-table__row"]}
                style={style}
                onSubmit={handleSubmit(saveHandler)}
            >
                {scheme.map(k => (
                    <input
                        key={data.id + k.key}
                        className={classes["content-table__column"]}
                        type='number'
                        step={0.001}
                        {...register(k.key, {
                            required: true,
                        })}
                    />
                ))}
                {Object.keys(dirtyFields).length !== 0 ? (
                    <button type='submit' className={classes.icon}>
                        <img src='/image/save-icon.svg' alt='save' />
                    </button>
                ) : (
                    <button
                        className={classes["icon-delete"]}
                        type='button'
                        onClick={openModalHandler}
                    >
                        &times;
                    </button>
                )}
            </form>
        </>
    )
}
