import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { IGasketResult } from "../../../../types/res_devCooling"
import { formatNumber } from "../../../../utils/format"
import { Line } from "../../../Flange_old/Calc/components/Line"

type Props = {
    data: IGasketResult
}

export const Gasket: FC<Props> = ({ data }) => {
    return (
        <Container title='Исходные данные прокладки'>
            <Line title='Тип прокладки' res={data.gasket} />
            {data.env && <Line title='Уплотняемая среда' res={data.env} />}

            <Line
                title='Размер прокладки в продольном направлении'
                designation={
                    <i>
                        L<sub>2</sub>
                    </i>
                }
                res={formatNumber(data.sizeLong)}
                units='мм'
            />
            <Line
                title='Размер прокладки в поперечном направление'
                designation={
                    <i>
                        B<sub>2</sub>
                    </i>
                }
                res={formatNumber(data.sizeTrans)}
                units='мм'
            />
            <Line
                title='Ширина прокладки'
                designation={
                    <i>
                        b<sub>p</sub>
                    </i>
                }
                res={formatNumber(data.width)}
                units='мм'
            />
            <Line
                title='Толщина прокладки'
                designation={
                    <i>
                        h<sub>p</sub>
                    </i>
                }
                res={formatNumber(data.thickness)}
                units='мм'
            />
            <Line
                title='Удельное давление обжатия прокладки'
                designation={
                    <i>
                        q<sub>обж</sub>
                    </i>
                }
                res={formatNumber(data.pres)}
                units='МПа'
            />
            <Line
                title='Прокладочный коэффициент'
                designation={<i>m</i>}
                res={formatNumber(data.m)}
            />

            <Line
                title='Коэффициент обжатия'
                designation={
                    <i>
                        K<sub>обж</sub>
                    </i>
                }
                res={formatNumber(data.compression)}
            />
            <Line
                title='Условный модуль сжатия прокладки'
                designation={
                    <i>
                        &#917;<sub>п</sub>
                    </i>
                }
                res={formatNumber(data.epsilon)}
                units='МПа'
            />
            <Line
                title='Допускаемое удельное давление'
                designation={
                    <>
                        [<i>q</i>]
                    </>
                }
                res={formatNumber(data.permissiblePres)}
                units='МПа'
            />
        </Container>
    )
}
