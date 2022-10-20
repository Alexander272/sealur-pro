import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ICalculated, IFormulas } from "../../../../../types/res_devCooling"
import { formatNumber } from "../../../../../utils/format"

type Props = {
    res: ICalculated
    formulas: IFormulas
}

export const Pressure: FC<Props> = ({ res, formulas }) => {
    return (
        <Container title='Пробное давление'>
            <ResLine
                imgUrl={"/image/moment/formulas/dev-cooling/pressure.svg"}
                formula={{
                    designation: (
                        <>
                            P<sub>пр</sub>
                        </>
                    ),
                    value: formulas?.pressure,
                }}
                result={formatNumber(res.pressure)}
                units='МПа'
            />
        </Container>
    )
}
