import React, { FC, useState } from "react"
import { Select } from "../../../../../components/UI/Select/Select"
import { ISizeResponse } from "../../../../types/sizes"
import { Table } from "./Table/Table"
import { IBolt } from "../../../../types/bolts"

type Props = {
    isNeedRow?: boolean
    sizes: ISizeResponse | undefined
    bolts: IBolt[] | undefined
}

export const Sizes: FC<Props> = ({ isNeedRow, sizes, bolts }) => {
    const [row, setRow] = useState("1")
    const changeRowHandler = (value: string) => setRow(value)

    if (!bolts) return null

    return (
        <div>
            {/* <p className={classes["content-title"]}>Размеры</p> */}
            {isNeedRow && (
                <Select value={row} onChange={changeRowHandler}>
                    <Select.Option value={"1"}>Ряд 1</Select.Option>
                    <Select.Option value={"2"}>Ряд 2</Select.Option>
                </Select>
            )}
            {row === "1" ? (
                <Table sizes={sizes?.sizeRow1} bolts={bolts} />
            ) : (
                <Table sizes={sizes?.sizeRow2} bolts={bolts} />
            )}
        </div>
    )
}
