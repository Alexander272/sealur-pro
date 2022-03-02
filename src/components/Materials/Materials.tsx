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
    onOpen?: (isOpen: boolean) => void
    mater: string
}

const { Option } = Select

export const Materials: React.VFC<Props> = ({
    className,
    classTitle,
    value,
    onChange,
    mater,
    onOpen,
}) => {
    const addit = useSelector((state: RootState) => state.addit.addit)
    if (!addit) return <></>

    const renderMat = () => {
        const str = mater.substring(mater.indexOf(";") + 1)
        const mat = splitString(str, addit?.materials || "", ";")

        return mat?.map(m => {
            const parts = m.split("@")
            return (
                <Option key={parts[0]} value={parts[0]}>
                    {parts[0]} {parts[1]}
                </Option>
            )
        })
    }

    return (
        <div key={mater.split(";")[0]} className={className}>
            <p className={classTitle}>{mater.split(";")[0]}</p>
            {
                <Select value={value} onChange={onChange} onOpen={onOpen}>
                    {renderMat()}
                </Select>
            }
        </div>
    )
}
