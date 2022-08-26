import React, { FC } from "react"
import { Control, UseFormRegister, useWatch } from "react-hook-form"
import { Checkbox } from "../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../components/UI/Input/Input"
import classes from "./person.module.scss"

type Props = {
    register: UseFormRegister<any>
    control: Control<any, any>
    errors: any
}

export const Person: FC<Props> = ({ register, errors, control }) => {
    const hasPerson = useWatch({ control, name: "personData.hasPerson" })

    return (
        <div className={classes.container}>
            <Checkbox
                id='hasPerson'
                name='personData.hasPerson'
                register={register}
                label={"Данные о заполняющих"}
            />

            {hasPerson && (
                <>
                    <div className={classes.line}>
                        <p>Должность руководителя</p>
                        <div className={classes["line-field"]}>
                            <Input
                                name='personData.supervisor.position'
                                id='supervisor.position'
                                register={register}
                                rule={{ required: true }}
                                error={errors.personData?.supervisor?.position}
                            />
                        </div>
                    </div>
                    <div className={classes.line}>
                        <p>ФИО руководителя</p>
                        <div className={classes["line-field"]}>
                            <Input
                                name='personData.supervisor.name'
                                id='supervisor.name'
                                register={register}
                                rule={{ required: true }}
                                error={errors.personData?.supervisor?.name}
                            />
                        </div>
                    </div>
                    <div className={classes.line}>
                        <p>Должность исполнителя</p>
                        <div className={classes["line-field"]}>
                            <Input
                                name='personData.performer.position'
                                id='performer.position'
                                register={register}
                                rule={{ required: true }}
                                error={errors.personData?.performer?.position}
                            />
                        </div>
                    </div>
                    <div className={classes.line}>
                        <p>ФИО исполнителя</p>
                        <div className={classes["line-field"]}>
                            <Input
                                name='personData.performer.name'
                                id='performer.name'
                                register={register}
                                rule={{ required: true }}
                                error={errors.personData?.performer?.name}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
