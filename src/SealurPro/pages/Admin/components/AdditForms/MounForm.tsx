import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import AdditService from "../../../../service/addit"
import { Dispatch, ProState } from "../../../../store/store"
import { IAddit, IMoun } from "../../../../types/addit"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../components/Modal/Modal"
import { Button } from "../../../../../components/UI/Button/Button"
import { Input } from "../../../../../components/UI/Input/Input"
import classes from "./form.module.scss"

type Props = {
    data: IMoun | null
    closeHandler: () => void
    sendHandler: () => void
}

type Form = {
    title: string
}

export const MounForm: FC<Props> = ({ data, closeHandler, sendHandler }) => {
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
            setValue("title", data.title)
        }
    }, [data, setValue])

    const submitHandler = async (form: Form) => {
        if (!addit) return
        let mouns = [...addit.mounting]
        let newId = ""
        if (!data) {
            newId = (+mouns[mouns.length - 1].id + 1).toString()
            mouns.push({ id: newId, title: form.title })
        } else {
            mouns = mouns?.map(m => {
                if (m.id === data.id) return { ...form, id: data.id }
                return m
            })
        }

        try {
            sendHandler()
            await AdditService.updateMoun(
                addit.id,
                mouns,
                data ? "update" : "add",
                data ? "" : newId
            )

            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.mounting = mouns
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
        let mouns = addit?.mounting || []
        mouns = mouns.filter(m => m.id !== data.id)
        try {
            sendHandler()
            await AdditService.updateMoun(addit.id, mouns, "delete", data.id)

            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.mounting = mouns
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
                <form name='mounting' className={classes.form}>
                    <Input
                        name='title'
                        label='Крепление'
                        placeholder='Ф1-20'
                        register={register}
                        rule={{ required: true }}
                        error={errors.title}
                        errorText='Поле не заполнено'
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
