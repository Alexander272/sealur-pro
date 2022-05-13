import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../store/store"
import ServerError from "../../../Error/ServerError"
import { Loader } from "../../../components/UI/Loader/Loader"
import { MainSnp } from "./Components/MainSnp/MainSnp"
import { SizeSnp } from "./Components/SizeSnp/SizeSnp"
import { AdditSnp } from "./Components/AdditSnp/AdditSnp"
import { ResultSnp } from "./Components/ResultSnp/ResultSnp"
import { AnotherSize } from "./Components/SizeSnp/AnotherSize"
import classes from "../style/pages.module.scss"

export default function Snp() {
    const loading = useSelector((state: ProState) => state.addit.loading)
    const loadingSnp = useSelector((state: ProState) => state.snp.loading)
    const fetching = useSelector((state: ProState) => state.snp.fetching)
    const error = useSelector((state: ProState) => state.snp.error)

    const st = useSelector((state: ProState) => state.snp.st)

    const { snp } = useDispatch<Dispatch>()

    useEffect(() => {
        // получение начальных значений (прокладки, размеры первой из них, типы фланцев)
        snp.getDefault()
    }, [snp])

    if (loading || loadingSnp) return <Loader />

    if (error) return <ServerError />

    return (
        <>
            {fetching && <Loader background='fill' />}
            <h3 className={classes.description}>Спирально-навитые прокладки</h3>
            <MainSnp />

            {st === "11" ? <AnotherSize /> : <SizeSnp />}

            <AdditSnp />
            <ResultSnp />
        </>
    )
}
