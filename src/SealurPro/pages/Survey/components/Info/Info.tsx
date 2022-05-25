import { FC } from "react"
import { Equipment } from "./components/Equip/Equip"
import { Person } from "./components/Person/Person"
import classes from "../../survey.module.scss"

type Props = {}

export const Info: FC<Props> = () => {
    return (
        <div className={`${classes.container} ${classes.block1}`}>
            <Person />
            <Equipment />
        </div>
    )
}
