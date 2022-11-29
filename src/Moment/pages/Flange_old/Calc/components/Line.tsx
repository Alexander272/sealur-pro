import React, { FC } from "react"
import classes from "../../../styles/result.module.scss"

type Props = {
    title: string
    designation?: JSX.Element
    res: string | JSX.Element
    units?: string
    full?: boolean
}

export const Line: FC<Props> = ({ title, designation, res, units, full }) => {
    return (
        <div className={classes.line}>
            <p>{title}</p>
            <div className={classes["line-result"]}>
                {designation && <p>{designation}</p>}
                {full ? (
                    <p className={classes["line-full"]}>{res}</p>
                ) : (
                    <p className={!units && !designation ? classes["line-field"] : ""}>{res}</p>
                )}
                {units && <p>{units}</p>}
            </div>
        </div>
    )
}
