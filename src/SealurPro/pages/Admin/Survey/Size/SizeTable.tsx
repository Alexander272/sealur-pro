import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../components/Modal/Modal"
import { Button } from "../../../../../components/UI/Button/Button"
import { FileInput } from "../../../../../components/UI/FileInput/FileInput"
import { Input } from "../../../../../components/UI/Input/Input"
import { Loader } from "../../../../../components/UI/Loader/Loader"
import FileService from "../../../../service/file"
import SurveyAdminService from "../../../../service/surveyAdmin"
import { ISizeInt, ISizeIntDTO } from "../../../../types/survey"
import classes from "./table.module.scss"

const tableName = [
    "Dy",
    "Py",
    "D",
    "D1",
    "D2",
    "d",
    "h1",
    "h2",
    "Ø болтов/шпилек",
    "Количествово болтов/шпилек, шт",
    "Ряд",
]

type Props = {
    data: ISizeInt[]
    flange: string
    typeFl: string
    saveHandler: (size: ISizeInt, isNew: boolean) => void
    deleteHandler: (id: string, isAll: boolean) => void
}

export const SizeTable: FC<Props> = ({ data, flange, typeFl, saveHandler, deleteHandler }) => {
    const [loading, setLoading] = useState(false)
    const [size, setSize] = useState<ISizeInt | null>(null)

    const { isOpen, toggle } = useModal()
    const { isOpen: isOpenConfirm, toggle: toggleConfirm } = useModal()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ISizeInt>()

    const updateHandler = (idx: number) => () => {
        setSize(data[idx])
        setValue("id", data[idx].id)
        setValue("dy", data[idx].dy)
        setValue("py", data[idx].py)
        setValue("dUp", data[idx].dUp)
        setValue("d1", data[idx].d1)
        setValue("d2", data[idx].d2)
        setValue("d", data[idx].d)
        setValue("h1", data[idx].h1)
        setValue("h2", data[idx].h2)
        setValue("bolt", data[idx].bolt)
        setValue("countBolt", data[idx].countBolt)
        setValue("row", data[idx].row)
        toggle()
    }

    const addHandler = () => {
        setSize(null)
        setValue("id", "new")
        setValue("dy", "")
        setValue("py", "")
        setValue("dUp", "")
        setValue("d1", "")
        setValue("d2", "")
        setValue("d", "")
        setValue("h1", "")
        setValue("h2", "")
        setValue("bolt", "")
        setValue("countBolt", 4)
        setValue("row", 1)
        toggle()
    }

    // добавление (обновление) размеров
    const submitHandler = async (form: ISizeInt) => {
        if (!flange) {
            return
        }

        try {
            setLoading(true)
            const data: ISizeIntDTO = {
                flange: flange,
                typeFl: typeFl,
                dy: form.dy,
                py: form.py,
                dUp: form.dUp,
                d1: form.d1,
                d2: form.d2,
                d: form.d,
                h1: form.h1,
                h2: form.h2,
                bolt: form.bolt,
                countBolt: form.countBolt,
                row: form.row,
            }

            if (form.id === "new") {
                const res = await SurveyAdminService.createSize(data)
                // let res = { id: "" }
                saveHandler({ ...form, id: res.id || "" }, true)
                toast.success("Успешно создано")
            } else {
                await SurveyAdminService.updateSize(form.id, data)
                saveHandler({ ...form }, false)
                toast.success("Успешно обновлено")
            }
        } catch (error) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            setLoading(false)
        }
    }

    // удаление размеров
    const delHandler = async () => {
        if (!size || !flange) return

        try {
            setLoading(false)
            await SurveyAdminService.deleteSize(size.id)
            deleteHandler(size.id, false)
            toast.success("Успешно удалено")
        } catch (error) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            setLoading(false)
        }
    }

    // Удаление всех размеров выбраного стандарта
    const deleteAllHandler = async () => {
        if (!flange) return

        try {
            setLoading(false)
            await SurveyAdminService.deleteAllSize(flange)
            deleteHandler("", true)
            toast.success("Успешно удалено")
        } catch (error) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            setLoading(false)
        }
    }

    // загрузка размеров из файла
    const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const files = event.target.files
        if (!files) return

        if (files[0].type !== "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet") {
            toast.error("Нужно выбрать файл с расширением XLSX")
            event.target.files = null
            event.target.value = ""
            return
        }

        const formData = new FormData()
        formData.append("sizes", files[0])

        try {
            await FileService.create(formData, "/sealur-pro/sizes-interview/file")
        } catch (error) {
            toast.error("Не удалось загрузить файл")
        }
    }

    return (
        <>
            <ConfirmModal
                title='Удалить все размеры?'
                isOpen={isOpenConfirm}
                toggle={toggleConfirm}
                cancelHandler={toggleConfirm}
                confirmHandler={deleteAllHandler}
            />
            <Modal isOpen={isOpen} toggle={toggle}>
                {loading && (
                    <div className={classes.loader}>
                        <Loader background='fill' />
                    </div>
                )}
                <Modal.Header title={!size ? "Добавить" : "Редактировать"} onClose={toggle} />
                <Modal.Content>
                    <form name='temperature' className={classes.form}>
                        <Input
                            name='dy'
                            label='Dy'
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true }}
                            error={errors.dy}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='py'
                            label='Py'
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true }}
                            error={errors.py}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='dUp'
                            label='D'
                            type='number'
                            min={0}
                            step={0.1}
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true }}
                            error={errors.dUp}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='d1'
                            label='D1'
                            type='number'
                            min={0}
                            step={0.1}
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true }}
                            error={errors.d1}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='d2'
                            label='D2'
                            type='number'
                            min={0}
                            step={0.1}
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true }}
                            error={errors.d2}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='d'
                            label='d'
                            type='number'
                            min={0}
                            step={0.1}
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true }}
                            error={errors.d}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='h1'
                            label='h1'
                            type='number'
                            min={0}
                            step={0.1}
                            orentation='horizontal'
                            register={register}
                        />
                        <Input
                            name='h2'
                            label='h2'
                            type='number'
                            min={0}
                            step={0.1}
                            orentation='horizontal'
                            register={register}
                        />
                        <Input
                            name='bolt'
                            label='Ø болтов/шпилек'
                            orentation='horizontal'
                            register={register}
                        />
                        <Input
                            name='countBolt'
                            label='Количествово болтов/шпилек, шт'
                            type='number'
                            min={1}
                            orentation='horizontal'
                            register={register}
                        />
                        <Input
                            name='row'
                            label='Ряд'
                            type='number'
                            min={1}
                            max={2}
                            step={1}
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true, min: 1, max: 2 }}
                            error={errors.d}
                            errorText='Поле не корректно заполнено'
                        />
                    </form>
                </Modal.Content>
                <Modal.Footer>
                    <Button variant='grayPrimary' fullWidth onClick={toggle}>
                        Отмена
                    </Button>
                    <p className={classes.offset} />
                    {size ? (
                        <>
                            <Button variant='danger' fullWidth onClick={delHandler}>
                                Удалить
                            </Button>
                            <p className={classes.offset} />
                        </>
                    ) : null}
                    <Button fullWidth onClick={handleSubmit(submitHandler)}>
                        {size ? "Сохранить" : "Добавить"}
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={classes.table}>
                <div className={classes.row}>
                    {tableName.map(h => (
                        <p key={h} className={classes.th}>
                            {h}
                        </p>
                    ))}
                </div>
                <div className={`${classes.body} scroll`}>
                    {data &&
                        data.map((d, idx) => (
                            <div
                                className={`${classes.row} ${classes.tr}`}
                                key={d.id}
                                onClick={updateHandler(idx)}
                            >
                                <p className={classes.td}>{d.dy}</p>
                                <p className={classes.td}>{d.py}</p>
                                <p className={classes.td}>{d.dUp}</p>
                                <p className={classes.td}>{d.d1}</p>
                                <p className={classes.td}>{d.d2}</p>
                                <p className={classes.td}>{d.d}</p>
                                <p className={classes.td}>{d.h1}</p>
                                <p className={classes.td}>{d.h2}</p>
                                <p className={classes.td}>{d.bolt}</p>
                                <p className={classes.td}>{d.countBolt}</p>
                                <p className={classes.td}>{d.row}</p>
                            </div>
                        ))}
                </div>
            </div>
            <div className={classes.footer}>
                <Button onClick={addHandler}>Добавить</Button>
                <FileInput
                    label='Загрузить из файла'
                    name='sizes'
                    id='sizes'
                    onChange={uploadFile}
                />
                <a href='/examples/size-int.xlsx' className={classes.link}>
                    Скачать пример
                </a>
                <Button variant='danger' onClick={toggleConfirm}>
                    Удалить все
                </Button>
            </div>
        </>
    )
}
