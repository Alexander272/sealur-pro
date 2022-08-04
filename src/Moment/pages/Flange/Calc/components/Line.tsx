import React, { FC } from "react"
import classes from "../../../styles/page.module.scss"

type Props = {
    title: string
    designation?: JSX.Element
    res: string | JSX.Element
    units?: string
    full?: boolean
}

export const Line: FC<Props> = ({ title, designation, res, units, full }) => {
    return (
        <div className={`${classes.line} ${classes["dif-line"]}`}>
            <p>{title}</p>
            {designation && <p>{designation}</p>}
            {full ? (
                <p className={classes["line-full"]}>{res}</p>
            ) : (
                <p className={!units ? classes["line-field"] : ""}>{res}</p>
            )}
            {units && <p>{units}</p>}
        </div>
    )
}
