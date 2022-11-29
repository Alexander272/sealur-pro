import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { IWasherResult } from "../../../../types/res_flange_old"
import { formatNumber } from "../../../../utils/format"
import { Line } from "./Line"

type Props = {
    data: IWasherResult[]
}

export const Washer: FC<Props> = ({ data }) => {
    const renderWasher = (d: IWasherResult, title: string) => {
        return (
            <>
                <Line title={`Материал трубной ${title}`} res={d.material} />
                <Line
                    title={`Температурный коэффициент линейного расширения материала ${title}`}
                    designation={
                        <i>
                            &alpha;<sub>ш</sub>
                        </i>
                    }
                    res={formatNumber(d.alpfa)}
                    units='1/&#8451;'
                />
                <Line
                    title={`Расчетная температура ${title}`}
                    designation={
                        <i>
                            t<sub>ш</sub>
                        </i>
                    }
                    res={formatNumber(d.temp)}
                    units='&#8451;'
                />
            </>
        )
    }

    return (
        <Container title='Исходные данные для шайб'>
            <Line
                title='Толщина шайб'
                designation={
                    <i>
                        h<sub>р</sub>
                    </i>
                }
                res={formatNumber(data[0].thickness)}
                units='мм'
            />
            {renderWasher(data[0], data.length > 1 ? "первой шайбы" : "шайб")}
            {data.length > 1 && renderWasher(data[1], "второй шайбы")}
        </Container>
    )
}
