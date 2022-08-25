import React, { FC, useState } from "react"
import { Select } from "../../../../../components/UI/Select/Select"
import { ISizeResponse } from "../../../../types/sizes"
import { Table } from "./Table/Table"
import { IBolt } from "../../../../types/bolts"
import classes from "../standarts.module.scss"

type Props = {
    isNeedRow?: boolean
    sizes: ISizeResponse | undefined
    bolts: IBolt[] | undefined
    standartId: string
}

export const Sizes: FC<Props> = ({ isNeedRow, sizes, bolts, standartId }) => {
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
            {row === 0 ? (
                <Table
                    sizes={sizes?.sizeRow1}
                    bolts={bolts || []}
                    standartId={standartId}
                    row={row}
                />
            ) : (
                <Table
                    sizes={sizes?.sizeRow2}
                    bolts={bolts || []}
                    standartId={standartId}
                    row={row}
                />
            )}
        </div>
    )
}
