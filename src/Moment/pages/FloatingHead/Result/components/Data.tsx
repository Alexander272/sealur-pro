import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { IDataResult } from "../../../../types/res_float"
import { formatNumber } from "../../../../utils/format"
import { Line } from "../../../Flange_old/Calc/components/Line"

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
            <Line title='Условия работы' res={data.work} full />
            <Line title='Шип на привалочной поверхности' res={data.hasThorn ? "Да" : "Нет"} full />
            <Line title='Тип соединения' res={data.type} full />
            <Line title='Условие затяжки' res={data.condition} full />
        </Container>
    )
}
