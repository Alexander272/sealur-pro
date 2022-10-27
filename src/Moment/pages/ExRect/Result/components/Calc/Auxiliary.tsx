import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { IAuxiliaryFormulas, ICalcAuxiliary } from "../../../../../types/res_exRect"
import { formatNumber } from "../../../../../utils/format"

type Props = {
    res: ICalcAuxiliary
    formulas?: IAuxiliaryFormulas
}

export const Auxiliary: FC<Props> = ({ res, formulas }) => {
    return (
        <Container title='Расчет вспомогательных величин'>
            <ResLine
                title='Расчетная ширина плоской прокладки'
                imgUrl='/image/moment/formulas/dev-cooling/estimatedGasketWidth.svg'
                formula={{
                    designation: (
                        <>
                            b<sub>pR</sub>
                        </>
                    ),
                    value: formulas?.estimatedGasketWidth,
                }}
                result={formatNumber(res.estimatedGasketWidth)}
                units='мм'
            />
            <ResLine
                title='Расчетный размер решетки в поперечном направлении'
                imgUrl='/image/moment/formulas/dev-cooling/Bp.svg'
                formula={{
                    designation: (
                        <>
                            B<sub>p</sub>
                        </>
                    ),
                    value: formulas?.sizeTrans,
                }}
                result={formatNumber(res.sizeTrans)}
                units='мм'
            />
            <ResLine
                title='Расчетный размер решетки в продольном направлении'
                imgUrl='/image/moment/formulas/dev-cooling/Bp.svg'
                formula={{
                    designation: (
                        <>
                            L<sub>p</sub>
                        </>
                    ),
                    value: formulas?.sizeLong,
                }}
                result={formatNumber(res.sizeLong)}
                units='мм'
            />
        </Container>
    )
}
