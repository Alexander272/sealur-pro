import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ICalculate, IFormulas } from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "./ResLine/ResLine"

type Props = {
    data: ICalculate
    formulas: IFormulas | undefined
}

export const Deformation: FC<Props> = ({ data, formulas }) => {
    return (
        <Container title='Усилия, необходимые для смятия прокладки и обеспечения герметичности фланцевого соединения'>
            <ResLine
                title='Эффективная ширина прокладки'
                imgUrl='/image/moment/formulas/b0.svg'
                formula={{
                    designation: (
                        <>
                            b<sub>0</sub>
                        </>
                    ),
                    value: formulas?.b0,
                }}
                result={formatNumber(data.b0)}
                units='мм'
            />
            <ResLine
                title='Расчетный диаметр прокладки'
                imgUrl='/image/moment/formulas/Dcp.svg'
                formula={{
                    designation: (
                        <>
                            D<sub>сп</sub>
                        </>
                    ),
                    value: formulas?.Dcp,
                }}
                result={formatNumber(data.Dsp)}
                units='мм'
            />
            <ResLine
                title='Усилие необходимое для смятия прокладки при затяжке'
                imgUrl='/image/moment/formulas/Po.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>обж</sub>
                        </>
                    ),
                    value: formulas?.Po,
                }}
                result={formatNumber(data.Po)}
                units='H'
            />
            <ResLine
                title='Усилие на прокладке в рабочих условиях необходимое для обеспечения герметичности фланцевого соединения'
                imgUrl='/image/moment/formulas/Rp.svg'
                formula={{
                    designation: (
                        <>
                            R<sub>п</sub>
                        </>
                    ),
                    value: formulas?.Rp,
                }}
                result={formatNumber(data.Rp)}
                units='H'
            />
        </Container>
    )
}
