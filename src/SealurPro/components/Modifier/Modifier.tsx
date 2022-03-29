import { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { Select } from "../../../components/UI/Select/Select"
import { ProState } from "../../store/store"
import { ITemperature } from "../../types/snp"

const { Option } = Select

type Props = {
    modifier: string
    modHandler: (value: string) => void
    temps: ITemperature[]
    className: string
    classTitle: string
}

export const Modifier: FC<Props> = ({ modifier, modHandler, temps, className, classTitle }) => {
    const mods = useSelector((state: ProState) => state.addit.addit?.mod)

    const renderModOption = () => {
        const modifiers = temps.flatMap(t => t.mods)

        return mods?.map(mod => {
            if (!modifiers.some(m => m === mod.id)) return <Fragment key={mod.id}></Fragment>
            return (
                <Option key={mod.id} value={mod.id}>
                    {mod.short}
                </Option>
            )
        })
    }

    return (
        <>
            {mods && (
                <div className={className}>
                    <p className={classTitle}>Модифицирующий элемент</p>
                    <Select value={modifier} onChange={modHandler}>
                        {renderModOption()}
                    </Select>
                </div>
            )}
        </>
    )
}
