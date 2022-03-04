import { FC } from "react"
import { IAddit } from "../../types/addit"
import { Select } from "../UI/Select/Select"

type Props = {
    addit: IAddit
    tm: string
    temp: string
    mod: string
    tempHandler: (value: string) => void
    modHandler: (value: string) => void
    className: string
    classTitle: string
}

const { Option } = Select

export const TempMod: FC<Props> = ({
    addit,
    className,
    classTitle,
    temp,
    mod,
    tm,
    tempHandler,
    modHandler,
}) => {
    const renderTempOption = () => {
        const fil = addit.temperature.split(";")
        return tm.split("@").map(t => {
            const idx = t.split(">")[0]
            const parts = fil[+idx].split("@")
            return (
                <Option key={parts[0]} value={parts[0]}>
                    {parts[1]}
                </Option>
            )
        })
    }

    const renderModOption = () => {
        const mod = new Set<string>()
        const m = addit.mod.split(";")

        tm.split("@").forEach(t => {
            const idxs = t.split(">")[1].split(",")
            return idxs.forEach(idx => {
                mod.add(idx)
            })
        })
        return Array.from(mod).map(i => {
            const parts = m[+i].split("@")
            return (
                <Option key={parts[0]} value={parts[0]}>
                    {parts[1]}
                </Option>
            )
        })
    }

    return (
        <>
            {addit?.temperature && (
                <div className={className}>
                    <p className={classTitle}>Температура эксплуатации</p>
                    <Select value={temp} onChange={tempHandler}>
                        {renderTempOption()}
                    </Select>
                </div>
            )}
            {addit?.mod && (
                <div className={className}>
                    <p className={classTitle}>Модифицирующий элемент</p>
                    <Select value={mod} onChange={modHandler}>
                        {renderModOption()}
                    </Select>
                </div>
            )}
        </>
    )
}
