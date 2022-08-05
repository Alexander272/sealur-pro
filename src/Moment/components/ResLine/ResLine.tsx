import React, { FC } from "react"
import classes from "./res_line.module.scss"

type Props = {
    title?: string
    imgUrl?: string
    imgText?: JSX.Element
    result: string | JSX.Element
    resBold?: boolean
    formula?: {
        designation?: JSX.Element
        value: string | undefined
    }
    units?: string
}

export const ResLine: FC<Props> = ({ title, imgUrl, imgText, result, resBold, formula, units }) => {
    return (
        <div className={classes.container}>
            {title && <p className={classes.title}>{title}</p>}

            {formula?.value &&
                (formula.designation ? (
                    <p className={classes.formula}>
                        {formula.designation}={formula.value}
                    </p>
                ) : (
                    <p className={classes.formula}>{formula.value}</p>
                ))}
            <div className={classes.result}>
                {imgUrl ? (
                    <img src={imgUrl} className={classes.image} alt='' />
                ) : (
                    <p className={classes.image}>{imgText}</p>
                )}
                <p>{resBold ? <b>{result}</b> : result}</p>
                <p>{units}</p>
            </div>
        </div>
    )
}
