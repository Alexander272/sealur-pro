import React, { FC, useCallback, useState } from "react"
import { IStandart } from "../../../../types/standart"
import { Sizes } from "./Sizes"
import { StandartData } from "./StandartData"
import classes from "../standarts.module.scss"
import useSWR from "swr"
import { ISizeResponse } from "../../../../types/sizes"
import ReadService from "../../../../service/read"
import { IBolt } from "../../../../types/bolts"

type Props = {
    standart: IStandart | null
}

export const Content: FC<Props> = ({ standart }) => {
    const [isNeedRow, setIsNeedRow] = useState(standart?.isNeedRow || false)
    const changeIsNeedRowHandler = useCallback((isNeedRow: boolean) => setIsNeedRow(isNeedRow), [])

    const { data: sizes } = useSWR<{ data: ISizeResponse }>(
        standart?.id ? `/sealur-moment/flange-sizes?standartId=${standart?.id}` : null,
        ReadService.getData
    )
    const { data: bolts } = useSWR<{ data: IBolt[] }>(`/sealur-moment/bolts`, ReadService.getData)

    return (
        <div className={`${classes.content} scroll`}>
            <p className={classes["content-title"]}>{standart?.title}</p>
            {standart && <StandartData standart={standart} setIsNeedRow={changeIsNeedRowHandler} />}
            {standart && <Sizes isNeedRow={isNeedRow} sizes={sizes?.data} bolts={bolts?.data} />}
        </div>
    )
}
