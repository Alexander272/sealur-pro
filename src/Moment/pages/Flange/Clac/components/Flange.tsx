import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { IFlangeResult } from "../../../../types/res_flange"
import { formatNumber } from "../../../../utils/format"
import { Line } from "./Line"

type Props = {
    index: number
    data: IFlangeResult
}

export const Flange: FC<Props> = ({ index, data }) => {
    return (
        <Container title={`Исходные данные для ${index === 0 ? "первого" : "второго"} фланца`}>
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

            {data.dnk && (
                <Line
                    title='Наружный диаметр кольца свободного фланца'
                    designation={
                        <i>
                            D<sub>н.к</sub>
                        </i>
                    }
                    res={formatNumber(data.dnk)}
                    units='мм'
                />
            )}
            {data.dk && (
                <Line
                    title='Внутренний диаметр кольца свободного фланца'
                    designation={
                        <i>
                            D<sub>к</sub>
                        </i>
                    }
                    res={formatNumber(data.dk)}
                    units='мм'
                />
            )}
            {data.ds && (
                <Line
                    title='Наружный диаметр контакта бурта и кольца свободного фланца'
                    designation={
                        <i>
                            D<sub>к</sub>
                        </i>
                    }
                    res={formatNumber(data.ds)}
                    units='мм'
                />
            )}

            <Line
                title='Толщина тарелки фланца'
                designation={<i>h</i>}
                res={formatNumber(data.h)}
                units='мм'
            />
            {data.h0 && (
                <Line
                    title='Расстояние от наружной поверхности обечайки до внутренней окружности контакта бурта и кольца свободного фланца'
                    designation={
                        <i>
                            h<sub>0</sub>
                        </i>
                    }
                    res={formatNumber(data.h0)}
                    units='мм'
                />
            )}
            {data.s1 && (
                <Line
                    title='Толщина втулки приварного встык фланца в месте присоединения к тарелке'
                    designation={
                        <i>
                            S<sub>1</sub>
                        </i>
                    }
                    res={formatNumber(data.s1)}
                    units='мм'
                />
            )}
            <Line
                title='Толщина втулки приварного встык фланца в месте приварки к обечайке (трубе), толщина обечайки (трубы) плоского фланца или бурта свободного фланца'
                designation={
                    <i>
                        S<sub>0</sub>
                    </i>
                }
                res={formatNumber(data.s0)}
                units='мм'
            />
            {data.hk && (
                <Line
                    title='Толщина кольца свободного фланца'
                    designation={
                        <i>
                            h<sub>k</sub>
                        </i>
                    }
                    res={formatNumber(data.hk)}
                    units='мм'
                />
            )}
            {data.l && (
                <Line
                    title='Длина конической втулки приварного встык фланца'
                    designation={<i>l</i>}
                    res={formatNumber(data.l)}
                    units='мм'
                />
            )}

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
            <Line
                title='Прибавка на коррозию'
                designation={<i>c</i>}
                res={formatNumber(data.c)}
                units='мм'
            />

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
            {data.tk && (
                <Line
                    title='Расчетная температура свободного кольца'
                    designation={
                        <i>
                            t<sub>к</sub>
                        </i>
                    }
                    res={formatNumber(data.tk)}
                    units='&#8451;'
                />
            )}

            <Line title='Материал фланца' res={data.material} />
            <Line
                title='Температурный коэффициент линейного расширения материала фланца'
                designation={
                    <i>
                        &alpha;<sub>ф</sub>
                    </i>
                }
                res={formatNumber(data.alphaF)}
                units='1/&#8451;'
            />
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

            <Line
                title='Допускаемое значение общих мембранных и изгибных напряжений во фланце при затяжке в соответствии с ГОСТ 34233.1-2017 (пункт 8.10)'
                designation={
                    <>
                        [<i>&sigma;</i>]<sub>M</sub>
                    </>
                }
                res={formatNumber(data.sigmaMAt20)}
                units='МПа'
            />
            <Line
                title='Допускаемое значение общих мембранных и изгибных напряжений во фланце в рабочих условиях в соответствии с ГОСТ 34233.1-2017 (пункт 8.10)'
                designation={
                    <>
                        [<i>&sigma;</i>]<sub>M</sub>
                    </>
                }
                res={formatNumber(data.sigmaM)}
                units='МПа'
            />

            <Line
                title='Допускаемое значение суммарных общих и местных условных упругих мембранных и изгибных напряжений во фланце при затяжке в соответствии с ГОСТ 34233.1-2017 (пункт 8.10)'
                designation={
                    <>
                        [<i>&sigma;</i>]<sub>R</sub>
                    </>
                }
                res={formatNumber(data.sigmaRAt20)}
                units='МПа'
            />
            <Line
                title='Допускаемое значение суммарных общих и местных условных упругих мембранных и изгибных напряжений во фланце в рабочих условиях в соответствии с ГОСТ 34233.1-2017 (пункт 8.10)'
                designation={
                    <>
                        [<i>&sigma;</i>]<sub>R</sub>
                    </>
                }
                res={formatNumber(data.sigmaR)}
                units='МПа'
            />

            {data.ringMaterial && (
                <Line title='Материал кольца свободного фланца' res={data.ringMaterial} />
            )}
            {data.alphaK && (
                <Line
                    title='Температурный коэффициент линейного расширения материала кольца свободного фланца'
                    designation={
                        <i>
                            &alpha;<sub>к</sub>
                        </i>
                    }
                    res={formatNumber(data.alphaK)}
                    units='1/&#8451;'
                />
            )}
            {data.epsilonKAt20 && (
                <Line
                    title='Модуль продольной упругости материала свободного кольца при температуре &#8451;'
                    designation={
                        <i>
                            &#917;<sub>к</sub>
                            <sup>20</sup>
                        </i>
                    }
                    res={formatNumber(data.epsilonKAt20)}
                    units='МПа'
                />
            )}
            {data.epsilonK && (
                <Line
                    title='Модуль продольной упругости материала свободного кольца при расчетной температуре'
                    designation={
                        <i>
                            &#917;<sub>к</sub>
                        </i>
                    }
                    res={formatNumber(data.epsilonK)}
                    units='МПа'
                />
            )}

            {data.sigmaKAt20 && (
                <Line
                    title='Допускаемое напряжение для материала кольца свободного фланца при температуре &#8451;'
                    designation={
                        <>
                            [<i>&sigma;</i>]<sub>к</sub>
                            <sup>20</sup>
                        </>
                    }
                    res={formatNumber(data.sigmaKAt20)}
                    units='МПа'
                />
            )}
            {data.sigmaK && (
                <Line
                    title='Допускаемое напряжение для материала кольца свободного фланца при расчетной температуре'
                    designation={
                        <>
                            [<i>&sigma;</i>]<sub>к</sub>
                        </>
                    }
                    res={formatNumber(data.sigmaK)}
                    units='МПа'
                />
            )}
        </Container>
    )
}
