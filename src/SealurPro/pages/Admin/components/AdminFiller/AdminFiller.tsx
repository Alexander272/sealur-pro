import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import AdditService from "../../../../service/addit"
import { Dispatch, ProState } from "../../../../store/store"
import { IAddit, IFiller } from "../../../../types/addit"
import { IFiller as IFillerSnp } from "../../../../types/snp"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../components/Modal/Modal"
import { Button } from "../../../../../components/UI/Button/Button"
import { Checkbox } from "../../../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../../../components/UI/Input/Input"
import classes from "./filler.module.scss"

type Props = {
    filler: string
    fillers: IFillerSnp[]
    sendHandler: (isSend: boolean) => void
    clickHandler: (filler: IFillerSnp, fillers: IFillerSnp[]) => void
    changeHandler: (fillers: IFillerSnp[], selected: boolean) => void
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

    const deleteHandler = async () => {
        if (!addit || !data) return
        let fils = addit?.fillers || []
        fils = fils.filter(f => f.short !== data.short)

        try {
            sendHandler(true)
            await AdditService.updateFillers(addit.id, fils, "delete", data.short)

            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.fillers = fils
            dispatch.addit.setAddit(add)

            toast.success("Успешно удалено")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            sendHandler(false)
        }
    }

    const submitHandler = async (form: IFiller) => {
        if (!addit) return
        let fils = [...addit.fillers] || []
        if (!data) {
            fils.push({
                short: form.short,
                title: form.title,
                description: form.description,
            })
        } else {
            fils = fils?.map(f => {
                if (f.short === data.short) return form
                return f
            })
        }
        try {
            sendHandler(true)
            await AdditService.updateFillers(
                addit.id,
                fils,
                data ? "update" : "add",
                data ? "" : form.short
            )

            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.fillers = fils
            dispatch.addit.setAddit(add)

            toast.success(data ? "Успешно обновлено" : "Успешно создано")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            sendHandler(false)
        }
    }

    const openFillerHandler = () => {
        setData(null)
        setValue("short", "")
        setValue("title", "")
        setValue("description", "")
        toggle()
    }
    const updateFillerHandler = (filler: IFiller) => () => {
        setData({ short: filler.short, title: filler.title, description: filler.description })
        setValue("short", filler.short)
        setValue("title", filler.title)
        setValue("description", filler.description)
        toggle()
    }

    const changeFiller = (id: string) => {
        const cur = fillers.find(f => f.id === id)
        if (cur) {
            fillers = fillers.filter(f => f.id !== id)
        } else {
            fillers.push({ id: id, temps: [] })
        }
        return fillers
    }

    const changeFillerHandler = (fil: string) => () => {
        const newFil = changeFiller(fil)
        changeHandler(newFil, fil === filler)
    }

    const fillerHandler = (filler: string) => () => {
        let fil = fillers.find(f => f.id === filler)
        let newFillers: IFillerSnp[] = []

        if (!fil) {
            newFillers = changeFiller(filler)
            fil = newFillers[newFillers.length - 1]
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
                {addit?.fillers.map(fil => {
                    const idx = fillers.findIndex(f => f.id === fil.short)

                    return (
                        <div key={fil.short} className={classes.listItem}>
                            <Checkbox
                                name={fil.title}
                                id={fil.title}
                                checked={idx > -1}
                                onChange={changeFillerHandler(fil.short)}
                            />
                            <p
                                className={`${classes.filItem} ${
                                    fil.short === filler ? classes.active : ""
                                }`}
                                onClick={fillerHandler(fil.short)}
                            >
                                {fil.short} {fil.title}
                                {idx > -1 ? (
                                    <span className={classes.count}>({idx + 1})</span>
                                ) : null}
                            </p>

                            <p className={classes.icon} onClick={updateFillerHandler(fil)}>
                                &#9998;
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
