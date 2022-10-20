import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { CameraDiagram } from "../../../../types/devCooling"
import { ICapResult } from "../../../../types/res_devCooling"
import { formatNumber } from "../../../../utils/format"
import { Line } from "../../../Flange/Calc/components/Line"

type Props = {
    cameraDiagram: CameraDiagram
    data: ICapResult
}

export const Cap: FC<Props> = ({ cameraDiagram, data }) => {
    return (
        <Container title='Исходные данные для крышки'>
            <Line
                title='Толщина донышка крышки'
                designation={
                    <i>
                        s<sub>4</sub>
                    </i>
                }
                res={formatNumber(data.bottomThick)}
                units='мм'
            />
            {cameraDiagram === "schema1" ||
            cameraDiagram === "schema2" ||
            cameraDiagram === "schema3" ? (
                <Line
                    title='Толщина стенки крышки в месте присоединения к фланцу'
                    designation={
                        <i>
                            s<sub>5</sub>
                        </i>
                    }
                    res={formatNumber(data.wallThick)}
                    units='мм'
                />
            ) : null}
            <Line
                title='Толщина фланца крышки'
                designation={
                    <i>
                        s<sub>6</sub>
                    </i>
                }
                res={formatNumber(data.flangeThick)}
                units='мм'
            />
            <Line
                title='Толщина боковой стенки'
                designation={
                    <i>
                        s<sub>7</sub>
                    </i>
                }
                res={formatNumber(data.sideWallThick)}
                units='мм'
            />
            <Line
                title='Внутренний размер камеры в поперечном направлении'
                designation={
                    <i>
                        B<sub>0</sub>
                    </i>
                }
                res={formatNumber(data.innerSize)}
                units='мм'
            />
            <Line
                title='Наружный размер камеры в поперечном направлении'
                designation={
                    <i>
                        B<sub>4</sub>
                    </i>
                }
                res={formatNumber(data.outerSize)}
                units='мм'
            />
            <Line
                title='Глубина камеры (крышки)'
                designation={<i>H</i>}
                res={formatNumber(data.depth)}
                units='мм'
            />
            {cameraDiagram === "schema2" || cameraDiagram === "schema3" ? (
                <Line
                    title='Радиус гиба в углу крышки камеры'
                    designation={<i>R</i>}
                    res={formatNumber(data.radius)}
                    units='мм'
                />
            ) : null}
            <Line
                title='Внутренний размер камеры в продольном направлении'
                designation={
                    <i>
                        L<sub>0</sub>
                    </i>
                }
                res={formatNumber(data.L)}
                units='мм'
            />
            <Line
                title='Коэффициент прочности сварного шва'
                designation={<i>&phi;</i>}
                res={formatNumber(data.strength)}
            />
            <Line
                title='Прибавка на коррозию'
                designation={
                    <i>
                        c<sub>к</sub>
                    </i>
                }
                res={formatNumber(data.corrosion)}
                units='мм'
            />

            <Line title='Материал крышки' res={data.material} />
            <Line
                title='Модуль продольной упругости крышки'
                designation={
                    <i>
                        &#917;<sub>к</sub>
                    </i>
                }
                res={formatNumber(data.epsilon)}
                units='МПа'
            />
            <Line
                title='Допускаемое напряжение при температуре 20 &#8451;'
                designation={
                    <i>
                        [<i>&sigma;</i>]<sub>к</sub>
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
                        [<i>&sigma;</i>]<sub>к</sub>
                    </i>
                }
                res={formatNumber(data.sigma)}
                units='МПа'
            />
        </Container>
    )
}
