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
import { IAddit, IConstruction } from "../../../../../../../types/addit"
import { IBasis, IConstruction as IConstructions } from "../../../../../../../types/putgm"
import classes from "../graphite.module.scss"

type Props = {}

export const Design: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const construction = useSelector((state: ProState) => state.putgm.construction)
    const constructions = useSelector((state: ProState) => state.putgm.constructions)
    const grap = useSelector((state: ProState) => state.putgm.grap)

    const dispatch = useDispatch<Dispatch>()

    const [data, setData] = useState<IConstruction | null>(null)

    const { isOpen, toggle } = useModal()
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IConstruction>()

    const changeDesign = (short: string) => {
        let constrs: IBasis[] = JSON.parse(JSON.stringify(constructions))
        const cur = constrs.find(c => c.basis === short)
        if (cur) {
            constrs = constrs.filter(c => c.basis !== short)
        } else {
            constrs.push({ basis: short, obturator: [] })
        }

        return constrs
    }

    const changeDesignHandler = (short: string) => () => {
        if (!grap) {
            toast.error("Чистота графита не выбрана")
            return
        }

        const constr = changeDesign(short)
        dispatch.putgm.setConstructions(constr)
        if (short === construction) dispatch.putgm.setConstruction("")

        const con: IConstructions[] = JSON.parse(JSON.stringify(putgm?.construction))
        const cIdx = con.findIndex(c => c.grap === grap)
        con[cIdx].basis = constr

        if (putgm) dispatch.putgm.setPutgm({ ...putgm, construction: con })
    }

    const chooseDesignHandler = (short: string) => () => {
        if (!grap) {
            toast.error("Чистота графита не выбрана")
            return
        }

        dispatch.putgm.setConstruction(short)
        const cur = constructions.find(c => c.basis === short)
        if (!cur) {
            const constr = changeDesign(short)
            dispatch.putgm.setOnlyConstructions(constr)

            const con: IConstructions[] = JSON.parse(JSON.stringify(putgm?.construction))
            const cIdx = con.findIndex(c => c.grap === grap)
            con[cIdx].basis = constr

            dispatch.putgm.setObturator(constr[0].obturator[0]?.obturator || "")

            if (putgm) dispatch.putgm.setPutgm({ ...putgm, construction: con })
            return
        }
        dispatch.putgm.setObturator(cur.obturator[0]?.obturator || "")
    }

    const deleteHandler = async () => {
        if (!addit || !data) return
        let con = addit?.basis || []
        con = con.filter(c => c.short !== data.short)

        try {
            dispatch.putgm.setLoading(true)
            await AdditService.updateBasis(addit.id, con, "delete", data.short)
            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.basis = con
            dispatch.addit.setAddit(add)
            toast.success("Успешно удалено")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            dispatch.putgm.setLoading(false)
        }
    }

    const submitHandler = async (form: IConstruction) => {
        if (!addit) return
        let con = [...addit.basis] || []
        if (!data) {
            con.push({
                short: form.short,
                title: form.title,
                description: form.description,
            })
        } else {
            con = con?.map(c => {
                if (c.short === data.short) return form
                return c
            })
        }

        try {
            dispatch.putgm.setLoading(true)
            await AdditService.updateBasis(
                addit.id,
                con,
                data ? "update" : "add",
                data ? "" : form.short
            )
            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.basis = con
            dispatch.addit.setAddit(add)
            toast.success(data ? "Успешно обновлено" : "Успешно создано")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            dispatch.putgm.setLoading(false)
        }
    }

    const updateDesignHandler = (con: IConstruction) => () => {
        setData({
            short: con.short,
            title: con.title,
            description: con.description,
        })
        setValue("short", con.short)
        setValue("title", con.title)
        setValue("description", con.description)
        toggle()
    }

    const openDesignHandler = () => {
        setData(null)
        setValue("short", "")
        setValue("title", "")
        setValue("description", "")
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
                        <Input
                            name='title'
                            label='Название'
                            placeholder='ПУТГм-01'
                            register={register}
                            rule={{ required: true }}
                            error={errors.title}
                            errorText='Поле не заполнено'
                        />
                        <Textarea name='description' label='Пояснение' register={register} />
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
            <p className={classes.add} onClick={openDesignHandler}>
                Добавить
            </p>
            <div className={`${classes.list} scroll`}>
                {addit?.basis.map(con => {
                    const idx = constructions.findIndex(c => c.basis === con.short)

                    return (
                        <div key={con.short} className={classes.listItem}>
                            <Checkbox
                                name={con.short}
                                id={`des-${con.short}`}
                                checked={idx > -1}
                                onChange={changeDesignHandler(con.short)}
                            />
                            <p
                                className={`${classes.filItem} ${
                                    con.short === construction ? classes.active : ""
                                }`}
                                onClick={chooseDesignHandler(con.short)}
                            >
                                {con.title}
                                {idx > -1 ? (
                                    <span className={classes.count}>({idx + 1})</span>
                                ) : null}
                            </p>

                            <p className={classes.icon} onClick={updateDesignHandler(con)}>
                                &#9998;
                            </p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
