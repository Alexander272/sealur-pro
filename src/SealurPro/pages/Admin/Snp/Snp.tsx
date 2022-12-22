import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../../components/UI/Button/Button"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { Dispatch, ProState } from "../../../store/store"
import { MainSnp } from "./components/Main/MainSnp"
import { Filler } from "./components/Filler/Filler"
import { Material } from "./components/Materials/Materials"
import { Addit } from "./components/Addit/Addit"
import { Size } from "./components/Size/Size"
import { toast } from "react-toastify"
import { ISNPDTO } from "../../../types/snp"
import SNPService from "../../../service/snp"
import classes from "../pages.module.scss"

export default function SNP() {
    const loading = useSelector((state: ProState) => state.addit.loading)
    const addit = useSelector((state: ProState) => state.addit.addit)
    const stfl = useSelector((state: ProState) => state.addit.stfl)
    const st = useSelector((state: ProState) => state.snp.st)
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const sending = useSelector((state: ProState) => state.snp.loading)
    const snp = useSelector((state: ProState) => state.snp.snp)
    const snps = useSelector((state: ProState) => state.snp.snps)

    const dispatch = useDispatch<Dispatch>()

    // запрос стандартов и типов фланцев
    useEffect(() => {
        if (!stfl.length) dispatch.addit.getStFl()
        if (!typeFl.length) dispatch.addit.getTypeFl()
    }, [stfl.length, typeFl.length, dispatch.addit])

    const saveHandler = async () => {
        if (!snp) {
            toast.error("Тип снп не добавлен")
            return
        }
        if (!snp.fillers.length) {
            toast.error("Наполнитель не выбран")
            return
        }

        const sf = stfl.find(s => s.id === st)
        if (!sf) return

        let id = ""
        try {
            dispatch.snp.setLoading(true)
            const data: ISNPDTO = {
                standId: sf.standId,
                flangeId: sf.flangeId,
                typeFlId: snp.typeFlId,
                typePr: snp.typePr,
                fillers: snp.fillers,
                frame: snp.frame,
                ir: snp.ir,
                or: snp.or,
                mounting: snp.mounting,
                graphite: snp.graphite,
            }

            if (snp.id === "new") {
                const res = await SNPService.create(data)
                id = res.id || ""
                toast.success("Успешно создано")
            } else {
                await SNPService.update(data, snp.id)
                id = snp.id
                toast.success("Успешно обновлено")
            }
        } catch (error: any) {
            toast.error("Не удалось выполнить запрос на сервер")
        } finally {
            dispatch.snp.setLoading(false)
        }

        let tmp = [...snps]
        tmp = tmp.map(s => {
            if (s.id === snp.id) return { ...snp, id: id }
            return s
        })

        dispatch.snp.setSnps(tmp)
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

            <MainSnp />
            {snp && (
                <>
                    <Filler />
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
