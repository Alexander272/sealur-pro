import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import AdditService from "../../service/addit"
import { Dispatch, ProState } from "../../store/store"
import { IAddit, IFiller } from "../../types/addit"
import { useModal } from "../../../components/Modal/hooks/useModal"
import { Modal } from "../../../components/Modal/Modal"
import { Button } from "../../../components/UI/Button/Button"
import { Checkbox } from "../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../components/UI/Input/Input"
import classes from "./filler.module.scss"

type Props = {
    filler: string
    fillers: string
    sendHandler: () => void
    clickHandler: (filler: string, fillers: string) => void
    changeHandler: (fillers: string, selected: boolean) => void
}

export const AdminFiller: FC<Props> = ({
    fillers,
    filler,
    sendHandler,
    clickHandler,
    changeHandler,
}) => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const dispatch = useDispatch<Dispatch>()

    const [data, setData] = useState<IFiller | null>(null)

    const { isOpen, toggle } = useModal()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IFiller>()

    // TODO исправить
    const deleteHandler = async () => {
        if (!addit || !data) return
        // let fils = addit?.fillers.split(";") || []
        // fils = fils.filter(f => f !== `${data.short}@${data.title}@${data.description}`)
        // console.log(fils)

        try {
            // sendHandler()
            // await AdditService.updateFillers(addit.id, fils.join(";"), "delete", data.short)
            // let add: IAddit = {} as IAddit
            // Object.assign(add, addit, { fillers: fils.join(";") })
            // dispatch.addit.setAddit(add)
            // toast.success("Успешно удалено")
            // toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            sendHandler()
        }
    }

    const submitHandler = async (form: any) => {
        if (!addit) return
        // let fils = addit.fillers.split(";") || []
        // if (!data) {
        //     fils?.push(`${form.short}@${form.title}@${form.description}`)
        // } else {
        //     fils = fils?.map(f => {
        //         if (f === `${data.short}@${data.title}@${data.description}`)
        //             return `${form.short}@${form.title}@${form.description}`
        //         return f
        //     })
        // }

        try {
            sendHandler()
            // await AdditService.updateFillers(
            //     addit.id,
            //     fils.join(";"),
            //     data ? "update" : "add",
            //     data ? "" : form.short
            // )
            // let add: IAddit = {} as IAddit
            // Object.assign(add, addit, { fillers: fils.join(";") })
            // dispatch.addit.setAddit(add)
            // toast.success(data ? "Успешно обновлено" : "Успешно создано")
            // toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            sendHandler()
        }
    }

    const openFillerHandler = () => {
        setData(null)
        setValue("short", "")
        setValue("title", "")
        setValue("description", "")
        toggle()
    }
    const updateFillerHandler = (filler: string) => () => {
        const parts = filler.split("@")
        setData({ short: parts[0], title: parts[1], description: parts[2] })
        setValue("short", parts[0])
        setValue("title", parts[1])
        setValue("description", parts[2])
        toggle()
    }

    const changeFiller = (id: string) => {
        let tmp = fillers.split(";") || []
        if (tmp[0] === "") tmp = []
        const cur = tmp.find(f => f.split("&")[0] === id)
        if (cur) {
            tmp = tmp.filter(f => f.split("&")[0] !== id)
        } else {
            tmp.push(`${id}&`)
        }

        return { fillers: tmp.join(";"), selected: id === filler }
    }

    const changeFillerHandler = (filler: string) => () => {
        const newFil = changeFiller(filler)
        changeHandler(newFil.fillers, newFil.selected)
    }

    const fillerHandler = (filler: string) => () => {
        let fil = fillers.split(";").find(f => f.split("&")[0] === filler) || ""
        let newFillers = ""
        if (!fil) {
            newFillers = changeFiller(filler).fillers
            const tmp = newFillers.split(";")
            fil = tmp[tmp.length - 1]
        }

        clickHandler(fil, newFillers)
    }

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle}>
                <Modal.Header title={!data ? "Добавить" : "Редактировать"} onClose={toggle} />
                <Modal.Content>
                    <form className={classes.form}>
                        <Input
                            name='short'
                            label='Короткое обозначение'
                            placeholder='3'
                            register={register}
                            rule={{ required: true }}
                            error={errors.short}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='title'
                            label='Название'
                            placeholder='F.G - ТРГ (агрессивные среды)'
                            register={register}
                            rule={{ required: true }}
                            error={errors.title}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='description'
                            label='Для описания'
                            placeholder='ТРГ (FG)'
                            register={register}
                            rule={{ required: true }}
                            error={errors.description}
                            errorText='Поле не заполнено'
                        />
                    </form>
                </Modal.Content>
                <Modal.Footer>
                    <Button variant='grayPrimary' fullWidth onClick={toggle}>
                        Отмена
                    </Button>
                    <p className={classes.offset} />
                    {data ? (
                        <>
                            <Button variant='danger' fullWidth onClick={deleteHandler}>
                                Удалить
                            </Button>
                            <p className={classes.offset} />
                        </>
                    ) : null}
                    <Button fullWidth onClick={handleSubmit(submitHandler)}>
                        {data ? "Сохранить" : "Добавить"}
                    </Button>
                </Modal.Footer>
            </Modal>
            <p className={classes.add} onClick={openFillerHandler}>
                Добавить
            </p>
            <div className={`${classes.list} scroll`}>
                {/* {addit?.fillers.split(";").map(fil => {
                    const parts = fil.split("@")

                    const f = fillers.split(";").find(f => f.split("&")[0] === parts[0])

                    return (
                        <div key={parts[0]} className={classes.listItem}>
                            <Checkbox
                                name={parts[1]}
                                id={parts[1]}
                                checked={!!f}
                                onChange={changeFillerHandler(parts[0])}
                            />
                            <p
                                className={`${classes.filItem} ${
                                    parts[0] === filler ? classes.active : ""
                                }`}
                                onClick={fillerHandler(parts[0])}
                            >
                                {parts[0]} {parts[1]}
                            </p>
                            <p className={classes.icon} onClick={updateFillerHandler(fil)}>
                                &#9998;
                            </p>
                        </div>
                    )
                })} */}
            </div>
        </>
    )
}
