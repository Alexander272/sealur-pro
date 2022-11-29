import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { IStrengthResult, IFormulas, IFlangeResult } from "../../../../../types/res_flange_old"
import { StaticResistanceCond } from "./StaticResistanceCond"
import { StaticResistanceData } from "./StaticResistanceData"

type Props = {
    data: IStrengthResult[]
    flanges: IFlangeResult[]
    isSameFlange: boolean
    title: string
    index: 0 | 1
    formulas: IFormulas | undefined
}

export const StaticResistance: FC<Props> = ({
    data,
    flanges,
    index,
    title,
    isSameFlange,
    formulas,
}) => {
    return (
        <>
            <Container title={title}>
                <StaticResistanceData
                    data={data[index]}
                    flange={flanges[0]}
                    title='- для первого фланца'
                    formulas={formulas?.strength?.strength[0]}
                />
            </Container>
            <Container title='Условия статической прочности фланцев'>
                <StaticResistanceCond
                    data={data[index]}
                    flange={flanges[0]}
                    formulas={formulas?.strength?.strength[0]}
                />
            </Container>
            {!isSameFlange && (
                <>
                    <Container title={title}>
                        <StaticResistanceData
                            data={data[2 * index + 1]}
                            flange={flanges[1]}
                            title='- для второго фланца'
                            formulas={formulas?.strength?.strength[2 * index + 1]}
                        />
                    </Container>
                    <Container title='Условия статической прочности фланцев'>
                        <StaticResistanceCond
                            data={data[2 * index + 1]}
                            flange={flanges[1]}
                            formulas={formulas?.strength?.strength[2 * index + 1]}
                        />
                    </Container>
                </>
            )}
        </>
    )
}
