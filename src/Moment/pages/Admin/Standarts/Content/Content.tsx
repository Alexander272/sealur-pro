import React, { FC, useCallback, useState } from "react"
import useSWR from "swr"
import { IStandart } from "../../../../types/standart"
import { ISizeResponse } from "../../../../types/sizes"
import { IBolt } from "../../../../types/bolts"
import ReadService from "../../../../service/read"
import { Loader } from "../../../../../components/UI/Loader/Loader"
import { StandartData } from "./StandartData"
import { Sizes } from "./Sizes"
import classes from "../standarts.module.scss"

type Props = {
    typeId: string
    standart: IStandart | null
}

export const Content: FC<Props> = ({ typeId, standart }) => {
    const [hasRows, setHasRows] = useState(standart?.isNeedRow || false)
    const changeHasRowsHandler = useCallback((hasRows: boolean) => setHasRows(hasRows), [])
    const [isInch, setIsInch] = useState(standart?.isInch || false)
    const changeIsInchHandler = useCallback((isInch: boolean) => setIsInch(isInch), [])

    const { data: sizes } = useSWR<{ data: ISizeResponse }>(
        standart?.id ? `/sealur-moment/flange-sizes?standartId=${standart?.id}` : null,
        ReadService.getData
    )
    const { data: bolts } = useSWR<{ data: IBolt[] }>(
        `/sealur-moment/bolts?isInch=${isInch || false}`,
        ReadService.getData
    )

    return (
        <div className={`${classes.content} scroll`}>
            <p className={classes["content-title"]}>{standart?.title}</p>
            {standart && (
                <StandartData
                    typeId={typeId}
                    standart={standart}
                    hasEmptySise={!sizes?.data.sizeRow1}
                    setIsNeedRow={changeHasRowsHandler}
                    setIsInch={changeIsInchHandler}
                />
            )}

            {sizes ? (
                <Sizes
                    isNeedRow={hasRows}
                    sizes={sizes.data}
                    bolts={bolts?.data}
                    standartId={standart?.id || ""}
                />
            ) : (
                <Loader />
            )}
        </div>
    )
}
