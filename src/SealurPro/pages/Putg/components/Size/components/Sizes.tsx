import { FC, useEffect, useState } from "react"
import classes from "./sizes.module.scss"

type Props = {
    d1: string
    d2: string
    d3: string
    d4: string
}

const list = {
    def: "two",
    sec: "three_one",
    th: "three_two",
    for: "four",
}

export const Sizes: FC<Props> = ({ d1, d2, d3, d4 }) => {
    const [type, setType] = useState<"def" | "sec" | "th" | "for">("def")

    useEffect(() => {
        if (d1 !== "0" && d4 !== "0") setType("for")
        else if (d1 !== "0" || d4 !== "0") {
            if (d1 !== "0") setType("sec")
            else setType("th")
        } else setType("def")
    }, [d1, d4])

    return (
        <>
            <p className={`${classes.sizes} ${classes[list[type as "sec"]]} ${classes.d1}`}>
                {d1} <span className={classes.d}>(D1)</span>
            </p>
            <p className={`${classes.sizes} ${classes[list[type as "def"]]} ${classes.d2}`}>
                {d2} <span className={`${classes.d}`}>(D2)</span>
            </p>
            <p className={`${classes.sizes} ${classes[list[type as "def"]]} ${classes.d3}`}>
                {d3} <span className={classes.d}>(D3)</span>
            </p>
            <p className={`${classes.sizes} ${classes[list[type as "sec"]]} ${classes.d4}`}>
                {d4} <span className={classes.d}>(D4)</span>
            </p>
        </>
    )
}
