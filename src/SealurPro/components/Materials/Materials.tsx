import React from "react"
import { useSelector } from "react-redux"
import { replaceArray, splitString } from "../../utils/utils"
import { ProState } from "../../store/store"
import { Select } from "../../../components/UI/Select/Select"
import { IMat } from "../../types/addit"

type Props = {
    className: string
    classTitle: string
    value: string
    onChange: (value: string) => void
    onOpen?: (isOpen: boolean) => void
    mater: string[]
    title: string
    disabled?: boolean
}

const { Option } = Select

export const Materials: React.VFC<Props> = ({
    className,
    classTitle,
    value,
    onChange,
    mater,
    onOpen,
    title,
    disabled,
}) => {
    const addit = useSelector((state: ProState) => state.addit.addit)
    if (!addit) return <></>
    // TODO исправить

    const renderMat = () => {
        const mat: IMat[] = replaceArray(mater, addit?.materials || [], "short")

        return mat?.map(m => {
            return (
                <Option key={m.short} value={m.short}>
                    {m.short} {m.title}
                </Option>
            )
        })
    }

    return (
        <div className={className}>
            <p className={classTitle}>{title}</p>
            {
                <Select value={value} onChange={onChange} onOpen={onOpen} disabled={disabled}>
                    {renderMat()}
                </Select>
            }
        </div>
    )
}
