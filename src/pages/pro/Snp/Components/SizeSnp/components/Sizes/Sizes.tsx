import { FC } from "react"
import { ISnpForm } from "../../../../../../../types/snp"
import classes from "./sizes.module.scss"

type Props = {
    values: ISnpForm
}

const type = {
    Д: "type_d",
    Г: "type_g",
    В: "type_v",
    Б: "type_b",
    А: "type_a",
}

export const Sizes: FC<Props> = ({ values }) => {
    return (
        <>
            <p className={`${classes.sizes} ${classes[type[values.typePr as "Д"]]} ${classes.h}`}>
                {values.h !== "др." ? values.h : values.oh}
            </p>
            <p className={`${classes.sizes} ${classes[type[values.typePr as "Д"]]} ${classes.s2}`}>
                {values.s2}
            </p>
            <p className={`${classes.sizes} ${classes[type[values.typePr as "Д"]]} ${classes.s3}`}>
                {values.s3}
            </p>
            <p className={`${classes.sizes} ${classes[type[values.typePr as "Д"]]} ${classes.d1}`}>
                {values.d1} <span className={classes.d}>(D1)</span>
            </p>
            <p className={`${classes.sizes} ${classes[type[values.typePr as "Д"]]} ${classes.d2}`}>
                {values.d2}{" "}
                <span
                    className={`${classes.d} ${
                        ["1", "2"].includes(values.st) ? classes.d_active : ""
                    }`}
                >
                    (D2)
                </span>
            </p>
            <p className={`${classes.sizes} ${classes[type[values.typePr as "Д"]]} ${classes.d3}`}>
                {values.d3} <span className={classes.d}>(D3)</span>
            </p>
            <p className={`${classes.sizes} ${classes[type[values.typePr as "Д"]]} ${classes.d4}`}>
                {values.d4} <span className={classes.d}>(D4)</span>
            </p>
        </>
    )
}
