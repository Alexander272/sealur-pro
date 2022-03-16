import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import AdditService from "../../service/addit"
import { Dispatch, RootState } from "../../store/store"
import { IAddit, ITemp } from "../../types/addit"
import { Modal } from "../Modal/Modal"
import { Button } from "../UI/Button/Button"
import { Input } from "../UI/Input/Input"
import classes from "./form.module.scss"

type Props = {
    data: ITemp | null
    closeHandler: () => void
    sendHandler: () => void
}

type Form = {
    title: string
}

export const TempForm: FC<Props> = ({ data, closeHandler, sendHandler }) => {
    const addit = useSelector((state: RootState) => state.addit.addit)

    const dispatch = useDispatch<Dispatch>()

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
        let temps = addit.temperature.split(";") || []
        if (!data) {
            const newIdx = +temps[temps.length - 1].split("@")[0] + 1
            temps?.push(`${newIdx}@${form.title}`)
        } else {
            temps = temps?.map(t => {
                if (t === `${data.index}@${data.title}`) return `${data.index}@${form.title}`
                return t
            })
        }

        try {
            sendHandler()
            await AdditService.updateTemp(addit.id, temps.join(";"))
            let add: IAddit = {} as IAddit
            Object.assign(add, addit, { temperature: temps.join(";") })
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
        let temps = addit?.temperature.split(";") || []
        temps = temps.filter(t => t !== `${data.index}@${data.title}`)
        // temps = temps.map((t, idx) => {
        //     let parts = t.split("@")
        //     return `${idx}@${parts[1]}`
        // })

        try {
            sendHandler()
            await AdditService.updateTemp(addit.id, temps.join(";"))
            let add: IAddit = {} as IAddit
            Object.assign(add, addit, { temperature: temps.join(";") })
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
            <Modal.Content>
                <form name='temperature' className={classes.form}>
                    <Input
                        name='title'
                        label='Температура'
                        placeholder='до 260'
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
        </>
    )
}
