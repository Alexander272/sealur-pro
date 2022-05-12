import { FC, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { useModal } from "../../../../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../../../../components/Modal/Modal"
import { Button } from "../../../../../../../../components/UI/Button/Button"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../../../../../../components/UI/Input/Input"
import { Textarea } from "../../../../../../../../components/UI/Input/Textarea"
import AdditService from "../../../../../../../service/addit"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IAddit, IObturator } from "../../../../../../../types/addit"
import { IConstr, IConstruction } from "../../../../../../../types/putg"
import classes from "../graphite.module.scss"

type Props = {}

export const Obturator: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const constructions = useSelector((state: ProState) => state.putg.constructions)
    const construction = useSelector((state: ProState) => state.putg.construction)
    const grap = useSelector((state: ProState) => state.putg.grap)
    const temp = useSelector((state: ProState) => state.putg.temp)
    const putgImage = useSelector((state: ProState) => state.putg.putgImage)

    const dispatch = useDispatch<Dispatch>()

    const [data, setData] = useState<IObturator | null>(null)

    const { isOpen, toggle } = useModal()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IObturator>()

    const changeObturatorHandler = (short: string) => () => {
        const c: IConstruction[] = JSON.parse(JSON.stringify(constructions))
        let idx = c.findIndex(c => c.short === construction)

        if (idx === -1) {
            toast.error("Тип прокладки не выбран")
            return
        }

        const cur = c[idx]?.obturators.find(o => o.short === short)
        if (cur) {
            c[idx].obturators = c[idx].obturators.filter(o => o.short !== short)
        } else {
            const image = putgImage.find(i => i.gasket === `${construction}-${short}`)
            c[idx].obturators.push({ short, imageUrl: image?.url || "" })
        }
        dispatch.putg.setOnlyConstructions(c)

        const constr: IConstr[] = JSON.parse(JSON.stringify(putg?.construction))
        const cIdx = constr.findIndex(c => c.grap === grap)
        const tIdx = constr[cIdx].temperatures.findIndex(t => t.temp === temp)
        constr[cIdx].temperatures[tIdx].constructions = c

        if (putg) dispatch.putg.setPutg({ ...putg, construction: constr })
    }

    const deleteHandler = async () => {
        if (!addit || !data) return
        let obts = addit?.obturator || []
        obts = obts.filter(o => o.short !== data.short)
        try {
            dispatch.putg.setLoading(true)
            await AdditService.updateObturators(addit.id, obts, "delete", data.short)
            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.obturator = obts
            dispatch.addit.setAddit(add)
            toast.success("Успешно удалено")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            dispatch.putg.setLoading(false)
        }
    }

    const submitHandler = async (form: IObturator) => {
        if (!addit) return
        let obts = [...addit.obturator] || []
        if (!data) {
            obts.push({
                short: form.short,
                title: form.title,
                description: form.description,
                forDescr: form.forDescr,
            })
        } else {
            obts = obts?.map(o => {
                if (o.short === data.short) return form
                return o
            })
        }
        try {
            dispatch.putg.setLoading(true)
            await AdditService.updateObturators(
                addit.id,
                obts,
                data ? "update" : "add",
                data ? "" : form.short
            )
            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.obturator = obts
            dispatch.addit.setAddit(add)
            toast.success(data ? "Успешно обновлено" : "Успешно создано")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            dispatch.putg.setLoading(false)
        }
    }

    const updateObturatorHandler = (ob: IObturator) => () => {
        setData({
            short: ob.short,
            title: ob.title,
            description: ob.description,
            forDescr: ob.forDescr,
        })
        setValue("short", ob.short)
        setValue("title", ob.title)
        setValue("description", ob.description)
        setValue("forDescr", ob.forDescr)
        toggle()
    }

    const openObturatorHandler = () => {
        setData(null)
        setValue("short", "")
        setValue("title", "")
        setValue("description", "")
        setValue("forDescr", "")
        toggle()
    }

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle}>
                <Modal.Header title={!data ? "Добавить" : "Редактировать"} onClose={toggle} />
                <Modal.Content>
                    <form className={classes.form}>
                        <Input
                            name='short'
                            label='Короткое обозначение'
                            placeholder='01'
                            register={register}
                            rule={{ required: true }}
                            error={errors.short}
                            errorText='Поле не заполнено'
                        />
                        <Textarea
                            name='title'
                            label='Название'
                            placeholder='без обтюраторов'
                            register={register}
                            rule={{ required: true }}
                            error={errors.title}
                            errorText='Поле не заполнено'
                        />
                        <Textarea name='description' label='Пояснение' register={register} />
                        <Textarea
                            name='forDescr'
                            label='Для описания'
                            placeholder='с наружным обтюратором из нержавеющей ленты марки &'
                            register={register}
                            rule={{ required: true }}
                            error={errors.title}
                            errorText='Поле не заполнено'
                        />
                    </form>
                </Modal.Content>
                <Modal.Footer>
                    <Button variant='grayPrimary' fullWidth onClick={toggle}>
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
            </Modal>
            <p className={classes.add} onClick={openObturatorHandler}>
                Добавить
            </p>
            <div className={`${classes.list} scroll`}>
                {addit?.obturator.map(ob => {
                    let idx = constructions
                        .find(c => c.short === construction)
                        ?.obturators.findIndex(o => o.short === ob.short)
                    if (idx === undefined) idx = -1

                    return (
                        <div key={ob.short} className={classes.listItem}>
                            <Checkbox
                                name={ob.short}
                                id={ob.short}
                                checked={idx > -1}
                                onChange={changeObturatorHandler(ob.short)}
                                label={`${ob.short} ${ob.title}`}
                            />
                            <p className={classes.countItem}>
                                {idx > -1 ? (
                                    <span className={classes.count}>({idx + 1})</span>
                                ) : null}
                            </p>

                            <p className={classes.icon} onClick={updateObturatorHandler(ob)}>
                                &#9998;
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
