import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { IFormulasCap } from "../../../../../types/res_cap"
import { IStrengthResult, IFlangeResult } from "../../../../../types/res_flange_old"
import { StaticResistanceCond } from "./StaticResistanceCond"
import { StaticResistanceData } from "./StaticResistanceData"

type Props = {
    data: IStrengthResult[]
    flange: IFlangeResult
    title: string
    index: 0 | 1
    formulas: IFormulasCap | undefined
}

export const StaticResistance: FC<Props> = ({ data, flange, index, title, formulas }) => {
    return (
        <>
            <Container title={title}>
                <StaticResistanceData
                    data={data[index]}
                    flange={flange}
                    title='- для фланца'
                    formulas={formulas?.strength?.strength[0]}
                />
            </Container>
            <Container title='Условия статической прочности фланцев'>
                <StaticResistanceCond
                    data={data[index]}
                    flange={flange}
                    formulas={formulas?.strength?.strength[0]}
                />
            </Container>
        </>
    )
}
