import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import AdditService from "../../service/addit"
import { Dispatch, RootState } from "../../store/store"
import { IAddit, IMod } from "../../types/addit"
import { ConfirmModal } from "../ConfirmModal/ConfirmModal"
import { useModal } from "../Modal/hooks/useModal"
import { Modal } from "../Modal/Modal"
import { Button } from "../UI/Button/Button"
import { Input } from "../UI/Input/Input"
import classes from "./form.module.scss"

type Props = {
    data: IMod | null
    closeHandler: () => void
    sendHandler: () => void
}

type Form = {
    short: string
    title: string
    description: string
}

export const ModForm: FC<Props> = ({ data, closeHandler, sendHandler }) => {
    const addit = useSelector((state: RootState) => state.addit.addit)

    const dispatch = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<Form>()

    useEffect(() => {
        if (data) {
            setValue("short", data.short)
            setValue("title", data.title)
            setValue("description", data.description)
        }
    }, [data, setValue])

    const submitHandler = async (form: Form) => {
        if (!addit) return
        let mods = addit.mod.split(";") || []
        if (!data) {
            const newIdx = +mods[mods.length - 1].split("@")[0] + 1
            mods?.push(`${newIdx}@${form.title}@${form.short}@${form.description}`)
        } else {
            mods = mods?.map(m => {
                if (m.includes(`${data.id}@${data.title}`))
                    return `${data.id}@${form.title}@${form.short}@${form.description}`
                return m
            })
        }

        try {
            sendHandler()
            await AdditService.updateMod(addit.id, mods.join(";"))
            let add: IAddit = {} as IAddit
            Object.assign(add, addit, { mod: mods.join(";") })
            dispatch.addit.setAddit(add)
            toast.success(data ? "Успешно обновлено" : "Успешно создано")
            closeHandler()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            sendHandler()
        }
    }

    const deleteHandler = async () => {
        if (!addit || !data) return
        let mods = addit?.mod.split(";") || []
        mods = mods.filter(m => !m.includes(`${data.id}@${data.title}`))

        try {
            sendHandler()
            await AdditService.updateMod(addit.id, mods.join(";"))
            let add: IAddit = {} as IAddit
            Object.assign(add, addit, { mod: mods.join(";") })
            dispatch.addit.setAddit(add)
            toast.success("Успешно удалено")
            closeHandler()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            sendHandler()
        }
    }

    return (
        <>
            <ConfirmModal
                title='Удалить?'
                isOpen={isOpen}
                toggle={toggle}
                cancelHandler={closeHandler}
                confirmHandler={deleteHandler}
            />
            <Modal.Content>
                <form name='temperature' className={classes.form}>
                    <Input
                        name='short'
                        label='Короткое обозначение'
                        placeholder='(Al)'
                        register={register}
                    />
                    <Input
                        name='title'
                        label='Название элемента'
                        placeholder='2 алюминиевая фольга'
                        register={register}
                        rule={{ required: true }}
                        error={errors.title}
                        errorText='Поле не заполнено'
                    />
                    <Input
                        name='description'
                        label='Для описания'
                        placeholder='алюминиевой фольги'
                        register={register}
                    />
                </form>
            </Modal.Content>
            <Modal.Footer>
                <Button variant='grayPrimary' fullWidth onClick={closeHandler}>
                    Отмена
                </Button>
                <p className={classes.offset} />
                {data ? (
                    <>
                        <Button variant='danger' fullWidth onClick={toggle}>
                            Удалить
                        </Button>
                        <p className={classes.offset} />
                    </>
                ) : null}
                <Button fullWidth onClick={handleSubmit(submitHandler)}>
                    {data ? "Сохранить" : "Добавить"}
                </Button>
            </Modal.Footer>
        </>
    )
}
