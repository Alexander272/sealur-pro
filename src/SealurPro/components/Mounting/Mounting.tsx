import { ChangeEvent } from "react"
import { useSelector } from "react-redux"
import { replaceArray } from "../../utils/utils"
import { ProState } from "../../store/store"
import { Checkbox } from "../../../components/UI/Checkbox/Checkbox"
import { Select } from "../../../components/UI/Select/Select"
import { IMoun } from "../../types/addit"
import classes from "./mounting.module.scss"

type Props = {
    className: string
    checked: boolean
    checkedHandler: (event: ChangeEvent<HTMLInputElement>) => void
    mounting: string[]
    value: string
    valueHandler: (value: string) => void
}

const { Option } = Select

export const Mounting: React.VFC<Props> = ({
    className,
    checked,
    checkedHandler,
    mounting,
    value,
    valueHandler,
}) => {
    const addit = useSelector((state: ProState) => state.addit.addit)

    const renderOption = () => {
        const moun: IMoun[] = replaceArray(mounting, addit?.mounting || [], "id")

        return moun?.map(m => {
            return (
                <Option key={m.id} value={m.title}>
                    {m.title}
                </Option>
            )
        })
    }

    return (
        <div className={className}>
            <Checkbox
                id='mouun'
                name='moun'
                label='Крепление на вертикальном фланце'
                checked={checked}
                onChange={checkedHandler}
            />
            {checked && (
                <div className={classes.box}>
                    {mounting && (
                        <Select value={value!} onChange={valueHandler!}>
                            {renderOption()}
                        </Select>
                    )}
                </div>
            )}
        </div>
    )
}
