import { FC } from "react"
import { useSelector } from "react-redux"
import { Select } from "../../../components/UI/Select/Select"
import { ProState } from "../../store/store"
import { ICoating } from "../../types/addit"
import { replaceArray } from "../../utils/utils"

const { Option } = Select

type Props = {
    value: string
    coating: string[]
    onChange: (value: string) => void
    className: string
    classTitle: string
}

export const Coating: FC<Props> = ({ value, coating, onChange, className, classTitle }) => {
    const addit = useSelector((state: ProState) => state.addit.addit)

    const renderOption = () => {
        const coat: ICoating[] = replaceArray(coating, addit?.coating || [], "id")
        return coat?.map(c => {
            return (
                <Option key={c.id} value={c.id}>
                    {c.id} {c.title}
                </Option>
            )
        })
    }

    return (
        <>
            {addit?.coating && (
                <div className={className}>
                    <p className={classTitle}>Способ исполнения</p>
                    <Select value={value} onChange={onChange}>
                        {renderOption()}
                    </Select>
                </div>
            )}
        </>
    )
}
