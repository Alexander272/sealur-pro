import React, { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Dispatch, ProState } from "../../../../store/store"
import { FileInput } from "../../../../../components/UI/FileInput/FileInput"
import { FileDownload } from "../../../../../components/UI/FileInput/FileDownload"
import { Cofiguration } from "./components/Cofiguration/Cofiguration"
import { Construction } from "./components/Construction/Construction"
import { Material } from "./components/Material/Material"
import FileService from "../../../../service/file"
import { IDrawing } from "../../../../types/drawing"
import classes from "../../../style/pages.module.scss"

type Props = {}

export const Addit: FC<Props> = () => {
    const isJumper = useSelector((state: ProState) => state.putg.isJumper)
    const jumper = useSelector((state: ProState) => state.putg.jumper)
    const isHole = useSelector((state: ProState) => state.putg.isHole)
    const form = useSelector((state: ProState) => state.putg.form)

    const drawing = useSelector((state: ProState) => state.putgm.drawing)
    const orderId = useSelector((state: ProState) => state.list.orderId)

    const { putg, list } = useDispatch<Dispatch>()

    const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return

        const formData = new FormData()
        formData.append("drawing", files[0])
        formData.append("group", orderId)

        try {
            const res: IDrawing = await FileService.create(formData, "/files/drawings/pro")
            putg.setDrawing(res)
            if (orderId === "") {
                list.setOrderId(res.group)
            }
        } catch (error) {
            console.log(error)
            toast.error("Не удалось загрузить файл")
        }
    }

    const deleteFile = async () => {
        try {
            await FileService.delete(
                `/files/drawings/${drawing?.origName}?id=${drawing?.id}&group=${drawing?.group}`
            )
            putg.setDrawing(null)
        } catch (error) {
            console.log(error)
            toast.error("Не удалось удалить файл")
        }
    }

    return (
        <div className={classes.sideContainer}>
            <Cofiguration />
            <Construction />
            <Material />

            {drawing ? (
                <FileDownload
                    text={drawing.origName}
                    name='drawing'
                    link={drawing.link}
                    onDelete={deleteFile}
                />
            ) : (
                <FileInput
                    name='drawing'
                    id='file'
                    label={"Прикрепить чертеж"}
                    onChange={uploadFile}
                />
            )}

            <div className={classes.message}>
                {!drawing &&
                ((isJumper && !["A", "M", "J"].includes(jumper)) || isHole || form === "Oval") ? (
                    <p className={classes.warn}>К заявке приложите файл с чертежом.</p>
                ) : null}
            </div>
        </div>
    )
}
