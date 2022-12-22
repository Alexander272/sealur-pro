import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { IEmbedResult } from "../../../../types/res_flange_old"
import { formatNumber } from "../../../../utils/format"
import { Line } from "./Line"

type Props = {
    data: IEmbedResult
}

export const Embed: FC<Props> = ({ data }) => {
    return (
        <Container title='Исходные данные для закладной детали'>
            <Line
                title='Толщина трубной решетки или закладной детали между прокладками'
                designation={
                    <i>
                        h<sub>р</sub>
                    </i>
                }
                res={formatNumber(data.thickness)}
                units='мм'
            />
            <Line
                title='Материал трубной решетки или иной закладной детали, зажатой между фланцами'
                res={data.material}
            />
            <Line
                title='Температурный коэффициент линейного расширения материала трубной решетки или иной закладной детали, зажатой между фланцами'
                designation={
                    <i>
                        &alpha;<sub>р</sub>
                    </i>
                }
                res={formatNumber(data.alpfa)}
                units='1/&#8451;'
            />
            <Line
                title='Расчетная температура трубной решетки или иной закладной детали,зажатой между фланцами'
                designation={
                    <i>
                        t<sub>р</sub>
                    </i>
                }
                res={formatNumber(data.temp)}
                units='&#8451;'
            />
        </Container>
    )
}
