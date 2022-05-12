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
import { IConstr, IConstruction as IConstructions } from "../../../../../../../types/putg"
import classes from "../graphite.module.scss"

type Props = {}

export const Design: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const construction = useSelector((state: ProState) => state.putg.construction)
    const constructions = useSelector((state: ProState) => state.putg.constructions)
    const grap = useSelector((state: ProState) => state.putg.grap)
    const temp = useSelector((state: ProState) => state.putg.temp)

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
        let constrs: IConstructions[] = JSON.parse(JSON.stringify(constructions))
        const cur = constrs.find(c => c.short === short)
        if (cur) {
            constrs = constrs.filter(c => c.short !== short)
        } else {
            constrs.push({ short, obturators: [] })
        }

        return constrs
    }

    const changeDesignHandler = (short: string) => () => {
        if (!temp) {
            toast.error("Температура не выбрана")
            return
        }

        const constr = changeDesign(short)
        dispatch.putg.setConstructions(constr)
        if (short === construction) dispatch.putg.setConstruction("")

        const con: IConstr[] = JSON.parse(JSON.stringify(putg?.construction))
        const cIdx = con.findIndex(c => c.grap === grap)
        const tIdx = con[cIdx].temperatures.findIndex(t => t.temp === temp)
        con[cIdx].temperatures[tIdx].constructions = constr

        if (putg) dispatch.putg.setPutg({ ...putg, construction: con })
    }

    const chooseDesignHandler = (short: string) => () => {
        if (!temp) {
            toast.error("Температура не выбрана")
            return
        }

        dispatch.putg.setConstruction(short)
        const cur = constructions.find(c => c.short === short)
        if (!cur) {
            const constr = changeDesign(short)
            dispatch.putg.setOnlyConstructions(constr)

            const con: IConstr[] = JSON.parse(JSON.stringify(putg?.construction))
            const cIdx = con.findIndex(c => c.grap === grap)
            const tIdx = con[cIdx].temperatures.findIndex(t => t.temp === temp)
            con[cIdx].temperatures[tIdx].constructions = constr

            if (putg) dispatch.putg.setPutg({ ...putg, construction: con })
        }
    }

    const deleteHandler = async () => {
        if (!addit || !data) return
        let con = addit?.construction || []
        con = con.filter(c => c.short !== data.short)

        try {
            dispatch.putg.setLoading(true)
            await AdditService.updateConstruction(addit.id, con, "delete", data.short)
            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.construction = con
            dispatch.addit.setAddit(add)
            toast.success("Успешно удалено")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            dispatch.putg.setLoading(false)
        }
    }

    const submitHandler = async (form: IConstruction) => {
        if (!addit) return
        let con = [...addit.construction] || []
        if (!data) {
            con.push({
                short: form.short,
                title: form.title,
                description: form.description,
                isHaveMaterial: form.isHaveMaterial,
            })
        } else {
            con = con?.map(c => {
                if (c.short === data.short) return form
                return c
            })
        }

        try {
            dispatch.putg.setLoading(true)
            await AdditService.updateConstruction(
                addit.id,
                con,
                data ? "update" : "add",
                data ? "" : form.short
            )
            let add: IAddit = JSON.parse(JSON.stringify(addit))
            add.construction = con
            dispatch.addit.setAddit(add)
            toast.success(data ? "Успешно обновлено" : "Успешно создано")
            toggle()
        } catch (error: any) {
            toast.error(`Возникла ошибка: ${error.message}`)
        } finally {
            dispatch.putg.setLoading(false)
        }
    }

    const updateDesignHandler = (con: IConstruction) => () => {
        setData({
            short: con.short,
            title: con.title,
            description: con.description,
            isHaveMaterial: con.isHaveMaterial,
        })
        setValue("short", con.short)
        setValue("title", con.title)
        setValue("description", con.description)
        setValue("isHaveMaterial", con.isHaveMaterial)
        toggle()
    }

    const openDesignHandler = () => {
        setData(null)
        setValue("short", "")
        setValue("title", "")
        setValue("description", "")
        setValue("isHaveMaterial", true)
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
                            placeholder='210'
                            register={register}
                            rule={{ required: true }}
                            error={errors.short}
                            errorText='Поле не заполнено'
                        />
                        <Input
                            name='title'
                            label='Название'
                            placeholder='армированная'
                            register={register}
                            rule={{ required: true }}
                            error={errors.title}
                            errorText='Поле не заполнено'
                        />
                        <Textarea name='description' label='Пояснение' register={register} />
                        {/* <Textarea
                            name='description'
                            label='Для описания'
                            placeholder=''
                            register={register}
                        /> */}
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
                {addit?.construction.map(con => {
                    const idx = constructions.findIndex(c => c.short === con.short)

                    return (
                        <div key={con.short} className={classes.listItem}>
                            <Checkbox
                                name={con.short}
                                id={con.short}
                                checked={idx > -1}
                                onChange={changeDesignHandler(con.short)}
                            />
                            <p
                                className={`${classes.filItem} ${
                                    con.short === construction ? classes.active : ""
                                }`}
                                onClick={chooseDesignHandler(con.short)}
                            >
                                {con.short} {con.title}
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
