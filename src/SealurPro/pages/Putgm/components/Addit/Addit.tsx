import { FC } from "react"
import { toast } from "react-toastify"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../../../store/store"
import { IDrawing } from "../../../../types/drawing"
import FileService from "../../../../service/file"
import { FileInput } from "../../../../../components/UI/FileInput/FileInput"
import { Cofiguration } from "./components/Configuration/Configuration"
import { Construction } from "./components/Construction/Construction"
import { Material } from "./components/Material/Material"
import classes from "../../../style/pages.module.scss"
import { FileDownload } from "../../../../../components/UI/FileInput/FileDownload"

type Props = {}

export const Addit: FC<Props> = () => {
    const isJumper = useSelector((state: ProState) => state.putgm.isJumper)
    const jumper = useSelector((state: ProState) => state.putgm.jumper)
    const isHole = useSelector((state: ProState) => state.putgm.isHole)
    const form = useSelector((state: ProState) => state.putgm.form)

    const drawing = useSelector((state: ProState) => state.putgm.drawing)
    const orderId = useSelector((state: ProState) => state.list.orderId)

    const { putgm, list } = useDispatch<Dispatch>()

    const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return

        const formData = new FormData()
        formData.append("drawing", files[0])
        formData.append("group", orderId)

        try {
            const res: IDrawing = await FileService.create(formData, "/files/drawings/")
            putgm.setDrawing(res)
            if (orderId === "") {
                list.setOrderId(res.group)
            }
        } catch (error) {
            console.log(error)
            toast.error("Не удалось загрузить файл")
        }
    }

    const downloadFile = async () => {
        try {
            await FileService.get(
                `/files/drawings/${drawing?.origName}?id=${drawing?.id}&group=${drawing?.group}`
            )
        } catch (error) {
            console.log(error)
            toast.error("Не удалось получить файл")
        }
    }

    const deleteFile = async () => {
        try {
            await FileService.delete(
                `/files/drawings/${drawing?.origName}?id=${drawing?.id}&group=${drawing?.group}`
            )
            putgm.setDrawing(null)
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
                    onSave={downloadFile}
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
