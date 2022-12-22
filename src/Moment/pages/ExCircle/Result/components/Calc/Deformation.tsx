import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import {
    ICalcDeformation,
    IDeformationFormulas,
    IGasketResult,
} from "../../../../../types/res_exCircle"
import { formatNumber } from "../../../../../utils/format"

type Props = {
    res: ICalcDeformation
    formulas?: IDeformationFormulas
    gasket: IGasketResult
}

export const Deformation: FC<Props> = ({ res, formulas, gasket }) => {
    return (
        <Container title='Усилия, необходимые для смятия прокладки и обеспечения герметичности фланцевого соединения'>
            <ResLine
                title='Эффективная ширина прокладки'
                imgUrl={
                    gasket.type === "Восьмигранная"
                        ? "/image/moment/formulas/flange/b0-oval.svg"
                        : "/image/moment/formulas/flange/b0.svg"
                }
                formula={{
                    designation: (
                        <>
                            b<sub>0</sub>
                        </>
                    ),
                    value: formulas?.width,
                }}
                result={formatNumber(res.width)}
                units='мм'
            />
            <ResLine
                title='Расчетный диаметр прокладки'
                imgUrl={
                    gasket.type === "Восьмигранная"
                        ? "/image/moment/formulas/flange/Dcp-oval.svg"
                        : "/image/moment/formulas/flange/Dcp.svg"
                }
                formula={{
                    designation: (
                        <>
                            D<sub>сп</sub>
                        </>
                    ),
                    value: formulas?.diameter,
                }}
                result={formatNumber(res.diameter)}
                units='мм'
            />
            <ResLine
                title='Усилие необходимое для смятия прокладки при затяжке'
                imgUrl='/image/moment/formulas/flange/Po.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>обж</sub>
                        </>
                    ),
                    value: formulas?.deformation,
                }}
                result={formatNumber(res.deformation)}
                units='H'
            />
            <ResLine
                title='Усилие на прокладке в рабочих условиях необходимое для обеспечения герметичности фланцевого соединения'
                imgUrl='/image/moment/formulas/flange/Rp.svg'
                formula={{
                    designation: (
                        <>
                            R<sub>п</sub>
                        </>
                    ),
                    value: formulas?.effort,
                }}
                result={formatNumber(res.effort)}
                units='H'
            />
        </Container>
    )
}
