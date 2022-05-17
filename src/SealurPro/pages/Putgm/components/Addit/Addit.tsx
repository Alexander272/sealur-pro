import { FC } from "react"
import { useSelector } from "react-redux"
import { ProState } from "../../../../store/store"
import { FileInput } from "../../../../../components/UI/FileInput/FileInput"
import { Cofiguration } from "./components/Configuration/Configuration"
import { Construction } from "./components/Construction/Construction"
import { Material } from "./components/Material/Material"
import classes from "../../../style/pages.module.scss"

type Props = {}

export const Addit: FC<Props> = () => {
    const isJumper = useSelector((state: ProState) => state.putgm.isJumper)
    const jumper = useSelector((state: ProState) => state.putgm.jumper)
    const isHole = useSelector((state: ProState) => state.putgm.isHole)
    const form = useSelector((state: ProState) => state.putgm.form)

    return (
        <div className={classes.sideContainer}>
            <Cofiguration />
            <Construction />
            <Material />
            <FileInput name='drawing' id='file' label='Прикрепить чертеж' />
            <div className={classes.message}>
                {/* //TODO добавить скрытие надписи при прикреплении чертежа */}
                {(isJumper && !["A", "M", "J"].includes(jumper)) || isHole || form === "Oval" ? (
                    <p className={classes.warn}>К заявке приложите файл с чертежом.</p>
                ) : null}
            </div>
        </div>
    )
}