import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import AdditService from "../../service/addit"
import { Dispatch, RootState } from "../../store/store"
import { IAddit, IMat } from "../../types/addit"
import { ConfirmModal } from "../ConfirmModal/ConfirmModal"
import { useModal } from "../Modal/hooks/useModal"
import { Modal } from "../Modal/Modal"
import { Button } from "../UI/Button/Button"
import { Input } from "../UI/Input/Input"
import classes from "./form.module.scss"

type Props = {
    data: IMat | null
    closeHandler: () => void
    sendHandler: () => void
}

type Form = {
    short: string
    title: string
}

export const MatForm: FC<Props> = ({ data, closeHandler, sendHandler }) => {
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
        }
    }, [data, setValue])

    const submitHandler = async (form: Form) => {
        if (!addit) return
        let mats = addit.materials.split(";") || []
        if (!data) {
            mats?.push(`${form.short}@${form.title}`)
        } else {
            mats = mats?.map(m => {
                if (m === `${data.short}@${data.title}`) return `${form.short}@${form.title}`
                return m
            })
        }

        try {
            sendHandler()
            await AdditService.updateMat(
                addit.id,
                mats.join(";"),
                data ? "update" : "add",
                data ? "" : form.short
            )
            let add: IAddit = {} as IAddit
            Object.assign(add, addit, { materials: mats.join(";") })
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
        let mats = addit?.materials.split(";") || []
        mats = mats.filter(m => m !== `${data.short}@${data.title}`)

        try {
            sendHandler()
            await AdditService.updateMat(addit.id, mats.join(";"), "delete", data.short)
            let add: IAddit = {} as IAddit
            Object.assign(add, addit, { materials: mats.join(";") })
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
                        name='short'
                        label='Короткое обозначение'
                        placeholder='1L'
                        register={register}
                        rule={{ required: true }}
                        error={errors.short}
                        errorText='Поле не заполнено'
                    />
                    <Input
                        name='title'
                        label='Название'
                        placeholder='AISI 304L (03X18H11)'
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
