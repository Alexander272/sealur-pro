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
    standart: IStandart | null
}

export const Content: FC<Props> = ({ standart }) => {
    const [hasRows, setHasRows] = useState(standart?.isNeedRow || false)
    const changeHasRowsHandler = useCallback((hasRows: boolean) => setHasRows(hasRows), [])
    // const [isInch, setIsInch] = useState(standart?.isInch || false)
    // const changeIsIncgHandler = useCallback((isInch: boolean) => setIsInch(isInch), [])

    // const [openTab, setOpenTab] = useState<"size" | "bolt">("size")
    // const changeTabHandler = (type: string) => setOpenTab(type as "size")

    const { data: sizes } = useSWR<{ data: ISizeResponse }>(
        standart?.id ? `/sealur-moment/flange-sizes?standartId=${standart?.id}` : null,
        ReadService.getData
    )
    const { data: bolts } = useSWR<{ data: IBolt[] }>(`/sealur-moment/bolts`, ReadService.getData)

    return (
        <div className={`${classes.content} scroll`}>
            <p className={classes["content-title"]}>{standart?.title}</p>
            {standart && <StandartData standart={standart} setIsNeedRow={changeHasRowsHandler} />}

            {/* <div className={classes.tabs}>
                <Tabs initWidth={97} onClick={changeTabHandler}>
                    <p
                        className={`${classes.tab} ${
                            openTab === "size" ? classes["tab-active"] : ""
                        }`}
                        data-type='size'
                    >
                        Размеры
                    </p>
                    <p
                        className={`${classes.tab} ${
                            openTab === "bolt" ? classes["tab-active"] : ""
                        }`}
                        data-type='bolt'
                    >
                        Болты
                    </p>
                </Tabs>
            </div> */}

            {/* {openTab === "size" ? ( */}
            {sizes ? (
                <Sizes isNeedRow={hasRows} sizes={sizes.data} bolts={bolts?.data} />
            ) : (
                <Loader />
            )}
            {/* ) : null} */}
        </div>
    )
}
