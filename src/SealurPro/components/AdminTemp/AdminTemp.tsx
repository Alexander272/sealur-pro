import { FC } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { ProState } from "../../store/store"
import { Checkbox } from "../../../components/UI/Checkbox/Checkbox"
import classes from "./temp.module.scss"

type Props = {
    tm: string
    temp: string
    filler: string
    clickHandler: (temp: string, temps: string) => void
    changeHandler: (temp: string, selected: boolean) => void
}

export const AdminTemp: FC<Props> = ({ tm, temp, filler, clickHandler, changeHandler }) => {
    const addit = useSelector((state: ProState) => state.addit.addit)

    // TODO исправить
    const changeTemp = (temp: string) => {
        let tmp = tm.split("@")
        if (tmp[0] === "") tmp = []
        let orig = ""
        tmp.forEach(t => {
            if (t.split(">")[0] === temp) orig = t
            return ""
        })

        if (orig === "") {
            tmp.push(`${temp}>`)
            tmp.sort((a, b) => {
                return +a.split(">")[0] - +b.split(">")[0]
            })
        } else {
            tmp = tmp.filter(t => t.split(">")[0] !== temp)
        }

        return tmp.join("@")
    }

    const changeTempHandler = (t: string) => () => {
        if (!filler) {
            toast.error("Наполнитель не выбран")
            return
        }
        const temps = changeTemp(t)
        changeHandler(temps, t === temp)
    }

    const tempHandler = (temp: string) => () => {
        if (!filler) {
            toast.error("Наполнитель не выбран")
            return
        }
        const isTemp = tm.split("@").find(t => t.split(">")[0] === temp)
        if (isTemp) {
            clickHandler(temp, "")
        } else {
            const temps = changeTemp(temp)
            clickHandler(temp, temps)
        }
    }

    // const renderTemp = () => {
    //     return addit?.temperature.split(";").map(t => {
    //         const parts = t.split("@")
    //         let isAdded = false

    //         tm.split("@").forEach(t => {
    //             if (t.split(">")[0] === parts[0]) isAdded = true
    //         })

    //         return (
    //             <div key={parts[0]} className={classes.listItem}>
    //                 <Checkbox
    //                     name={parts[1]}
    //                     id={parts[1]}
    //                     checked={isAdded}
    //                     onChange={changeTempHandler(parts[0])}
    //                 />
    //                 <p
    //                     className={`${classes.filItem} ${temp === parts[0] ? classes.active : ""}`}
    //                     onClick={tempHandler(parts[0])}
    //                 >
    //                     {parts[1]}
    //                 </p>
    //             </div>
    //         )
    //     })
    // }

    return (
        <>
            {
                // addit?.temperature && <div className={`${classes.list} scroll`}>{renderTemp()}</div>
            }
        </>
    )
}
