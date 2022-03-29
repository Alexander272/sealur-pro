import { FC } from "react"
import { useSelector } from "react-redux"
import { ProState } from "../../../../store/store"
import { Constuction } from "./Components/Construction/Constuction"
import { Fillers } from "./Components/Fillers/Fillers"
import { Material } from "./Components/Materials/Materials"
import { FileInput } from "../../../../../components/UI/FileInput/FileInput"
import classes from "../../../style/pages.module.scss"

type Props = {}

export const AdditSnp: FC<Props> = () => {
    const isJumper = useSelector((state: ProState) => state.snp.isJumper)
    const jumper = useSelector((state: ProState) => state.snp.jumper)
    const isHole = useSelector((state: ProState) => state.snp.isHole)

    return (
        <div className={classes.sideContainer}>
            <Fillers />
            <Constuction />
            <Material />

            <FileInput name='drawing' id='file' label='Прикрепить чертеж' />
            <div className={classes.message}>
                {(isJumper && !["A", "M", "J"].includes(jumper)) || isHole ? (
                    <p className={classes.warn}>К заявке приложите файл с чертежом.</p>
                ) : null}
            </div>
        </div>
    )
}
