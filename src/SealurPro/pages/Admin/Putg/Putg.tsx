import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../../components/UI/Button/Button"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { Dispatch, ProState } from "../../../store/store"
import { Size } from "./components/Size/Size"
import { Main } from "./components/Main/Main"
import classes from "../pages.module.scss"
import { Material } from "./components/Materials/Materials"

export default function Putg() {
    const loading = useSelector((state: ProState) => state.addit.loading)
    const addit = useSelector((state: ProState) => state.addit.addit)
    const flanges = useSelector((state: ProState) => state.addit.fl)
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const sending = useSelector((state: ProState) => state.putg.loading)
    const putg = useSelector((state: ProState) => state.putg.putg)

    const dispatch = useDispatch<Dispatch>()

    // запрос стандартов и типов фланцев
    useEffect(() => {
        if (!flanges.length) dispatch.addit.getFl()
        if (!typeFl.length) dispatch.addit.getTypeFl()
    }, [flanges.length, typeFl.length, dispatch.addit])

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
            <Main />
            {putg && (
                <>
                    <Material />
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
