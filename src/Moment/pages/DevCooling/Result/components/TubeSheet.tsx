import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { ITubeSheetResult } from "../../../../types/res_devCooling"
import { formatNumber } from "../../../../utils/format"
import { Line } from "../../../Flange/Calc/components/Line"

type Props = {
    data: ITubeSheetResult
}

export const TubeSheet: FC<Props> = ({ data }) => {
    return (
        <Container title='Исходные данные для трубной решетки'>
            <Line
                title='Толщина трубной решетки в пределах зоны перфорации'
                designation={
                    <i>
                        s<sub>1</sub>
                    </i>
                }
                res={formatNumber(data.zoneThick)}
                units='мм'
            />
            <Line
                title='Толщина трубной решетки в месте уплотнения'
                designation={
                    <i>
                        s<sub>2</sub>
                    </i>
                }
                res={formatNumber(data.placeThick)}
                units='мм'
            />
            <Line
                title='Толщина трубной решетки вне зоны уплотнения'
                designation={
                    <i>
                        s<sub>3</sub>
                    </i>
                }
                res={formatNumber(data.outZoneThick)}
                units='мм'
            />
            <Line
                title='Ширина зоны решетки толщиной s&#8321;'
                designation={
                    <i>
                        B<sub>1</sub>
                    </i>
                }
                res={formatNumber(data.width)}
                units='мм'
            />
            <Line
                title='Шаг отверстий под трубы в продольном направлении'
                designation={
                    <i>
                        t<sub>1</sub>
                    </i>
                }
                res={formatNumber(data.stepLong)}
                units='мм'
            />
            <Line
                title='Шаг отверстий под трубы в поперечном направлении'
                designation={
                    <i>
                        t<sub>2</sub>
                    </i>
                }
                res={formatNumber(data.stepTrans)}
                units='мм'
            />
            <Line
                title='Число рядов труб в поперечном направлении'
                designation={<i>z</i>}
                res={formatNumber(data.count)}
            />
            <Line
                title='Диаметр трубных отверстий в решетках'
                designation={
                    <i>
                        d<sub>0</sub>
                    </i>
                }
                res={formatNumber(data.diameter)}
                units='мм'
            />
            <Line
                title='Прибавка на коррозию'
                designation={
                    <i>
                        c<sub>р</sub>
                    </i>
                }
                res={formatNumber(data.corrosion)}
                units='мм'
            />

            <Line title='Материал трубной решетки' res={data.material} />
            <Line
                title='Модуль продольной упругости трубной решетки'
                designation={
                    <i>
                        &#917;<sub>р</sub>
                    </i>
                }
                res={formatNumber(data.epsilon)}
                units='МПа'
            />
            <Line
                title='Допускаемое напряжение при температуре 20 &#8451;'
                designation={
                    <i>
                        [<i>&sigma;</i>]<sub>р</sub>
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
                        [<i>&sigma;</i>]<sub>р</sub>
                    </i>
                }
                res={formatNumber(data.sigma)}
                units='МПа'
            />
        </Container>
    )
}
