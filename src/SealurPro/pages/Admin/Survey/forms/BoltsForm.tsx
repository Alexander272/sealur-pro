import { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../components/Modal/Modal"
import { Button } from "../../../../../components/UI/Button/Button"
import { Input } from "../../../../../components/UI/Input/Input"
import SurveyAdminService from "../../../../service/surveyAdmin"
import { Dispatch, ProState } from "../../../../store/store"
import { IBoltMaterial } from "../../../../types/survey"
import classes from "./forms.module.scss"

type Props = {
    data: IBoltMaterial | null
    closeHandler: () => void
    sendHandler: () => void
}

export const BoltsForm: FC<Props> = ({ data, closeHandler, sendHandler }) => {
    const bolts = useSelector((state: ProState) => state.survey.bolts)

    const { survey } = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IBoltMaterial>()

    useEffect(() => {
        if (data) {
            setValue("id", data.id)
            setValue("title", data.title)
        }
    }, [data, setValue])

    const submitHandler = async (form: IBoltMaterial) => {
        let newBolts: IBoltMaterial[] = JSON.parse(JSON.stringify(bolts))
        try {
            sendHandler()
            if (!data) {
                const res = await SurveyAdminService.createBolts({ ...form, flangeId: "0" })
                newBolts.push({ ...form, id: res.id || "" })
            } else {
                await SurveyAdminService.updateBolts({ ...form, flangeId: "0" })
                newBolts = newBolts.map(m => {
                    if (m.id === form.id) return form
                    return m
                })
            }

            survey.setBolts(newBolts)
            toast.success(data ? "Успешно обновлено" : "Успешно создано")
            closeHandler()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            sendHandler()
        }
    }

    const deleteHandler = async () => {
        if (!data) return
        let newBolts: IBoltMaterial[] = JSON.parse(JSON.stringify(bolts))

        try {
            sendHandler()
            await SurveyAdminService.deleteBolts(data.id)

            newBolts = newBolts.filter(m => m.id !== data.id)
            survey.setBolts(newBolts)

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
                <form name='bolt-materials' className={classes.form}>
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
                        name='title'
                        label='Название'
                        placeholder='М16'
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
