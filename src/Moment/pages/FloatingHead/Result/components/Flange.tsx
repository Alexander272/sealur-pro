import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { IFlangeResult } from "../../../../types/res_float"
import { formatNumber } from "../../../../utils/format"
import { Line } from "../../../Flange_old/Calc/components/Line"

type Props = {
    data: IFlangeResult
}

export const Flange: FC<Props> = ({ data }) => {
    return (
        <Container title='Исходные данные для фланца плавающей головки'>
            <Line
                title='Наружный диаметр фланца'
                designation={
                    <i>
                        D<sub>н</sub>
                    </i>
                }
                res={formatNumber(data.dOut)}
                units='мм'
            />
            <Line
                title='Внутренний диаметр фланца'
                designation={<i>D</i>}
                res={formatNumber(data.d)}
                units='мм'
            />
            <Line
                title='Диаметр окружности расположения болтов (шпилек)'
                designation={
                    <i>
                        D<sub>6</sub>
                    </i>
                }
                res={formatNumber(data.d6)}
                units='мм'
            />

            {data.width && (
                <Line
                    title='Ширина шипа'
                    designation={
                        <i>
                            T<sub>ш</sub>
                        </i>
                    }
                    res={formatNumber(data.width)}
                    units='мм'
                />
            )}
            {data.dIn && (
                <Line
                    title='Внутренний диаметр шипа'
                    designation={
                        <i>
                            D<sub>вн.ш</sub>
                        </i>
                    }
                    res={formatNumber(data.dIn)}
                    units='мм'
                />
            )}

            <Line
                title='Расчетная температура фланца'
                designation={
                    <i>
                        t<sub>ф</sub>
                    </i>
                }
                res={formatNumber(data.tf)}
                units='&#8451;'
            />

            <Line title='Материал фланца' res={data.material} />

            <Line
                title='Модуль продольной упругости материала фланца при температуре 20 &#8451;'
                designation={
                    <i>
                        &#917;<sup>20</sup>
                    </i>
                }
                res={formatNumber(data.epsilonAt20)}
                units='МПа'
            />
            <Line
                title='Модуль продольной упругости материала фланца при расчетной температуре'
                designation={<i>&#917;</i>}
                res={formatNumber(data.epsilon)}
                units='МПа'
            />

            <Line
                title='Допускаемое напряжение для материала фланца или бурта свободного фланца при температуре 20 &#8451;'
                designation={
                    <>
                        [<i>&sigma;</i>]<sup>20</sup>
                    </>
                }
                res={formatNumber(data.sigmaAt20)}
                units='МПа'
            />
            <Line
                title='Допускаемое напряжение для материала фланца или бурта свободного фланца при расчетной температуре'
                designation={
                    <>
                        [<i>&sigma;</i>]
                    </>
                }
                res={formatNumber(data.sigma)}
                units='МПа'
            />
        </Container>
    )
}
