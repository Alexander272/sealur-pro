import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { IDataResult } from "../../../../types/res_flange"
import { formatNumber } from "../../../../utils/format"
import { Line } from "./Line"

type Props = {
    data: IDataResult
}

export const Data: FC<Props> = ({ data }) => {
    return (
        <Container title='Исходные данные для расчета'>
            <Line
                title='Расчетное давление (внутреннее - положительное, наружное отрицательное)'
                res={formatNumber(data.pressure || 0)}
                units='МПа'
            />
            <Line
                title='Внешняя осевая сила (растягивающая - положительная, сжимающая - отрицательная)'
                res={formatNumber(data.axialForce || 0)}
                units='Н'
            />
            <Line
                title='Внешний изгибающий момент'
                res={formatNumber(data.bendingMoment || 0)}
                units='Н*мм'
            />
            <Line
                title='Расчетная температура'
                res={formatNumber(data.temp || 0)}
                units='&#8451;'
            />

            <Line title='Условия работы' res={data.work} full />
            <Line title='Температура элементов фланцевого соединения' res={data.flanges} full />
            <Line title='Одинаковые фланцы' res={data.sameFlange} full />
            <Line title='Закладная деталь' res={data.embedded} full />
            <Line title='Тип соединения' res={data.type} full />
            <Line title='Условие затяжки' res={data.condition} full />
        </Container>
    )
}
