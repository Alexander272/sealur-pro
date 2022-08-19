import React, { FC } from "react"
import { NewTableRow } from "./NewTableRow"
import { TableRow } from "./TableRow"
import classes from "../gasket.module.scss"

type Props = {
    scheme: {
        key: string
        title: string
    }[]
    data: any[]
    gasketId: string
    typeId: string
}

export const Table: FC<Props> = ({ scheme, data, gasketId, typeId }) => {
    const style = { gridTemplateColumns: `repeat(${scheme.length}, 1fr)` }

    return (
        <div className={classes["content-table"]}>
            <div className={classes["content-table__header"]} style={style}>
                {scheme.map(k => (
                    <p key={k.key} className={classes["content-table__column"]}>
                        {k.title}
                    </p>
                ))}
            </div>
            <div className={classes["content-table__body"]}>
                {data.map(d => (
                    <TableRow
                        key={d.id}
                        scheme={scheme}
                        data={d}
                        style={style}
                        gasketId={gasketId}
                    />
                ))}
            </div>
            <NewTableRow scheme={scheme} style={style} gasketId={gasketId} typeId={typeId} />
        </div>
    )
}
