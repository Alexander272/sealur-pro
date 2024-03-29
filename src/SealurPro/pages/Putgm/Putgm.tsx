import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Loader } from "../../../components/UI/Loader/Loader"
import ServerError from "../../../Error/ServerError"
import { Dispatch, ProState } from "../../store/store"
import { Addit } from "./components/Addit/Addit"
import { AnotherSize } from "./components/AnotherSize/AnotherSize"
import { Main } from "./components/Main/Main"
import { Result } from "./components/Result/Result"
import { Size } from "./components/Size/Size"
import classes from "../style/pages.module.scss"

export default function Putgm() {
    const loading = useSelector((state: ProState) => state.addit.loading)
    const loadingPutg = useSelector((state: ProState) => state.putgm.loading)
    const fetching = useSelector((state: ProState) => state.putgm.fetching)
    const error = useSelector((state: ProState) => state.putgm.error)

    const form = useSelector((state: ProState) => state.putgm.form)

    const { putgm } = useDispatch<Dispatch>()

    useEffect(() => {
        // получение начальных значений (прокладки, размеры первой из них, типы фланцев)
        putgm.getDefault()
    }, [putgm])

    if (loading || loadingPutg) return <Loader />

    if (error) return <ServerError />

    return (
        <>
            {fetching && <Loader background='fill' />}
            <h3 className={classes.description}>
                Прокладки уплотнительные на металлическом основании
            </h3>
            <Main />
            <Addit />
            {form === "Round" && <Size />}
            {form !== "Round" && <AnotherSize />}
            <Result />
        </>
    )
}
