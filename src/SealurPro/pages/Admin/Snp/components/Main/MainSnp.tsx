import React, { FC, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Select } from "../../../../../../components/UI/Select/Select"
import { AdminType } from "./components/AdminType/AdminType"
import { Dispatch, ProState } from "../../../../../store/store"
import { ISNP } from "../../../../../types/snp"
import classes from "../../../pages.module.scss"

const { Option } = Select

type Props = {}

export const MainSnp: FC<Props> = () => {
    const stfl = useSelector((state: ProState) => state.addit.stfl)
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const st = useSelector((state: ProState) => state.snp.st)
    const snps = useSelector((state: ProState) => state.snp.snps)
    const snp = useSelector((state: ProState) => state.snp.snp)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        dispatch.snp.getSnp({ st: "1", req: { standId: "1", flangeId: "1" } })
    }, [dispatch.snp])

    const stHandler = (value: string) => {
        const sf = stfl.find(s => s.id === value)
        if (sf) {
            dispatch.snp.getSnp({ st: value, req: { standId: sf.standId, flangeId: sf.flangeId } })
        }
    }

    // изменение типа прокадки и связанных значений
    const changeTypeHandler = (type: string, snp: ISNP, isNew: boolean) => {
        if (isNew) {
            // setSnp(prev => [...prev, snp])
            // setCurSnp(snp)
            // setType(type)
        } else {
            // setSnp(prev => prev.filter(s => s.typePr !== type))
            // if (curSnp?.typePr === type) setCurSnp(null)
        }
    }
    const typeHandler = (type: string, snp: ISNP, isNew: boolean | undefined) => {
        console.log(type, snp, isNew)
        // if (isNew) setSnp(prev => [...prev, snp])
        // setType(type)
        // setCurSnp(snp)
    }
    const denyTypeHandler = () => {
        // setSnp(prev => prev.filter(s => s.id !== "new"))
    }

    // добавление сохраненной проклаки
    const savedSnpHandler = (id: string, type: string, newSnp: ISNP | null) => {
        // if (curSnp?.id === "new") {
        //     let tmp = [...snp]
        //     if (newSnp) tmp = [...snp, newSnp]
        //     const idx = tmp.findIndex(s => s.id === "new")
        //     tmp[idx] = { ...curSnp, id }
        //     setSnp(tmp)
        // }
        // setType(type)
        // setCurSnp(newSnp)
    }
    const sendHandler = (isSend: boolean) => dispatch.snp.setLoading(isSend)

    return (
        <>
            <div className={classes.line}>
                {stfl && (
                    <Select value={st} onChange={stHandler}>
                        {stfl.map(s => (
                            <Option key={s.id} value={s.id}>
                                {s.stand} / {s.flange}
                            </Option>
                        ))}
                    </Select>
                )}
                {/* <Button>Добавить</Button> */}
            </div>
            <div className={classes.group}>
                <p>Тип СНП</p>
                <div className={classes.line}>
                    <AdminType
                        type={snp?.typePr || ""}
                        snps={snps}
                        st={st}
                        snp={snp}
                        clickHandler={typeHandler}
                        changeHandler={changeTypeHandler}
                        denyHandler={denyTypeHandler}
                        saveHandler={savedSnpHandler}
                        sendHandler={sendHandler}
                    />
                </div>
            </div>
        </>
    )
}
