import React, { FC } from "react"
import classes from "./table.module.scss"

type Props = {
    stickyHeader?: boolean
}

export const Head: FC<Props> = ({ children, stickyHeader }) => {
    return (
        <div
            className={`${classes["table-header"]} ${
                stickyHeader ? classes["table-header--sticky"] : ""
            }`}
        >
            {children}
        </div>
    )
}
