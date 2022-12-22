import React, { FC } from "react"
import { Controller, useFormContext } from "react-hook-form"
import { Select } from "../../../../../components/UI/Select/Select"
import { ElementSelect, ElementVariant } from "../../../../types/elements"
import classes from "./form.module.scss"

type Props = {
    element: ElementVariant
}

export const StepElement: FC<Props> = ({ element }) => {
    const { control } = useFormContext()

    switch (element.type) {
        case "Select":
            return (
                <div className={classes.element}>
                    {element.label && <p className={classes["element-title"]}>{element.label}</p>}
                    <Controller
                        key={element.name}
                        control={control}
                        name={element.name}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {(element as ElementSelect).data.map(d => (
                                    <Select.Option key={d.id} value={d.id}>
                                        {d.title}
                                    </Select.Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            )

        default:
            return null
    }
}
