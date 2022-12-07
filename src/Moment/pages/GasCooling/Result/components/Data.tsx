import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { IDataResult } from "../../../../types/res_gasCooling"
import { formatNumber } from "../../../../utils/format"
import { Line } from "../../../Flange_old/Calc/components/Line"

type Props = {
    data: IDataResult
}

export const Data: FC<Props> = ({ data }) => {
    // TODO добавить недостающее
    return (
        <Container title='Исходные данные для расчета'>
            {data.testPressure && (
                <Line title='Пробное давление' res={formatNumber(data.testPressure)} units='МПа' />
            )}
            <Line title='Тип соединения' res={data.type} full />
            <Line title='Условие затяжки' res={data.condition} full />
        </Container>
    )
}
