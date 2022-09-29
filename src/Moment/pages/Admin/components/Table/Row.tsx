import React, { FC } from "react"
import classes from "./table.module.scss"

type Props = {
    gridTemplate?: string
}

export const Row: FC<Props> = ({ children, gridTemplate }) => {
    let gridStyle = { gridTemplateColumns: gridTemplate }

    if (gridTemplate)
        return (
            <div className={classes["table-row"]} style={gridStyle}>
                {children}
            </div>
        )

    return <div className={classes["table-row"]}>{children}</div>
}
