import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../store/store"
import ServerError from "../../../Error/ServerError"
import { Loader } from "../../../components/UI/Loader/Loader"
import { Main } from "./components/Main/Main"
import { Addit } from "./components/Addit/Addit"
import { Size } from "./components/Size/Size"
import { AnotherSize } from "./components/AnotherSize/AnotherSize"
import { Result } from "./components/Result/Result"
import classes from "../style/pages.module.scss"

export default function Putg() {
    const loading = useSelector((state: ProState) => state.addit.loading)
    const loadingPutg = useSelector((state: ProState) => state.putg.loading)
    const fetching = useSelector((state: ProState) => state.putg.fetching)
    const error = useSelector((state: ProState) => state.putg.error)

    const form = useSelector((state: ProState) => state.putg.form)

    const { putg } = useDispatch<Dispatch>()

    useEffect(() => {
        // получение начальных значений (прокладки, размеры первой из них, типы фланцев)
        putg.getDefault()
    }, [putg])

    if (loading || loadingPutg) return <Loader />

    if (error) return <ServerError />

    return (
        <>
            {fetching && <Loader background='fill' />}
            <h3 className={classes.description}>
                Прокладки уплотнительные из терморасширенного графита
            </h3>
            <Main />
            <Addit />
            {form === "Round" && <Size />}
            {form === "Oval" || form === "Rectangular" ? <AnotherSize /> : null}
            <Result />
        </>
    )
}
