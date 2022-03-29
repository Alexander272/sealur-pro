import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../store/store"
import { Loader } from "../../../components/UI/Loader/Loader"
import { MainSnp } from "./Components/MainSnp/MainSnp"
import { SizeSnp } from "./Components/SizeSnp/SizeSnp"
import classes from "../style/pages.module.scss"
import { AdditSnp } from "./Components/AdditSnp/AdditSnp"
import { ResultSnp } from "./Components/ResultSnp/ResultSnp"

export default function NewSnp() {
    const loading = useSelector((state: ProState) => state.addit.loading)
    const loadingSnp = useSelector((state: ProState) => state.snp.loading)
    const fetching = useSelector((state: ProState) => state.snp.fetching)

    const { snp } = useDispatch<Dispatch>()

    useEffect(() => {
        snp.getDefault()
    }, [snp])

    if (loading || loadingSnp) return <Loader />

    return (
        <>
            {fetching && <Loader background='fill' />}
            <h3 className={classes.description}>Спирально-навитые прокладки</h3>
            <MainSnp />
            <SizeSnp />
            <AdditSnp />
            <ResultSnp />
        </>
    )
}
