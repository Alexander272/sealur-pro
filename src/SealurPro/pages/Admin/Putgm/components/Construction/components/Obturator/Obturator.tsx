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
import { IBasis, IConstruction } from "../../../../../../../types/putgm"
import classes from "../graphite.module.scss"

type Props = {}

export const Obturator: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const constructions = useSelector((state: ProState) => state.putgm.constructions)
    const construction = useSelector((state: ProState) => state.putgm.construction)
    const seal = useSelector((state: ProState) => state.putgm.seal)
    const grap = useSelector((state: ProState) => state.putgm.grap)
    const temp = useSelector((state: ProState) => state.putgm.temp)
    const putgmImage = useSelector((state: ProState) => state.putgm.putgmImage)

    const dispatch = useDispatch<Dispatch>()

    const [data, setData] = useState<IObturator | null>(null)

    const { isOpen, toggle } = useModal()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IObturator>()

    //TODO добавить выбор обтюратора

    const changeObturatorHandler = (short: string) => () => {
        const c: IBasis[] = JSON.parse(JSON.stringify(constructions))
        let idx = c.findIndex(c => c.basis === construction)

        if (idx === -1) {
            toast.error("Тип прокладки не выбран")
            return
        }

        const cur = c[idx]?.obturator.find(o => o.obturator === short)
        if (cur) {
            c[idx].obturator = c[idx].obturator.filter(o => o.obturator !== short)
        } else {
            c[idx].obturator.push({ obturator: short, sealant: [] })
        }
        dispatch.putgm.setOnlyConstructions(c)

        const constr: IConstruction[] = JSON.parse(JSON.stringify(putgm?.construction))
        const cIdx = constr.findIndex(c => c.grap === grap)
        constr[cIdx].basis = c

        if (putgm) dispatch.putgm.setPutgm({ ...putgm, construction: constr })
    }

    const deleteHandler = async () => {
        if (!addit || !data) return
        let obts = addit?.pObturator || []
        obts = obts.filter(o => o.short !== data.short)
        try {
            dispatch.putgm.setLoading(true)
            await AdditService.updateObturators(addit.id, obts, "delete", data.short)
            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.pObturator = obts
            dispatch.addit.setAddit(add)
            toast.success("Успешно удалено")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            dispatch.putgm.setLoading(false)
        }
    }

    const submitHandler = async (form: IObturator) => {
        if (!addit) return
        let obts = [...addit.pObturator] || []
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
            dispatch.putgm.setLoading(true)
            await AdditService.updateObturators(
                addit.id,
                obts,
                data ? "update" : "add",
                data ? "" : form.short
            )
            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.pObturator = obts
            dispatch.addit.setAddit(add)
            toast.success(data ? "Успешно обновлено" : "Успешно создано")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            dispatch.putgm.setLoading(false)
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
                {addit?.pObturator.map(ob => {
                    let idx = constructions
                        .find(c => c.basis === construction)
                        ?.obturator.findIndex(o => o.obturator === ob.short)
                    if (idx === undefined) idx = -1

                    return (
                        <div key={ob.short} className={classes.listItem}>
                            <Checkbox
                                name={ob.short}
                                id={`obt-${ob.short}`}
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
