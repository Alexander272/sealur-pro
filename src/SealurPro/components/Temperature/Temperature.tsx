import { FC, Fragment } from "react"
import { useSelector } from "react-redux"
import { Select } from "../../../components/UI/Select/Select"
import { ProState } from "../../store/store"
import { ITemperature } from "../../types/snp"

const { Option } = Select

type Props = {
    temp: string
    temps: ITemperature[]
    tempHandler: (value: string) => void
    className: string
    classTitle: string
}

export const Temperature: FC<Props> = ({ temp, tempHandler, temps, className, classTitle }) => {
    const temperature = useSelector((state: ProState) => state.addit.addit?.temperature)

    const renderTempOption = () => {
        return temperature?.map(temp => {
            if (!temps.some(t => t.id === temp.id)) return <Fragment key={temp.id}></Fragment>
            return (
                <Option key={temp.id} value={temp.id}>
                    {temp.title}
                </Option>
            )
        })
    }

    return (
        <>
            {temperature && (
                <div className={className}>
                    <p className={classTitle}>Температура эксплуатации</p>
                    <Select value={temp} onChange={tempHandler}>
                        {renderTempOption()}
                    </Select>
                </div>
            )}
        </>
    )
}
