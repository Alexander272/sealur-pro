import React, { FC } from "react"
import classes from "./res_line.module.scss"

type Props = {
    title: string
    imgUrl: string
    result: string | JSX.Element
    formula?: {
        designation: JSX.Element
        value: string | undefined
    }
    units?: string
}

export const ResLine: FC<Props> = ({ title, imgUrl, result, formula, units }) => {
    return (
        <div className={classes.container}>
            <p className={classes.title}>{title}</p>

            {formula?.value && (
                <p className={classes.formula}>
                    {formula.designation}={formula.value}
                </p>
            )}
            <div className={classes.result}>
                <img src={imgUrl} className={classes.image} alt='' />
                <p>{result}</p>
                <p>{units}</p>
            </div>
        </div>
    )
}
