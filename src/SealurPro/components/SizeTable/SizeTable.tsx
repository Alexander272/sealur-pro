import { FC, useState } from "react"
import { Controller, ControllerRenderProps, useForm } from "react-hook-form"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Select } from "../../../components/UI/Select/Select"
import SizeService from "../../service/size"
import { ProState } from "../../store/store"
import { ISize, ISizeDTO } from "../../types/size"
import { IStFl } from "../../types/stFl"
import { ConfirmModal } from "../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../components/Modal/hooks/useModal"
import { Modal } from "../../../components/Modal/Modal"
import { Button } from "../../../components/UI/Button/Button"
import { FileInput } from "../../../components/UI/FileInput/FileInput"
import { Input } from "../../../components/UI/Input/Input"
import { Loader } from "../../../components/UI/Loader/Loader"
import classes from "./table.module.scss"

type Props = {
    data: ISize[]
    typePr: string
    stand: IStFl | null
    saveHandler: (size: ISize, isNew: boolean) => void
    deleteHandler: (id: string, isAll: boolean) => void
}

//TODO добавить загрузку файла с размерами

const tableName = ["Dn", "Pn", "Тип прокладки", "D4", "D3", "D2", "D1", "h", "S2", "S3"]

const { Option } = Select

export const SizeTable: FC<Props> = ({ data, typePr, stand, saveHandler, deleteHandler }) => {
    const [loading, setLoading] = useState(false)
    const [size, setSize] = useState<ISize | null>(null)

    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const { isOpen, toggle } = useModal()
    const { isOpen: isOpenConfirm, toggle: toggleConfirm } = useModal()
    const {
        register,
        handleSubmit,
        setValue,
        control,
        formState: { errors },
    } = useForm<ISize>()

    const updateHandler = (idx: number) => () => {
        setSize(data[idx])
        setValue("id", data[idx].id)
        setValue("dn", data[idx].dn)
        setValue("pn", data[idx].pn)
        setValue("typePr", data[idx].typePr)
        setValue("typeFlId", data[idx].typeFlId)
        setValue("d4", data[idx].d4)
        setValue("d3", data[idx].d3)
        setValue("d2", data[idx].d2)
        setValue("d1", data[idx].d1)
        setValue("h", data[idx].h)
        setValue("s2", data[idx].s2)
        setValue("s3", data[idx].s3)
        toggle()
    }

    const addHandler = () => {
        setSize(null)
        setValue("id", "new")
        setValue("dn", "")
        setValue("pn", "")
        setValue("typePr", "")
        setValue("typeFlId", "1")
        setValue("d4", undefined)
        setValue("d3", 0)
        setValue("d2", 0)
        setValue("d1", undefined)
        setValue("h", "")
        setValue("s2", "")
        setValue("s3", "")
        toggle()
    }

    // добавление (обновление) размеров
    const submitHandler = async (form: ISize) => {
        if (!stand) {
            return
        }

        try {
            setLoading(true)
            const data: ISizeDTO = {
                flange: stand.short,
                standId: stand.standId,
                dn: form.dn,
                pn: form.pn,
                typePr: form.typePr,
                typeFlId: form.typeFlId,
                d4: form.d4 ? +form.d4 : 0,
                d3: +form.d3,
                d2: +form.d2,
                d1: form.d1 ? +form.d1 : 0,
                h: form.h,
                s2: form.s2,
                s3: form.s3,
            }

            if (form.id === "new") {
                const res = await SizeService.create(data)
                saveHandler({ ...data, id: res.id || "" }, true)
                toast.success("Успешно создано")
            } else {
                await SizeService.update(form.id, data)
                saveHandler({ ...data, id: form.id }, false)
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
        if (!size || !stand) return

        try {
            setLoading(false)
            await SizeService.delete(size.id, stand.short)
            deleteHandler(size.id, false)
            toast.success("Успешно удалено")
        } catch (error) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            setLoading(false)
        }
    }

    // Удаление всех размеров выбраного стандарта и типа прокладки
    const deleteAllHandler = async () => {
        if (!stand) return

        try {
            setLoading(false)
            await SizeService.deleteAll(stand.short, typePr)
            deleteHandler("", true)
            toast.success("Успешно удалено")
        } catch (error) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            setLoading(false)
        }
    }

    const renderTypeFl = ({ field }: { field: ControllerRenderProps<ISize, "typeFlId"> }) => {
        return (
            <Select value={field.value} onChange={field.onChange}>
                {typeFl.map(t => (
                    <Option key={t.id} value={t.id}>
                        {t.title}
                    </Option>
                ))}
            </Select>
        )
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
                            name='dn'
                            label='Dn'
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true }}
                            error={errors.dn}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='pn'
                            label='Pn'
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true }}
                            error={errors.pn}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='typePr'
                            label='Тип прокладки'
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true }}
                            error={errors.typePr}
                            errorText='Поле не заполнено'
                        />
                        <Controller name='typeFlId' control={control} render={renderTypeFl} />
                        <Input
                            name='d4'
                            label='D4'
                            type='number'
                            min={0}
                            step={0.1}
                            orentation='horizontal'
                            register={register}
                        />
                        <Input
                            name='d3'
                            label='D3'
                            type='number'
                            min={0}
                            step={0.1}
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true }}
                            error={errors.d3}
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
                            name='d1'
                            type='number'
                            min={0}
                            step={0.1}
                            orentation='horizontal'
                            label='D1'
                            register={register}
                        />
                        <Input
                            name='h'
                            label='h'
                            orentation='horizontal'
                            register={register}
                            rule={{ required: true }}
                            error={errors.h}
                            errorText='Поле не заполнено'
                        />
                        <Input name='s2' label='S2' orentation='horizontal' register={register} />
                        <Input name='s3' label='S3' orentation='horizontal' register={register} />
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
                                <p className={classes.td}>{d.dn}</p>
                                <p className={classes.td}>{d.pn}</p>
                                <p className={classes.td}>{d.typePr}</p>
                                <p className={classes.td}>{d.d4}</p>
                                <p className={classes.td}>{d.d3}</p>
                                <p className={classes.td}>{d.d2}</p>
                                <p className={classes.td}>{d.d1}</p>
                                <p className={classes.td}>{d.h}</p>
                                <p className={classes.td}>{d.s2}</p>
                                <p className={classes.td}>{d.s3}</p>
                            </div>
                        ))}
                </div>
            </div>
            <div className={classes.footer}>
                <Button onClick={addHandler}>Добавить</Button>
                <FileInput label='Загрузить из файла' name='sizes' id='sizes' />
                <a href='/examples/size.xlsx' className={classes.link}>
                    Скачать пример
                </a>
                <Button variant='danger' onClick={toggleConfirm}>
                    Удалить все
                </Button>
            </div>
        </>
    )
}
