import { FC, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { ConfirmModal } from "../../../../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../../../../components/Modal/hooks/useModal"
import FileService from "../../../../../../../service/file"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IConstruction, IPutgImage } from "../../../../../../../types/putg"
import classes from "./drawing.module.scss"

type Props = {}

export const Drawing: FC<Props> = () => {
    const constructions = useSelector((state: ProState) => state.putg.constructions)
    const form = useSelector((state: ProState) => state.putg.form)
    const putgImage = useSelector((state: ProState) => state.putg.putgImage)

    const { putg } = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()

    const c = useRef("")
    const o = useRef("")

    const uploadFile =
        (con: string, obt: string) => async (event: React.ChangeEvent<HTMLInputElement>) => {
            const files = event.target.files
            if (!files) return

            if (files[0].type !== "image/webp") {
                toast.error("Нужно выбрать файл с расширением WEBP")
                event.target.files = null
                event.target.value = ""
                return
            }

            const imgUrl =
                form !== "Round"
                    ? `/image/putg/half/${files[0].name}`
                    : `/image/putg/construction/${files[0].name}`

            const formData = new FormData()
            formData.append("drawing", files[0])

            formData.append("form", form)
            formData.append("gasket", `${con}-${obt}`)
            formData.append("url", imgUrl)

            try {
                const res = await FileService.create(formData, "/sealur-pro/putg-image")

                const newImage: IPutgImage[] = JSON.parse(JSON.stringify(putgImage))
                newImage.push({
                    id: res.id || "",
                    form,
                    gasket: `${con}-${obt}`,
                    url: imgUrl,
                })
                putg.setPutgImage(newImage)

                const newCon: IConstruction[] = JSON.parse(JSON.stringify(constructions))
                const idx = newCon.findIndex(c => c.short === con)
                const oIdx = newCon[idx].obturators.findIndex(o => o.short === obt)
                newCon[idx].obturators[oIdx].imageUrl = imgUrl
                putg.setConstructions(newCon)
            } catch (error) {
                toast.error("Не удалось загрузить файл")
            }
        }

    const deleteFile = async (con: string, obt: string) => {
        const image = putgImage.find(i => i.gasket === `${con}-${obt}`)
        let url = `/sealur-pro/putg-image/${image?.id}?file=${image?.url.replace("/image/", "")}`
        try {
            await FileService.delete(url)

            let newImage: IPutgImage[] = JSON.parse(JSON.stringify(putgImage))
            newImage = newImage.filter(i => i.id !== image?.id)
            putg.setPutgImage(newImage)

            const newCon: IConstruction[] = JSON.parse(JSON.stringify(constructions))
            const idx = newCon.findIndex(c => c.short === con)
            const oIdx = newCon[idx].obturators.findIndex(o => o.short === obt)
            newCon[idx].obturators[oIdx].imageUrl = ""
            putg.setConstructions(newCon)
        } catch (error) {
            toast.error("Не удалось удалить файл")
        }
    }

    const openHandler = (con: string, obt: string) => () => {
        c.current = con
        o.current = obt
        toggle()
    }

    const deleteHandler = async () => {
        await deleteFile(c.current, o.current)
        toggle()
    }

    const renderDrawing = () => {
        const drawings: JSX.Element[] = []
        constructions.forEach(con => {
            con.obturators.forEach(o => {
                drawings.push(
                    <p key={`${con.short}-${o.short}`} className={classes.listItem}>
                        <span>
                            {con.short}-{o.short}:
                        </span>
                        {o.imageUrl !== "" ? (
                            <>
                                <a
                                    href={o.imageUrl}
                                    className={classes.link}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {o.imageUrl}
                                </a>
                                <span
                                    className={classes.times}
                                    onClick={openHandler(con.short, o.short)}
                                >
                                    &times;
                                </span>
                            </>
                        ) : (
                            <input
                                name='drawing'
                                type='file'
                                id='file'
                                className={classes.choose}
                                onChange={uploadFile(con.short, o.short)}
                            />
                        )}
                    </p>
                )
            })
        })

        return drawings
    }

    return (
        <>
            <ConfirmModal
                title='Удалить изображение?'
                isOpen={isOpen}
                toggle={toggle}
                cancelHandler={toggle}
                confirmHandler={deleteHandler}
            />
            <div className={`${classes.list} scroll`}>{renderDrawing()}</div>
        </>
    )
}
