import { useCallback, useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Loader } from "../../../components/UI/Loader/Loader"
import ReadService from "../../service/read"
import { Dispatch, ProState } from "../../store/store"
import { IDn, ISize, ISizeReq } from "../../types/size"
import { ISNP, ISnpForm } from "../../types/snp"
import { AdditSnp } from "./Components/AdditSnp/OldAdditSnp"
import { MainSnp } from "./Components/MainSnp/MainSnp"
import { SizeSnp } from "./Components/SizeSnp/OldSizeSnp"
// import { MatContext } from "./Context/MatContext"
// import { useMat } from "./hooks/mat"
import classes from "../style/pages.module.scss"
import { ResultSnp } from "./Components/ResultSnp/OldResultSnp"

export default function Snp() {
    const loading = useSelector((state: ProState) => state.addit.loading)
    const stfl = useSelector((state: ProState) => state.addit.stfl)

    const [isReady, setIsReady] = useState(false)
    const [fetching, setFetching] = useState(false)

    const [snp, setSnp] = useState<ISNP[]>([])
    const [sizes, setSizes] = useState<ISize[]>([])
    const [dn, setDn] = useState<IDn[]>([])
    const [curSnp, setCurSnp] = useState<ISNP | null>(null)

    const isDef = useRef(true)
    // const curSnp = useRef<ISNP | null>(null)

    //TODO не подходит придется переделать

    // const isOpenMats = useMat()

    const { watch, setValue, control, register } = useForm<ISnpForm>()

    const dispatch = useDispatch<Dispatch>()

    const fetchDef = useCallback(async () => {
        console.log("fetchDef")
        const res = await ReadService.getDefault("snp")
        dispatch.addit.setStFl(res!.stfl)
        dispatch.addit.setAddit(res!.addit)
        dispatch.addit.setTypeFl(res!.typeFl)
        setSnp(res!.snp)
        setSizes(res!.sizes.sizes)
        setDn(res!.sizes.dn)

        setValue("st", res!.stfl[0].id)
        setValue("typeFl", res!.snp[0].typeFlId)
        setValue("typePr", res!.snp[0].typePr)

        // const grap =
        //     res!.snp[0].graphite === "*"
        //         ? res!.addit?.graphite.split("@")[0]
        //         : res!.snp[0].graphite.split(";")[0]
        // const fil = res!.snp[0].fillers.split("&")[0]
        // const tm = res!.snp[0].fillers.split("&")[1]
        // const temp = tm.split(">")[0]
        // const mod = tm.split(">")[1].split(",")[0]
        // setValue("grap", grap || "")
        // setValue("filler", fil)
        // setValue("temp", temp)
        // setValue("mod", mod)

        setValue("isJumper", false)
        setValue("isHole", false)
        setValue("isMoun", false)

        // const ir = res!.snp[0].ir.includes("*")
        //     ? res!.addit?.materials.split("@")[0]
        //     : res!.snp[0].ir?.split(";")[0]
        // const or = res!.snp[0].or.includes("*")
        //     ? res!.addit?.materials.split("@")[0]
        //     : res!.snp[0].or?.split(";")[0]
        // const fr = res!.snp[0].frame.includes("*")
        //     ? res!.addit?.materials.split("@")[0]
        //     : res!.snp[0].frame?.split(";")[0]
        // setValue("ir", ir || "")
        // setValue("or", or || "")
        // setValue("fr", fr || "")

        setValue("dn", res!.sizes.sizes[0].dn)
        setValue("d4", res!.sizes.sizes[0].d4 || 0)
        setValue("d3", res!.sizes.sizes[0].d3)
        setValue("d2", res!.sizes.sizes[0].d2)
        setValue("d1", res!.sizes.sizes[0].d1 || 0)
        setValue("pn", res!.sizes.sizes[0].pn.split(";")[0])
        setValue("h", res!.sizes.sizes[0].h.split(";")[0])
        setValue("s2", res!.sizes.sizes[0].s2?.split(";")[0] || "")
        setValue("s3", res!.sizes.sizes[0].s3?.split(";")[0] || "")
        setIsReady(true)
        setCurSnp(res!.snp[0])

        isDef.current = false
    }, [dispatch.addit, setValue])

    const fetchSize = useCallback(
        async (req: ISizeReq) => {
            console.log("fetchSize")
            try {
                setFetching(true)
                const res = await ReadService.getSize(req)
                setSizes(res.data.sizes)
                setDn(res.data.dn)

                setValue("dn", res.data.sizes[0].dn)
                setValue("d4", res.data.sizes[0].d4 || 0)
                setValue("d3", res.data.sizes[0].d3)
                setValue("d2", res.data.sizes[0].d2)
                setValue("d1", res.data.sizes[0].d1 || 0)
                setValue("pn", res.data.sizes[0].pn.split(";")[0])
                setValue("h", res.data.sizes[0].h.split(";")[0])
                setValue("s2", res.data.sizes[0].s2?.split(";")[0] || "")
                setValue("s3", res.data.sizes[0].s3?.split(";")[0] || "")
            } catch (error: any) {
                toast.error(`Возникла ошибка: ${error.message}`)
            } finally {
                setFetching(false)
            }
        },
        [setValue]
    )

    useEffect(() => {
        fetchDef()
    }, [fetchDef])

    // const setData = (snp: ISNP) => {

    // }

    // const values = watch()

    // useEffect(() => {
    //     if (isDef.current) return
    //     const sf = stfl.find(s => s.id === values.st)

    //     if (!!sf && !!values.typePr && !!values.typeFl)
    //         fetchSize({
    //             typePr: values.typePr,
    //             typeFlId: values.typeFl,
    //             standId: sf.standId,
    //             flShort: sf.short,
    //         })
    // }, [values.typePr, fetchSize, stfl, values.st, values.typeFl])

    // useEffect(() => {
    //     const subscription = watch((value, { name, type }) => console.log(value, name, type))
    //     return () => subscription.unsubscribe()
    // }, [watch])

    const changeCurSnp = (snp: ISNP) => setCurSnp(snp)

    if (loading || !isReady) return <Loader />

    return (
        <>
            <h3 className={classes.description}>Спирально-навитые прокладки</h3>
            {fetching && <Loader background='fill' />}
            {/* <MainSnp
                watch={watch}
                control={control}
                snp={snp}
                setValue={setValue}
                changeCurSnp={changeCurSnp}
            /> */}
            {/* <MatContext.Provider value={isOpenMats}> */}
            <SizeSnp
                sizes={sizes}
                dn={dn}
                // values={values}
                watch={watch}
                control={control}
                setValue={setValue}
                register={register}
            />
            {/* {curSnp && (
                    <AdditSnp
                        values={values}
                        snp={curSnp}
                        control={control}
                        setValue={setValue}
                        register={register}
                    />
                )} */}
            {/* </MatContext.Provider> */}
            {/* <ResultSnp values={values} register={register} /> */}
        </>
    )
}
