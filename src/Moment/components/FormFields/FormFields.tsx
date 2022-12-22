import React, { FC } from "react"
import { Control, Controller, UseFormRegister } from "react-hook-form"
import { Input } from "../../../components/UI/Input/Input"
import { IDataSchema } from "../../types/schemes"
import { Container } from "../Container/Container"
import classes from "../../pages/styles/page.module.scss"
import { Select } from "../../../components/UI/Select/Select"

const { Option } = Select

type Props = {
    title: string
    schema: IDataSchema[]
    register: UseFormRegister<any>
    control: Control<any, any>
    errors: any
}

export const FormFields: FC<Props> = ({ title, schema, register, control, errors }) => {
    const renderFields = () => {
        return schema.map(s => {
            if (s.fieldInput) {
                let someFields = {}
                if (s.fieldInput.type === "number") someFields = { ...someFields, step: 0.001 }
                return (
                    <div key={s.fieldInput.name} className={classes.line}>
                        <p>{s.title}</p>
                        <div className={classes["line-field"]}>
                            <Input
                                name={s.fieldInput.name}
                                id={s.fieldInput.name}
                                type={s.fieldInput.type}
                                register={register}
                                suffix={s.fieldInput.suffix}
                                rule={{ required: true }}
                                error={errors[s.fieldInput.name]}
                                {...someFields}
                            />
                        </div>
                    </div>
                )
            }
            if (s.fieldSelect) {
                return (
                    <div key={s.fieldSelect.name} className={classes.line}>
                        <p>{s.title}</p>
                        <div className={classes["line-field"]}>
                            <Controller
                                name={s.fieldSelect.name}
                                control={control}
                                render={({ field }) => (
                                    <Select value={field.value} onChange={field.onChange}>
                                        {s.fieldSelect!.options.map(o => (
                                            <Option key={o.value} value={o.value}>
                                                {o.title}
                                            </Option>
                                        ))}
                                    </Select>
                                )}
                            />
                        </div>
                    </div>
                )
            }
            return null
        })
    }

    return <Container title={title}>{renderFields()}</Container>
}
