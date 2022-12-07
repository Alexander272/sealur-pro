import React, { FC, memo, useEffect } from "react"
import { Control, Controller, UseFormRegister, UseFormSetValue, useWatch } from "react-hook-form"
import useSWR from "swr"
import { Select } from "../../../../../components/UI/Select/Select"
import { Container } from "../../../../components/Container/Container"
import ReadService from "../../../../service/read"
import { INameGasket } from "../../../../types/device"
import { IEnv, IGasket } from "../../../../types/flange"
import { IGasCoolingForm } from "../../../../types/gasCooling"
import classes from "../../../styles/page.module.scss"

const { Option } = Select

type Props = {
    gasket: IGasket[]
    env: IEnv[]
    register: UseFormRegister<IGasCoolingForm>
    control: Control<IGasCoolingForm, any>
    setValue: UseFormSetValue<IGasCoolingForm>
    errors: any
}

const Gasket: FC<Props> = ({ gasket = [], env, control, register, setValue, errors }) => {
    const gasketId = useWatch({ control, name: "gasket.gasketId" })
    const factorId = useWatch({ control, name: "factorId" })
    const pressureId = useWatch({ control, name: "pressureId" })
    const numberOfMovesId = useWatch({ control, name: "numberOfMovesId" })

    const { data: res } = useSWR<{ data: INameGasket[] }>(
        factorId && pressureId && numberOfMovesId
            ? [
                  "/sealur-moment/name-gasket/full",
                  [
                      { name: "finId", value: factorId },
                      { name: "presId", value: pressureId },
                      { name: "numId", value: numberOfMovesId },
                  ],
              ]
            : null,
        ReadService.getData
    )

    useEffect(() => {
        if (!gasketId) {
            setValue("gasket.gasketId", gasket[0]?.id || "")
            setValue("gasket.envId", env[0].id)
            setValue("gasket.thickness", gasket[0]?.thickness[0].toString() || "3")
        }
    }, [setValue, gasket, gasketId, env])

    useEffect(() => {
        setValue(
            "gasket.thickness",
            gasket.find(g => g.id === gasketId)?.thickness[0].toString() || "3"
        )
    }, [setValue, gasketId, gasket])

    useEffect(() => {
        if (res && res.data) {
            setValue("gasket.nameId", res.data[0].id)
        }
    }, [res, setValue])

    return (
        <Container title='Исходные данные для прокладки'>
            <div className={classes.line}>
                <p>Тип прокладки</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='gasket.gasketId'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {gasket.map(g => (
                                    <Option key={g.id} value={g.id}>
                                        {g.title}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Уплотняемая среда</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='gasket.envId'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {env.map(e => (
                                    <Option key={e.id} value={e.id}>
                                        {e.title}
                                    </Option>
                                ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Толщина прокладки</p>
                <div className={classes["line-field"]}>
                    <Controller
                        name='gasket.thickness'
                        control={control}
                        render={({ field }) => (
                            <Select value={field.value} onChange={field.onChange}>
                                {gasket
                                    .find(g => g.id === gasketId)
                                    ?.thickness.map(t => (
                                        <Option key={t} value={t.toString()}>
                                            {t.toLocaleString("ru-RU")}
                                        </Option>
                                    ))}
                            </Select>
                        )}
                    />
                </div>
            </div>

            {res?.data && (
                <div className={classes.line}>
                    <p>Тип прокладки</p>
                    <div className={classes["line-field"]}>
                        <Controller
                            name='gasket.nameId'
                            control={control}
                            render={({ field }) => (
                                <Select
                                    value={field.value}
                                    onChange={field.onChange}
                                    disabled={(res?.data.length || 0) < 2}
                                >
                                    {res?.data.map(n => (
                                        <Option key={n.id} value={n.id}>
                                            {n.title}
                                        </Option>
                                    ))}
                                </Select>
                            )}
                        />
                    </div>
                </div>
            )}
        </Container>
    )
}

export const InitDataForGasket = memo(Gasket)
