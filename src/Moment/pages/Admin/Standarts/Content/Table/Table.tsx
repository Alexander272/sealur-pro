import React, { FC } from "react"
import { IFullSize } from "../../../../../types/sizes"
// import { NewTableRows } from "./NewTableRows"
import { TableRow } from "./TableRow"
import { IBolt } from "../../../../../types/bolts"
import classes from "../../standarts.module.scss"

type Props = {
    sizes: IFullSize[] | undefined
    bolts: IBolt[]
}

export const Table: FC<Props> = ({ sizes, bolts }) => {
    return (
        <div className={classes.table}>
            <div className={classes["table-header"]}>
                <p className={classes.column}>Pn</p>
                <p className={classes.column}>
                    D<sub>н</sub>
                </p>
                <p className={classes.column}>D</p>
                <p className={classes.column}>
                    D<sub>6</sub>
                </p>
                <p className={classes.column}>h</p>
                <p className={classes.column}>l</p>
                <p className={classes.column}>S0</p>
                <p className={classes.column}>S1</p>
                <p className={classes.column}>количество</p>
                <p className={classes.column}>диаметр</p>
            </div>
            {sizes && sizes.map(s => <TableRow key={s.id} size={s} bolts={bolts} />)}
            {/* <NewTableRows field={field} materialId={materialId} /> */}
        </div>
    )
}
