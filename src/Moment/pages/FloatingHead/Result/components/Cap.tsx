import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { ICapResult } from "../../../../types/res_float"
import { formatNumber } from "../../../../utils/format"
import { Line } from "../../../Flange/Calc/components/Line"

type Props = {
    data: ICapResult
}

export const Cap: FC<Props> = ({ data }) => {
    return (
        <Container title='Исходные данные для крышки'>
            <Line
                title='Толщина тарелки фланца на крышке'
                designation={<i>h</i>}
                res={formatNumber(data.h)}
                units='мм'
            />
            <Line
                title='Радиус кривизны днища сферической неотбортованной крышки'
                designation={
                    <i>
                        R<sub>c</sub>
                    </i>
                }
                res={formatNumber(data.radius)}
                units='мм'
            />
            <Line
                title='Толщина донышка плавающей головки'
                designation={
                    <i>
                        s<sub>1пл</sub>
                    </i>
                }
                res={formatNumber(data.s)}
                units='мм'
            />
            <Line
                title='Температура крышки'
                designation={
                    <i>
                        T<sub>кр</sub>
                    </i>
                }
                res={formatNumber(data.t)}
                units='&#8451;'
            />

            <Line title='Материал фланца' res={data.material} />
            <Line
                title='Модуль продольной упругости материала крышки при температуре 20 &#8451;'
                designation={
                    <i>
                        &#917;<sup>20</sup>
                        <sub>кр</sub>
                    </i>
                }
                res={formatNumber(data.epsilonAt20)}
                units='МПа'
            />
            <Line
                title='Модуль продольной упругости материала крышки при расчетной температуре'
                designation={
                    <i>
                        &#917;<sub>кр</sub>
                    </i>
                }
                res={formatNumber(data.epsilon)}
                units='МПа'
            />
        </Container>
    )
}
