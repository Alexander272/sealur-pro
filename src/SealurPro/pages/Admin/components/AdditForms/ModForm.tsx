import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import AdditService from "../../../../service/addit"
import { Dispatch, ProState } from "../../../../store/store"
import { IAddit, IMod } from "../../../../types/addit"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../components/Modal/Modal"
import { Button } from "../../../../../components/UI/Button/Button"
import { Input } from "../../../../../components/UI/Input/Input"
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
    const addit = useSelector((state: ProState) => state.addit.addit)

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
        let mods = [...addit.mod]
        let newId = ""
        if (!data) {
            newId = (+mods[mods.length - 1].id + 1).toString()
            mods.push({
                id: newId,
                title: form.title,
                short: form.short,
                description: form.description,
            })
        } else {
            mods = mods?.map(m => {
                if (m.id === data.id) return { id: data.id, ...form }
                return m
            })
        }

        try {
            sendHandler()
            await AdditService.updateMod(addit.id, mods, data ? "update" : "add", data ? "" : newId)

            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.mod = mods
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
        let mods = addit?.mod || []
        mods = mods.filter(m => m.id !== data.id)

        try {
            sendHandler()
            await AdditService.updateMod(addit.id, mods, "delete", data.id)

            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.mod = mods
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
