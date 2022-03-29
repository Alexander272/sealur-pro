import React from "react"
import { useSelector } from "react-redux"
import { ProState } from "../../store/store"
import { Select } from "../../../components/UI/Select/Select"
import { replaceArray } from "../../utils/utils"
import { IGrap } from "../../types/addit"

type Props = {
    className: string
    classTitle: string
    value: string
    onChange: (value: string) => void
    grap: string[]
}

const { Option } = Select

export const Graphite: React.VFC<Props> = ({ className, classTitle, value, onChange, grap }) => {
    const addit = useSelector((state: ProState) => state.addit.addit)

    const renderGrap = () => {
        const graphite: IGrap[] = replaceArray(grap, addit?.graphite || [], "short")
        return graphite?.map(g => {
            return (
                <Option key={g.short} value={g.short}>
                    {g.short} {g.title}
                </Option>
            )
        })
    }

    return (
        <div className={className}>
            <p className={classTitle}>Степень чистоты графитовой составляющей</p>
            <Select value={value} onChange={onChange}>
                {renderGrap()}
            </Select>
        </div>
    )
}
