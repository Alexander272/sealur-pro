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
import { IMaterial } from "../../../../types/survey"
import classes from "./forms.module.scss"

type Props = {
    data: IMaterial | null
    closeHandler: () => void
    sendHandler: () => void
}

export const MaterialForm: FC<Props> = ({ data, closeHandler, sendHandler }) => {
    const materials = useSelector((state: ProState) => state.survey.materials)

    const { survey } = useDispatch<Dispatch>()

    const { isOpen, toggle } = useModal()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IMaterial>()

    useEffect(() => {
        if (data) {
            setValue("id", data.id)
            setValue("title", data.title)
            setValue("typeMat", data.typeMat)
        }
    }, [data, setValue])

    const submitHandler = async (form: IMaterial) => {
        let newMat: IMaterial[] = JSON.parse(JSON.stringify(materials))
        try {
            sendHandler()
            if (!data) {
                const res = await SurveyAdminService.createMaterials({ ...form, typeMat: "flange" })
                newMat.push({ ...form, id: res.id || "" })
            } else {
                await SurveyAdminService.updateMaterials(form)
                newMat = newMat.map(m => {
                    if (m.id === form.id) return form
                    return m
                })
            }

            survey.setMaterials(newMat)
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
        let newMat: IMaterial[] = JSON.parse(JSON.stringify(materials))

        try {
            sendHandler()
            await SurveyAdminService.deleteMaterials(data.id)

            newMat = newMat.filter(m => m.id !== data.id)
            survey.setMaterials(newMat)

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
                        name='title'
                        label='Название'
                        placeholder='Сталь 20'
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
