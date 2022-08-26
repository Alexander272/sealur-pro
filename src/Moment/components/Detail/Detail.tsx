import React, { FC } from "react"
import { Control, UseFormRegister, useWatch } from "react-hook-form"
import { Checkbox } from "../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../components/UI/Input/Input"
import classes from "./detail.module.scss"

type Props = {
    register: UseFormRegister<any>
    control: Control<any, any>
    errors: any
}

export const Detail: FC<Props> = ({ register, errors, control }) => {
    const hasDetail = useWatch({ control, name: "detailData.hasDetail" })

    return (
        <div className={classes.container}>
            <Checkbox
                id='hasDetail'
                name='detailData.hasDetail'
                register={register}
                label='Подробное описание позиции'
            />

            {hasDetail && (
                <>
                    <div className={classes.line}>
                        <p>Предприятие</p>
                        <div className={classes["line-field"]}>
                            <Input
                                name='detailData.organization'
                                id='detailData.organization'
                                register={register}
                                rule={{ required: true }}
                                error={errors.detailData?.organization}
                            />
                        </div>
                    </div>
                    <div className={classes.line}>
                        <p>Установка</p>
                        <div className={classes["line-field"]}>
                            <Input
                                name='detailData.facility'
                                id='detailData.facility'
                                register={register}
                                rule={{ required: true }}
                                error={errors.detailData?.facility}
                            />
                        </div>
                    </div>
                    <div className={classes.line}>
                        <p>Оборудование</p>
                        <div className={classes["line-field"]}>
                            <Input
                                name='detailData.equipment'
                                id='detailData.equipment'
                                register={register}
                                rule={{ required: true }}
                                error={errors.detailData?.equipment}
                            />
                        </div>
                    </div>
                    <div className={classes.line}>
                        <p>Узел</p>
                        <div className={classes["line-field"]}>
                            <Input
                                name='detailData.node'
                                id='detailData.node'
                                register={register}
                                rule={{ required: true }}
                                error={errors.detailData?.node}
                            />
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}
