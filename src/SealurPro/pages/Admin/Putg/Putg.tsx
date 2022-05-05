import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../../components/UI/Button/Button"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { Dispatch, ProState } from "../../../store/store"
import { Size } from "./components/Size/Size"
import { Main } from "./components/Main/Main"
import classes from "../pages.module.scss"
import { Material } from "./components/Materials/Materials"
import { Construction } from "./components/Construction/Construction"
import { Addit } from "./components/Addit/Addit"
import { IPutgDTO } from "../../../types/putg"
import PutgService from "../../../service/putg"
import { toast } from "react-toastify"

export default function Putg() {
    const [isReady, setIsReady] = useState(false)
    const loading = useSelector((state: ProState) => state.addit.loading)
    const addit = useSelector((state: ProState) => state.addit.addit)
    const flanges = useSelector((state: ProState) => state.addit.fl)
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const sending = useSelector((state: ProState) => state.putg.loading)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const putgs = useSelector((state: ProState) => state.putg.putgs)
    const flange = useSelector((state: ProState) => state.putg.flange)

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
        if (!putg) {
            toast.error("Тип путг не добавлен")
            return
        }

        let id = ""
        try {
            dispatch.putg.setLoading(true)
            const data: IPutgDTO = {
                flangeId: flange,
                typeFlId: putg.typeFlId,
                typePr: putg.typePr,
                form: putg.form,
                construction: putg.construction,
                temperatures: putg.temperatures,
                reinforce: putg.reinforce,
                obturator: putg.obturator,
                iLimiter: putg.iLimiter,
                oLimiter: putg.oLimiter,
                coating: putg.coating,
                mounting: putg.mounting,
                graphite: putg.graphite,
            }

            if (putg.id === "new") {
                const res = await PutgService.create(data)
                id = res.id || ""
                toast.success("Успешно создано")
            } else {
                await PutgService.update(data, putg.id)
                id = putg.id
                toast.success("Успешно обновлено")
            }
        } catch (error: any) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            dispatch.putg.setLoading(false)
        }

        let tmp = [...putgs]
        tmp = tmp.map(p => {
            if (p.id === putg.id) return { ...putg, id: id }
            return p
        })

        dispatch.putg.setPutg({ ...putg, id: id })
        dispatch.putg.setPutgs(tmp)
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
            {putg && (
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
