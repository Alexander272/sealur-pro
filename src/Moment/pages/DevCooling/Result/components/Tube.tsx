import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { ITubeResult } from "../../../../types/res_devCooling"
import { formatNumber } from "../../../../utils/format"
import { Line } from "../../../Flange_old/Calc/components/Line"

type Props = {
    mounting: string
    data: ITubeResult
}

export const Tube: FC<Props> = ({ mounting, data }) => {
    return (
        <Container title='Исходные данные для труб'>
            <Line
                title='Длина труб'
                designation={<i>L</i>}
                res={formatNumber(data.length)}
                units='мм'
            />
            <Line
                title='Приведенная длина труб при продольном изгибе'
                designation={
                    <i>
                        L<sub>к</sub>
                    </i>
                }
                res={formatNumber(data.reducedLength)}
                units='мм'
            />
            <Line
                title='Наружный диаметр трубы'
                designation={
                    <i>
                        d<sub>Т</sub>
                    </i>
                }
                res={formatNumber(data.diameter)}
                units='мм'
            />
            <Line
                title='Толщина стенки трубы'
                designation={
                    <i>
                        s<sub>T</sub>
                    </i>
                }
                res={formatNumber(data.thickness)}
                units='мм'
            />

            {mounting !== "Приварка" && (
                <Line
                    title='Глубина развальцовки'
                    designation={
                        <i>
                            l<sub>0</sub>
                        </i>
                    }
                    res={formatNumber(data.depth)}
                    units='мм'
                />
            )}
            {mounting !== "Развальцовка" && (
                <Line
                    title='Размер сварного шва приварки труб'
                    designation={
                        <i>
                            a<sub>T</sub>
                        </i>
                    }
                    res={formatNumber(data.size)}
                    units='мм'
                />
            )}

            <Line
                title='Прибавка на коррозию'
                designation={
                    <i>
                        c<sub>T</sub>
                    </i>
                }
                res={formatNumber(data.corrosion)}
                units='мм'
            />

            <Line title='Материал труб' res={data.material} />
            <Line
                title='Модуль продольной упругости труб'
                designation={
                    <i>
                        &#917;<sub>T</sub>
                    </i>
                }
                res={formatNumber(data.epsilon)}
                units='МПа'
            />
            <Line
                title='Допускаемое напряжение при температуре 20 &#8451;'
                designation={
                    <i>
                        [<i>&sigma;</i>]<sub>T</sub>
                        <sup>20</sup>
                    </i>
                }
                res={formatNumber(data.sigmaAt20)}
                units='МПа'
            />
            <Line
                title='Допускаемое напряжение при расчетной температуре'
                designation={
                    <i>
                        [<i>&sigma;</i>]<sub>T</sub>
                    </i>
                }
                res={formatNumber(data.sigma)}
                units='МПа'
            />
        </Container>
    )
}
