import React, { FC } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import AdminService from "../../../../service/admin"
import { IEnvType } from "../../../../types/env"
import classes from "../gasket.module.scss"

type Env = {
    id: string
    specificPres: number
    m: number
}

type Props = {
    isEnvData: boolean
    style: any
    type: IEnvType
    gasketId: string
    data: Env | undefined
}

export const EnvTableRow: FC<Props> = ({ style, type, gasketId, data }) => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { dirtyFields },
    } = useForm<Env>({
        defaultValues: data,
    })
    const { mutate } = useSWRConfig()

    const saveRowHandler = async (row: Env) => {
        let newData = {
            id: data?.id,
            envId: type.id,
            gasketId: gasketId,
            specificPres: +row.specificPres,
            m: +row.m,
        }
        console.log(newData)

        try {
            if (data?.id) {
                await AdminService.update(`/sealur-moment/env-data/${data.id}`, newData)
            } else {
                await AdminService.create("/sealur-moment/env-data/", newData)
            }

            mutate(`/sealur-moment/gasket/full-data?gasketId=${gasketId}`)
            reset({}, { keepDirty: false })
        } catch (error) {
            toast.error("Произошла ошибка")
        }
    }

    return (
        <form
            className={classes["content-table__row"]}
            style={style}
            onSubmit={handleSubmit(saveRowHandler)}
        >
            <input
                className={classes["content-table__column"]}
                type='number'
                step={0.001}
                {...register("specificPres", {
                    required: true,
                })}
            />
            <input
                className={classes["content-table__column"]}
                type='number'
                step={0.001}
                {...register("m", {
                    required: true,
                })}
            />
            <p className={classes["content-table__column"]}>{type.title}</p>

            {/* {Object.keys(dirtyFields).length !== 0 && isEnvData ? ( */}
            {Object.keys(dirtyFields).length !== 0 ? (
                <button type='submit' className={classes.icon}>
                    <img src='/image/save-icon.svg' alt='save' />
                </button>
            ) : null}
        </form>
    )
}
