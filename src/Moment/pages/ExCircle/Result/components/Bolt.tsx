import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { IBoltResult } from "../../../../types/res_exCircle"
import { formatNumber } from "../../../../utils/format"
import { Line } from "../../../Flange_old/Calc/components/Line"

type Props = {
    data: IBoltResult
}

export const Bolt: FC<Props> = ({ data }) => {
    return (
        <Container title='Исходные данные для болтов/шпилек'>
            <Line
                title='Наружный диаметр болта (шпильки)'
                designation={<i>d</i>}
                res={formatNumber(data.diameter)}
                units='мм'
            />
            <Line
                title='Площадь болта (шпильки)'
                designation={
                    <i>
                        f<sub>б</sub>
                    </i>
                }
                res={formatNumber(data.area)}
                units='мм&#178;'
            />
            <Line
                title='Число болтов (шпилек)'
                designation={<i>n</i>}
                res={formatNumber(data.count)}
            />

            <Line title='Материал фланца' res={data.material} />
            <Line
                title='Модуль продольной упругости материала болта (шпильки) при температуре 20 &#8451;'
                designation={
                    <i>
                        &#917;<sub>б</sub>
                        <sup>20</sup>
                    </i>
                }
                res={formatNumber(data.epsilonAt20)}
                units='МПа'
            />
            <Line
                title='Допускаемое напряжение для болтов (шпилек) при затяжке'
                designation={
                    <>
                        [<i>&sigma;</i>]<sub>б</sub>
                        <sup>м</sup>
                    </>
                }
                res={formatNumber(data.sigmaAt20)}
                units='МПа'
            />
        </Container>
    )
}
