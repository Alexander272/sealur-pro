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
import classes from "../pages.module.scss"

export default function SNP() {
    const loading = useSelector((state: ProState) => state.addit.loading)
    const addit = useSelector((state: ProState) => state.addit.addit)
    const stfl = useSelector((state: ProState) => state.addit.stfl)
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const sending = useSelector((state: ProState) => state.snp.loading)
    const snp = useSelector((state: ProState) => state.snp.snp)

    const dispatch = useDispatch<Dispatch>()

    // запрос стандартов и типов фланцев
    useEffect(() => {
        if (!stfl.length) dispatch.addit.getStFl()
        if (!typeFl.length) dispatch.addit.getTypeFl()
    }, [stfl.length, typeFl.length, dispatch.addit])

    const saveHandler = async () => {}

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
