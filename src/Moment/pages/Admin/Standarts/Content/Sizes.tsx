import React, { FC, useState } from "react"
import { ISizeResponse } from "../../../../types/sizes"
import { IBolt } from "../../../../types/bolts"
import { Select } from "../../../../../components/UI/Select/Select"
import { SizeTable } from "./Table/SizeTable"
import classes from "../standarts.module.scss"

type Props = {
    isNeedRow?: boolean
    sizes: ISizeResponse | undefined
    bolts: IBolt[] | undefined
    standartId: string
    isInch: boolean
}

export const Sizes: FC<Props> = ({ isNeedRow, sizes, bolts, standartId, isInch }) => {
    const [row, setRow] = useState<0 | 1>(0)
    const changeRowHandler = (value: 0 | 1) => setRow(value)

    return (
        <div>
            <p className={classes["content-title"]}>Размеры</p>
            {isNeedRow && (
                <Select value={row} onChange={changeRowHandler}>
                    <Select.Option value={0}>Ряд 1</Select.Option>
                    <Select.Option value={1}>Ряд 2</Select.Option>
                </Select>
            )}
            <SizeTable
                sizes={row === 0 ? sizes?.sizeRow1 : sizes?.sizeRow2}
                bolts={bolts || []}
                standartId={standartId}
                row={row}
                isInch={isInch}
            />
        </div>
    )
}
