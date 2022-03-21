import { FC } from "react"
import { useSelector } from "react-redux"
import { RootState } from "../../store/store"
import { Checkbox } from "../UI/Checkbox/Checkbox"
import classes from "./temp.module.scss"

type Props = {
    tm: string
    temp: string
}

export const AdminTemp: FC<Props> = ({ tm, temp }) => {
    const addit = useSelector((state: RootState) => state.addit.addit)

    const addTempHandler = (temp: string) => () => {
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

        // setTm(tmp.join("@"))
    }

    const tempHandler = (temp: string) => () => {
        // let isTemp = false
        // tm.split("@").forEach(t => {
        //     if (t.split(">")[0] === temp) isTemp = true
        // })

        const isTemp = tm.split("@").find(t => t.split(">")[0] === temp)

        // if (isTemp) setTemp(temp)
        //TODO можно выбирать температуры при ее добавлении
        // else toast.error("Перед выбором необходимо добавить температуру")
    }

    const renderTemp = () => {
        return addit?.temperature.split(";").map(t => {
            const parts = t.split("@")
            let isAdded = false

            tm.split("@").forEach(t => {
                if (t.split(">")[0] === parts[0]) isAdded = true
            })

            return (
                <div key={parts[0]} className={classes.listItem}>
                    <Checkbox
                        name={parts[1]}
                        id={parts[1]}
                        checked={isAdded}
                        onChange={addTempHandler(parts[0])}
                    />
                    <p
                        className={`${classes.filItem} ${temp === parts[0] ? classes.active : ""}`}
                        onClick={tempHandler(parts[0])}
                    >
                        {parts[1]}
                    </p>
                </div>
            )
        })
    }

    return (
        <>{addit?.temperature && <div className={`${classes.list} scroll`}>{renderTemp()}</div>}</>
    )
}
