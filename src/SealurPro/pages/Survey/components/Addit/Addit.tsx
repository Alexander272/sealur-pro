import { ChangeEvent, FC } from "react"
import { FileInput } from "../../../../../components/UI/FileInput/FileInput"
import { Textarea } from "../../../../../components/UI/Input/Textarea"
import { Def } from "./components/Def/Def"
import { Mater } from "./components/Mater/Mater"
import classes from "../../survey.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../../../store/store"
import { IDrawing } from "../../../../types/drawing"
import FileService from "../../../../service/file"
import { toast } from "react-toastify"
import { FileDownload } from "../../../../../components/UI/FileInput/FileDownload"

type Props = {}

export const Addit: FC<Props> = () => {
    const info = useSelector((state: ProState) => state.survey.info)

    const drawing = useSelector((state: ProState) => state.survey.drawing)

    const { survey } = useDispatch<Dispatch>()

    const changeInfoHandler = (event: ChangeEvent<HTMLTextAreaElement>) => {
        survey.setInfo(event.target.value)
    }

    const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return

        const formData = new FormData()
        formData.append("drawing", files[0])
        formData.append("group", "interview")

        try {
            const res: IDrawing = await FileService.create(formData, "/files/drawings/pro/")
            survey.setDrawing(res)
        } catch (error) {
            console.log(error)
            toast.error("Не удалось загрузить файл")
        }
    }

    const deleteFile = async () => {
        try {
            await FileService.delete(
                `/files/drawings/pro/${drawing?.group}/${drawing?.id}/${drawing?.origName}`
            )
            survey.setDrawing(null)
        } catch (error) {
            console.log(error)
            toast.error("Не удалось удалить файл")
        }
    }

    return (
        <div className={`${classes.container} ${classes.block4}`}>
            <p className={classes.title}>Дополнительные сведения</p>
            <div className={classes.inline}>
                <Mater />
                <Def />
            </div>
            <div className={classes.inline}>
                <p className={classes.fb50}>Дополнительная информация</p>

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
            </div>
            <Textarea name='info' rows={4} value={info} onChange={changeInfoHandler} />
        </div>
    )
}
