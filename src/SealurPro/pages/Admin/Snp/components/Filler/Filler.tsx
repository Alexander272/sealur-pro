import { FC, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AdminFiller } from "../../../components/AdminFiller/AdminFiller"
import { AdminMod } from "../../../components/AdminMod/AdminMod"
import { AdminTemp } from "../../../components/AdminTemp/AdminTemp"
import { Dispatch, ProState } from "../../../../../store/store"
import { IFiller, ITemperature } from "../../../../../types/snp"
import classes from "../../../pages.module.scss"

type Props = {}

export const Filler: FC<Props> = () => {
    const snp = useSelector((state: ProState) => state.snp.snp)
    const filler = useSelector((state: ProState) => state.snp.filler)
    const temp = useSelector((state: ProState) => state.snp.temp)

    const [temps, setTemps] = useState<ITemperature[]>([])
    const [mods, setMods] = useState<string[]>([])

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        const fil = snp?.fillers.find(f => f.id === filler)
        setTemps(fil?.temps || [])
    }, [snp?.fillers, filler])

    useEffect(() => {
        const fil = snp?.fillers.find(f => f.id === filler)
        const mods = fil?.temps.find(t => t.id === temp)
        setMods(mods?.mods || [])
    }, [filler, temp, snp?.fillers])

    const sendHandler = (isSend: boolean) => dispatch.snp.setLoading(isSend)

    // измение наполнителя и связанных значений
    const chosefillerHandler = (filler: IFiller, fillers: IFiller[]) => {
        dispatch.snp.setFil(filler.id)
        dispatch.snp.setTemp(filler.temps[0]?.id || "")

        if (fillers.length && snp) dispatch.snp.setSnp({ ...snp, fillers })
    }

    const changeFillerHandler = (fillers: IFiller[], selected: boolean) => {
        if (selected) {
            dispatch.snp.setFil("")
            dispatch.snp.setTemp("")
        }
        if (snp) dispatch.snp.setSnp({ ...snp, fillers })
    }

    // измение температуры
    const choseTempHandler = (temp: ITemperature, temps: ITemperature[]) => {
        dispatch.snp.setTemp(temp.id)

        if (temps.length && snp) {
            const newFiller = [...snp.fillers]
            const idx = newFiller.findIndex(f => f.id === filler)
            newFiller[idx] = { id: filler, temps }

            dispatch.snp.setSnp({ ...snp, fillers: newFiller })
        }
    }
    const changeTempHandler = (temps: ITemperature[], selected: boolean) => {
        if (selected) {
            dispatch.snp.setTemp("")
        }
        if (snp) {
            const newFiller = [...snp.fillers]
            const idx = newFiller.findIndex(f => f.id === filler)
            newFiller[idx] = { id: filler, temps }

            dispatch.snp.setSnp({ ...snp, fillers: newFiller })
        }
    }

    // измениние модифицирующего элемента
    const changeModHandler = (mods: string[]) => {
        if (snp) {
            const newFiller = [...snp.fillers]
            const idx = newFiller.findIndex(f => f.id === filler)

            const tempIdx = newFiller[idx].temps.findIndex(t => t.id === temp)
            const newTemps = [...newFiller[idx].temps]
            newTemps[tempIdx] = { id: temp, mods }

            newFiller[idx] = { id: filler, temps: newTemps }
            dispatch.snp.setSnp({ ...snp, fillers: newFiller })
        }
    }

    return (
        <>
            <div className={classes.line}>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Тип наполнителя</p>
                    <AdminFiller
                        fillers={[...(snp?.fillers || [])]}
                        filler={filler}
                        sendHandler={sendHandler}
                        clickHandler={chosefillerHandler}
                        changeHandler={changeFillerHandler}
                    />
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Температура эксплуатации</p>
                    <AdminTemp
                        temps={[...temps]}
                        temp={temp}
                        filler={filler}
                        clickHandler={choseTempHandler}
                        changeHandler={changeTempHandler}
                    />
                </div>
                <div className={classes.fil}>
                    <p className={classes.titleGroup}>Модифицирующий элемент</p>
                    <AdminMod
                        mods={[...mods]}
                        temp={temp}
                        filler={filler}
                        clickHandler={changeModHandler}
                    />
                </div>
            </div>
        </>
    )
}
