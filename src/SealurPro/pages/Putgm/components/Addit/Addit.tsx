import { FC, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../../../store/store"
import { FileInput } from "../../../../../components/UI/FileInput/FileInput"
import { Cofiguration } from "./components/Configuration/Configuration"
import { Construction } from "./components/Construction/Construction"
import { Material } from "./components/Material/Material"
import classes from "../../../style/pages.module.scss"
import FileService from "../../../../service/file"

type Props = {}

export const Addit: FC<Props> = () => {
    const isJumper = useSelector((state: ProState) => state.putgm.isJumper)
    const jumper = useSelector((state: ProState) => state.putgm.jumper)
    const isHole = useSelector((state: ProState) => state.putgm.isHole)
    const form = useSelector((state: ProState) => state.putgm.form)

    const drawing = useSelector((state: ProState) => state.putgm.drawing)

    const { putgm } = useDispatch<Dispatch>()

    const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        console.log(event.target.files)

        const files = event.target.files

        if (!files) return

        const formData = new FormData()
        formData.append("drawing", files[0])
        try {
            await FileService.create(formData, "/files/drawings/")

            putgm.setDrawing(files[0].name)
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className={classes.sideContainer}>
            <Cofiguration />
            <Construction />
            <Material />
            <FileInput
                name='drawing'
                id='file'
                label={drawing || "Прикрепить чертеж"}
                onChange={uploadFile}
            />

            <div className={classes.message}>
                {!drawing &&
                ((isJumper && !["A", "M", "J"].includes(jumper)) || isHole || form === "Oval") ? (
                    <p className={classes.warn}>К заявке приложите файл с чертежом.</p>
                ) : null}
            </div>
        </div>
    )
}
