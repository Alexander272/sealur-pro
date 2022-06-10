import { FC } from "react"
import { ISizeInt } from "../../../../../../../../types/survey"
import classes from "./sizes.module.scss"

const types = {
    1: "type_a",
    2: "type_b",
    3: "type_c",
}

type Props = {
    size: ISizeInt
    typeFl: string
}

export const Sizes: FC<Props> = ({ size, typeFl }) => {
    return (
        <>
            <p className={`${classes.sizes} ${classes[types[typeFl as "1"]]} ${classes.d2}`}>
                {size.d2}
            </p>
            <p className={`${classes.sizes} ${classes.d1}`}>{size.d1}</p>
            <p className={`${classes.sizes} ${classes.dup}`}>{size.dUp}</p>
            <p className={`${classes.sizes} ${classes[types[typeFl as "1"]]} ${classes.d}`}>
                {size.d}
            </p>
            <p className={`${classes.sizes} ${classes[types[typeFl as "1"]]} ${classes.h1}`}>
                {size.h1}
            </p>
            <p className={`${classes.sizes} ${classes[types[typeFl as "1"]]} ${classes.h2}`}>
                {size.h2}
            </p>
        </>
    )
}
