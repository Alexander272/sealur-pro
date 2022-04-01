import { FC } from "react"
import { Cofiguration } from "./components/Cofiguration/Cofiguration"
import { Construction } from "./components/Construction/Construction"
import { Material } from "./components/Material/Material"
import classes from "../../../style/pages.module.scss"

type Props = {}

export const Addit: FC<Props> = () => {
    return (
        <div className={classes.sideContainer}>
            <Cofiguration />
            <Construction />
            <Material />
        </div>
    )
}
