import React, { FC } from "react"
import { IBolt } from "../../../../types/bolts"
import { TableRow } from "./TableRow"
import classes from "../bolts.module.scss"
import { NewTableRow } from "./NewTableRow"

type Props = {
    title: string
    bolts: IBolt[] | undefined
    isInch: boolean
}

export const Table: FC<Props> = ({ title, bolts, isInch }) => {
    return (
        <div className={classes.table}>
            <p className={classes["table-title"]}>{title}</p>

            <div className={classes["table-header"]}>
                <p className={classes.column}>Название</p>
                <p className={classes.column}>Диаметр</p>
                <p className={classes.column}>Площадь</p>
            </div>

            {bolts && bolts.map(b => <TableRow key={b.id} bolt={b} isInch={isInch} />)}

            <NewTableRow isInch={isInch} />
        </div>
    )
}
