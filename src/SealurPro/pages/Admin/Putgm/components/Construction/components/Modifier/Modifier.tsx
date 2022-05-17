import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Checkbox } from "../../../../../../../../components/UI/Checkbox/Checkbox"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IGrap } from "../../../../../../../types/putg"
import classes from "../graphite.module.scss"

type Props = {}

export const Modifier: FC<Props> = () => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    const putg = useSelector((state: ProState) => state.putg.putg)
    const grap = useSelector((state: ProState) => state.putg.grap)
    const temp = useSelector((state: ProState) => state.putg.temp)

    const dispatch = useDispatch<Dispatch>()

    const addModHandler = (mod: string) => () => {
        if (temp === "") {
            toast.error("Температура не выбрана")
            return
        }

        const temperatures: IGrap[] = JSON.parse(JSON.stringify(putg?.temperatures)) || []

        const idx = temperatures.findIndex(t => t.grap === grap)
        const mIdx = temperatures[idx].temps?.findIndex(t => t.id === temp)

        if (temperatures[idx].temps[mIdx].mods.includes(mod)) {
            temperatures[idx].temps[mIdx].mods = temperatures[idx].temps[mIdx].mods.filter(
                m => m !== mod
            )
        } else {
            temperatures[idx].temps[mIdx].mods.push(mod)
        }

        if (putg) dispatch.putg.setPutg({ ...putg, temperatures })
    }

    const renderMod = () => {
        const temps = putg?.temperatures.find(t => t.grap === grap)?.temps
        const mods = temps?.find(t => t.id === temp)?.mods || []

        return addit?.mod.map(m => {
            let idx = mods.findIndex(mod => mod === m.id)

            return (
                <div key={m.id} className={classes.listItem}>
                    <Checkbox
                        name={`mod-${m.id}`}
                        id={`mod-${m.id}`}
                        checked={idx > -1}
                        onChange={addModHandler(m.id)}
                        label={m.title}
                    />
                    {idx > -1 ? <p className={classes.count}>({idx + 1})</p> : null}
                </div>
            )
        })
    }

    return <>{addit?.mod && <div className={`${classes.list} scroll`}>{renderMod()}</div>}</>
}
