import { FC, useContext } from "react"
import { ISnpForm } from "../../../../../../../types/snp"
import { MatContext } from "../../../../Context/MatContext"
import classes from "./excretion.module.scss"

type Props = {
    values: ISnpForm
}

export const Excretion: FC<Props> = ({ values }) => {
    const { isOpenFr, isOpenIr, isOpenOr } = useContext(MatContext)

    const createExcretion = (type: string, pos: string) => {
        let cl = type + pos
        if (values.typePr === "Д" || values.typePr === "Г") {
            return <div className={`${classes.type_e} ${classes[cl]}`}></div>
        } else {
            return <div className={`${classes.type_a} ${classes[cl]}`}></div>
        }
    }

    return (
        <>
            {isOpenIr && (
                <>
                    {createExcretion("ir", "Left")}
                    {createExcretion("ir", "Right")}
                </>
            )}
            {isOpenOr && (
                <>
                    {createExcretion("or", "Left")}
                    {createExcretion("or", "Right")}
                </>
            )}
            {isOpenFr && (
                <>
                    {createExcretion("fr", "Left")}
                    {createExcretion("fr", "Right")}
                </>
            )}
        </>
    )
}
