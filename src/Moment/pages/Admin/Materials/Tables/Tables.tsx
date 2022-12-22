import React, { FC } from "react"
import useSWR from "swr"
import ReadService from "../../../../service/read"
import { IAlpha, IElasticity, IFullMaterial, IVoltage } from "../../../../types/materials"
import { Loader } from "../../../../../components/UI/Loader/Loader"
import { MaterialTable } from "./MaterialTable"
import classes from "../materials.module.scss"

type Props = {
    material: IFullMaterial | null
}

export const Tables: FC<Props> = ({ material }) => {
    const { data } = useSWR<{
        data: { alpha: IAlpha[]; elasticity: IElasticity[]; voltage: IVoltage[] }
    }>(material ? `/sealur-moment/materials/${material.id}` : null, ReadService.getData)

    if (!data || !material)
        return (
            <div className={`${classes.tables} scroll`}>
                <Loader />
            </div>
        )

    return (
        <div className={`${classes.tables} scroll`}>
            <p className={classes["tables-title"]}>{material?.title}</p>
            <div className={classes["tables-content"]}>
                <MaterialTable
                    title='Модуль упругости'
                    field='elasticity'
                    materialId={material.id}
                    data={data?.data.elasticity || []}
                />
                <MaterialTable
                    title='Коэффициент линейного расширения'
                    field='alpha'
                    materialId={material.id}
                    data={data?.data.alpha || []}
                />
                <MaterialTable
                    title='Номинальное допускаемое напряжение для болтов (шпилек)'
                    field='voltage'
                    data={data?.data.voltage || []}
                    materialId={material.id}
                />
            </div>
        </div>
    )
}
