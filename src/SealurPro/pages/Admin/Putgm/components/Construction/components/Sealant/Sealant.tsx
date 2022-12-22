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
import { IAddit, ISealant } from "../../../../../../../types/addit"
import { IBasis, IConstruction } from "../../../../../../../types/putgm"
import classes from "../graphite.module.scss"

type Props = {}

export const Sealant: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const constructions = useSelector((state: ProState) => state.putgm.constructions)
    const grap = useSelector((state: ProState) => state.putgm.grap)
    const construction = useSelector((state: ProState) => state.putgm.construction)
    const obturator = useSelector((state: ProState) => state.putgm.obturator)
    const putgmImage = useSelector((state: ProState) => state.putgm.putgmImage)

    const dispatch = useDispatch<Dispatch>()

    const [data, setData] = useState<ISealant | null>(null)

    const { isOpen, toggle } = useModal()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ISealant>()

    const changeSealantHandler = (short: string) => () => {
        const c: IBasis[] = JSON.parse(JSON.stringify(constructions))
        let idx = c.findIndex(c => c.basis === construction)

        if (idx === -1) {
            toast.error("Тип основания не выбран")
            return
        }

        const oIdx = c[idx].obturator.findIndex(o => o.obturator === obturator)
        const cur = c[idx].obturator[oIdx].sealant.find(s => s.seal === short)
        if (cur) {
            c[idx].obturator[oIdx].sealant = c[idx].obturator[oIdx].sealant.filter(
                s => s.seal !== short
            )
        } else {
            const image = putgmImage.find(i => i.gasket === `${construction}-${obturator}-${short}`)
            c[idx].obturator[oIdx].sealant.push({ seal: short, imageUrl: image?.url || "" })
        }
        dispatch.putgm.setOnlyConstructions(c)

        const constr: IConstruction[] = JSON.parse(JSON.stringify(putgm?.construction))
        const cIdx = constr.findIndex(c => c.grap === grap)
        constr[cIdx].basis = c

        if (putgm) dispatch.putgm.setPutgm({ ...putgm, construction: constr })
    }

    const deleteHandler = async () => {
        if (!addit || !data) return
        let seals = addit?.sealant || []
        seals = seals.filter(o => o.id !== data.id)
        try {
            dispatch.putgm.setLoading(true)
            await AdditService.updateSealant(addit.id, seals, "delete", data.id)
            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.sealant = seals
            dispatch.addit.setAddit(add)
            toast.success("Успешно удалено")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            dispatch.putgm.setLoading(false)
        }
    }

    const submitHandler = async (form: ISealant) => {
        if (!addit) return
        let seals = [...addit.sealant] || []
        if (!data) {
            seals.push({
                id: form.id,
                short: form.short,
                title: form.title,
                description: form.description,
                forDescr: form.forDescr,
            })
        } else {
            seals = seals?.map(s => {
                if (s.id === data.id) return form
                return s
            })
        }
        try {
            dispatch.putgm.setLoading(true)
            await AdditService.updateSealant(
                addit.id,
                seals,
                data ? "update" : "add",
                data ? "" : form.id
            )
            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.sealant = seals
            dispatch.addit.setAddit(add)
            toast.success(data ? "Успешно обновлено" : "Успешно создано")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            dispatch.putgm.setLoading(false)
        }
    }

    const updateSealantHandler = (seal: ISealant) => () => {
        setData({
            id: seal.id,
            short: seal.short,
            title: seal.title,
            description: seal.description,
            forDescr: seal.forDescr,
        })
        setValue("id", seal.id)
        setValue("short", seal.short)
        setValue("title", seal.title)
        setValue("description", seal.description)
        setValue("forDescr", seal.forDescr)
        toggle()
    }

    const openSealantHandler = () => {
        setData(null)
        setValue("id", "")
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
                            name='id'
                            label='Id'
                            placeholder='1'
                            register={register}
                            rule={{ required: true }}
                            error={errors.short}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='short'
                            label='Короткое обозначение'
                            placeholder='2'
                            register={register}
                            rule={{ required: true }}
                            error={errors.short}
                            errorText='Поле не заполнено'
                        />
                        <Textarea
                            name='title'
                            label='Название'
                            placeholder='МГЛ, армированный перфорированной фольгой из коррозионно-стойкой стали'
                            register={register}
                            rule={{ required: true }}
                            error={errors.title}
                            errorText='Поле не заполнено'
                        />
                        <Textarea name='description' label='Пояснение' register={register} />
                        <Textarea
                            name='forDescr'
                            label='Для описания'
                            placeholder='с уплотнительным элементом из МГЛ, армированного фольгой из коррозионно-стойкой стали'
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
            <p className={classes.add} onClick={openSealantHandler}>
                Добавить
            </p>
            <div className={`${classes.list} scroll`}>
                {addit?.sealant.map(seal => {
                    let idx = constructions
                        .find(c => c.basis === construction)
                        ?.obturator.find(o => o.obturator === obturator)
                        ?.sealant.findIndex(s => s.seal === seal.id)
                    if (idx === undefined) idx = -1

                    return (
                        <div key={seal.id} className={classes.listItem}>
                            <Checkbox
                                name={seal.short}
                                id={`seal-${seal.id}`}
                                checked={idx > -1}
                                onChange={changeSealantHandler(seal.id)}
                                label={`${seal.short} ${seal.title}`}
                            />
                            <p className={classes.countItem}>
                                {idx > -1 ? (
                                    <span className={classes.count}>({idx + 1})</span>
                                ) : null}
                            </p>

                            <p className={classes.icon} onClick={updateSealantHandler(seal)}>
                                &#9998;
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
