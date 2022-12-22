import React, { FC } from "react"
import classes from "./table.module.scss"

type Props = {}

export const Ceil: FC<Props> = ({ children }) => {
    return <div className={classes["table-ceil"]}>{children}</div>
}
