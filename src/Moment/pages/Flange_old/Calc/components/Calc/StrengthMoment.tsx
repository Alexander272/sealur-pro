import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { IStrength, IFormulas } from "../../../../../types/res_flange_old"
import { formatNumber } from "../../../../../utils/format"

type Props = {
    data: IStrength
    formulas: IFormulas | undefined
    mkp: "fMkp" | "sMkp"
    mkp1: "fMkp1" | "sMkp1"
}

export const StrengthMoment: FC<Props> = ({ data, formulas, mkp, mkp1 }) => {
    return (
        <Container title='Расчет момента затяжки'>
            <ResLine
                title='Крутящий момент при затяжке болтов/шпилек'
                imgUrl='/image/moment/formulas/flange/Mkp.svg'
                result={formatNumber(data[mkp])}
                formula={{
                    designation: (
                        <>
                            M<sub>кр</sub>
                        </>
                    ),
                    value: formulas?.strength[mkp],
                }}
                units='H*м'
                resBold
            />
            <ResLine
                title='Крутящий момент при затяжке болтов/шпилек со смазкой снижается на 25%'
                imgText={
                    <>
                        M<sub>кр</sub>=0,75*M<sub>кр</sub>
                    </>
                }
                result={formatNumber(data[mkp1])}
                formula={{
                    designation: (
                        <>
                            M<sub>кр</sub>
                        </>
                    ),
                    value: formulas?.strength[mkp1],
                }}
                units='H*м'
            />
        </Container>
    )
}
