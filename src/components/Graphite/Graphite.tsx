import React from "react"
import { useSelector } from "react-redux"
import { splitString } from "../../service/utils"
import { RootState } from "../../store/store"
import { Select } from "../UI/Select/Select"

type Props = {
    className: string
    classTitle: string
    value: string
    onChange: (value: string) => void
    grap: string
}

const { Option } = Select

export const Graphite: React.VFC<Props> = ({ className, classTitle, value, onChange, grap }) => {
    const addit = useSelector((state: RootState) => state.addit.addit)

    const renderGrap = () => {
        const graphite = splitString(grap, addit?.graphite || "")

        return graphite?.map(g => {
            const parts = g.split("@")
            return (
                <Option key={parts[0]} value={parts[0]}>
                    {parts[0]} {parts[1]}
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
