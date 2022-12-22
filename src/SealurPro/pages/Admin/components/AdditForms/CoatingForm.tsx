import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import AdditService from "../../../../service/addit"
import { Dispatch, ProState } from "../../../../store/store"
import { IAddit, ICoating } from "../../../../types/addit"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../components/Modal/Modal"
import { Button } from "../../../../../components/UI/Button/Button"
import { Input } from "../../../../../components/UI/Input/Input"
import classes from "./form.module.scss"

type Props = {
    data: ICoating | null
    closeHandler: () => void
    sendHandler: () => void
}

type Form = {
    id: string
    short: string
    title: string
    description: string
}

export const CoatingForm: FC<Props> = ({ data, closeHandler, sendHandler }) => {
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
            setValue("id", data.id)
            setValue("short", data.short)
            setValue("title", data.title)
            setValue("description", data.description)
        }
    }, [data, setValue])

    const submitHandler = async (form: Form) => {
        if (!addit) return
        let coat = [...addit.coating]
        if (!data) {
            coat.push({
                id: form.id,
                short: form.short,
                title: form.title,
                description: form.description,
            })
        } else {
            coat = coat?.map(c => {
                if (c.id === data.id) return form
                return c
            })
        }
        try {
            sendHandler()
            await AdditService.updateCoating(
                addit.id,
                coat,
                data ? "update" : "add",
                data ? "" : form.id
            )

            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.coating = coat
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
        let coat = addit?.coating || []
        coat = coat.filter(c => c.id !== data.id)
        try {
            sendHandler()
            await AdditService.updateCoating(addit.id, coat, "delete", data.id)

            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.coating = coat
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
                <form name='materials' className={classes.form}>
                    <Input
                        name='id'
                        label='id'
                        placeholder='1'
                        register={register}
                        rule={{ required: true }}
                        error={errors.id}
                        errorText='Поле не заполнено'
                    />
                    <Input
                        name='short'
                        label='Короткое обозначение'
                        placeholder='СК'
                        register={register}
                    />
                    <Input
                        name='title'
                        label='Название'
                        placeholder='с самоклеящимся покрытием'
                        register={register}
                        rule={{ required: true }}
                        error={errors.title}
                        errorText='Поле не заполнено'
                    />
                    <Input
                        name='description'
                        label='Для описания'
                        placeholder='с элементом для крепления на поверхности'
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
