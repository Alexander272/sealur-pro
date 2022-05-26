import React, { FC, useRef } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { ConfirmModal } from "../../../../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../../../../components/Modal/hooks/useModal"
import FileService from "../../../../../../../service/file"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IBasis, IPutgmImage } from "../../../../../../../types/putgm"
import classes from "./drawing.module.scss"

type Props = {}

export const Drawing: FC<Props> = () => {
    const putgmImage = useSelector((state: ProState) => state.putgm.putgmImage)
    const constructions = useSelector((state: ProState) => state.putgm.constructions)
    const form = useSelector((state: ProState) => state.putgm.form)

    const { putgm } = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()

    const b = useRef("")
    const o = useRef("")
    const s = useRef("")

    const uploadFile =
        (basis: string, obt: string, seal: string) =>
        async (event: React.ChangeEvent<HTMLInputElement>) => {
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
                    ? `/image/putgm/half/${files[0].name}`
                    : `/image/putgm/construction/${files[0].name}`

            const formData = new FormData()
            formData.append("drawing", files[0])

            formData.append("form", form)
            formData.append("gasket", `${basis}-${obt}-${seal}`)
            formData.append("url", imgUrl)

            try {
                const res = await FileService.create(formData, "/sealur-pro/putgm-image")

                const newImage: IPutgmImage[] = JSON.parse(JSON.stringify(putgmImage))
                newImage.push({
                    id: res.id || "",
                    form,
                    gasket: `${basis}-${obt}-${seal}`,
                    url: imgUrl,
                })
                putgm.setPutgmImage(newImage)

                const newCon: IBasis[] = JSON.parse(JSON.stringify(constructions))
                const idx = newCon.findIndex(c => c.basis === basis)
                const oIdx = newCon[idx].obturator.findIndex(o => o.obturator === obt)
                const sIdx = newCon[idx].obturator[oIdx].sealant.findIndex(s => s.seal === seal)
                newCon[idx].obturator[oIdx].sealant[sIdx].imageUrl = imgUrl
                putgm.setConstructions(newCon)
            } catch (error) {
                toast.error("Не удалось загрузить файл")
            }
        }

    const deleteFile = async (basis: string, obt: string, seal: string) => {
        const image = putgmImage.find(i => i.gasket === `${basis}-${obt}-${seal}`)

        let url = `/sealur-pro/putgm-image/${image?.id}?file=${image?.url.replace("/image/", "")}`

        try {
            await FileService.delete(url)

            let newImage: IPutgmImage[] = JSON.parse(JSON.stringify(putgmImage))
            newImage = newImage.filter(i => i.id !== image?.id)
            putgm.setPutgmImage(newImage)

            const newCon: IBasis[] = JSON.parse(JSON.stringify(constructions))
            const idx = newCon.findIndex(c => c.basis === basis)
            const oIdx = newCon[idx].obturator.findIndex(o => o.obturator === obt)
            const sIdx = newCon[idx].obturator[oIdx].sealant.findIndex(s => s.seal === seal)
            newCon[idx].obturator[oIdx].sealant[sIdx].imageUrl = ""
            putgm.setConstructions(newCon)
        } catch (error) {
            toast.error("Не удалось удалить файл")
        }
    }

    const openHandler = (basis: string, obt: string, seal: string) => () => {
        b.current = basis
        o.current = obt
        s.current = seal
        toggle()
    }

    const deleteHandler = async () => {
        await deleteFile(b.current, o.current, s.current)
        toggle()
    }

    const renderDrawing = () => {
        const drawings: JSX.Element[] = []
        constructions.forEach(con => {
            con.obturator.forEach(o => {
                o.sealant.forEach(s => {
                    drawings.push(
                        <p
                            key={`${con.basis}-${o.obturator}-${s.seal}`}
                            className={classes.listItem}
                        >
                            <span>
                                {con.basis}-{o.obturator}-{s.seal}:
                            </span>
                            {s.imageUrl !== "" ? (
                                <>
                                    <a
                                        href={s.imageUrl}
                                        className={classes.link}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        {s.imageUrl}
                                    </a>
                                    <span
                                        className={classes.times}
                                        onClick={openHandler(con.basis, o.obturator, s.seal)}
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
                                    onChange={uploadFile(con.basis, o.obturator, s.seal)}
                                />
                            )}
                        </p>
                    )
                })
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
