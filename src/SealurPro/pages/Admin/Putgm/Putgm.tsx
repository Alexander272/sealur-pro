import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Button } from "../../../../components/UI/Button/Button"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { Dispatch, ProState } from "../../../store/store"
import { IPutgmDTO } from "../../../types/putgm"
import { Size } from "./components/Size/Size"
import { Main } from "./components/Main/Main"
import { Material } from "./components/Materials/Materials"
import { Construction } from "./components/Construction/Construction"
import { Addit } from "./components/Addit/Addit"
import classes from "../pages.module.scss"

export default function Putgm() {
    const [isReady, setIsReady] = useState(false)
    const loading = useSelector((state: ProState) => state.addit.loading)
    const addit = useSelector((state: ProState) => state.addit.addit)
    const flanges = useSelector((state: ProState) => state.addit.fl)
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const sending = useSelector((state: ProState) => state.putgm.loading)
    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const putgms = useSelector((state: ProState) => state.putgm.putgms)
    const flange = useSelector((state: ProState) => state.putgm.flange)

    const dispatch = useDispatch<Dispatch>()

    // запрос стандартов и типов фланцев
    useEffect(() => {
        if (!isReady) {
            if (!flanges.length) dispatch.addit.getFl()
            if (!typeFl.length) dispatch.addit.getTypeFl()
            setIsReady(true)
        }
    }, [flanges.length, typeFl.length, dispatch.addit, isReady])

    // сохранение прокладки
    const saveHandler = async () => {
        if (!putgm) {
            toast.error("Тип путг не добавлен")
            return
        }

        let id = ""
        try {
            dispatch.putgm.setLoading(true)
            const data: IPutgmDTO = {
                flangeId: flange,
                typeFlId: putgm.typeFlId,
                typePr: putgm.typePr,
                form: putgm.form,
                construction: putgm.construction,
                temperatures: putgm.temperatures,
                basis: putgm.basis,
                obturator: putgm.obturator,
                coating: putgm.coating,
                mounting: putgm.mounting,
                graphite: putgm.graphite,
            }

            // if (putgm.id === "new") {
            //     const res = await PutgmService.create(data)
            //     id = res.id || ""
            //     toast.success("Успешно создано")
            // } else {
            //     await PutgmService.update(data, putgm.id)
            //     id = putgm.id
            //     toast.success("Успешно обновлено")
            // }
        } catch (error: any) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            dispatch.putgm.setLoading(false)
        }

        let tmp = [...putgms]
        tmp = tmp.map(p => {
            if (p.id === putgm.id) return { ...putgm, id: id }
            return p
        })

        dispatch.putgm.setPutgm({ ...putgm, id: id })
        dispatch.putgm.setPutgms(tmp)
    }

    if (!addit || loading) {
        return <Loader />
    }

    return (
        <div className={classes.page}>
            {sending && (
                <div className={classes.loader}>
                    <Loader background='fill' />
                </div>
            )}
            <Main />
            {putgm && (
                <>
                    <Construction />
                    <Material />
                    <Addit />
                    <div className={classes.line}>
                        <Size />
                        <span className={classes.full} />
                        <Button rounded='round' onClick={saveHandler}>
                            Сохранить
                        </Button>
                    </div>
                </>
            )}
        </div>
    )
}
