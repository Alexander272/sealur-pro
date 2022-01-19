import { FC, memo } from "react"
import { IOption } from "../../types/Option"
import { Select } from "../UI/Select/Select"
import classes from "./block.module.scss"

type Props = {
    title: string
    value: string
    data: IOption[]
    isInline?: boolean
    isOrigSize?: boolean
    changeValue: () => void
}

const { Option } = Select

export const BlockSelect: FC<Props> = memo(
    ({ title, value, data, isInline, isOrigSize, changeValue }) => {
        return (
            <div
                className={`${classes.group} ${isInline ? classes.inline : ""} ${
                    isOrigSize ? classes.mater : ""
                }`}
            >
                <p className={classes.titleGroup}>{title}</p>
                <Select value={value} onChange={changeValue}>
                    {data.map(d => (
                        <Option key={d.id} value={d.value}>
                            {d.title}
                        </Option>
                    ))}
                </Select>
            </div>
        )
    }
)
