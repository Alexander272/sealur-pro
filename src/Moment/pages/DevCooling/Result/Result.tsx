import { FC, memo } from "react"
import { IResDevCooling } from "../../../types/res_devCooling"
import { Bolt } from "./components/Bolt"
import { Auxiliary } from "./components/Calc/Auxiliary"
import { Condition } from "./components/Calc/Condition"
import { Pressure } from "./components/Calc/Pressure"
import { Cap } from "./components/Cap"
import { Data } from "./components/Data"
import { Gasket } from "./components/Gasket"
import { Tube } from "./components/Tube"
import { TubeSheet } from "./components/TubeSheet"

type Props = {
    result: IResDevCooling
}

const Result: FC<Props> = ({ result }) => {
    return (
        <>
            <Data data={result.data} />
            <Cap cameraDiagram={result.data.cameraDiagram} data={result.cap} />
            <TubeSheet data={result.tubeSheet} />
            <Tube mounting={result.data.mounting} data={result.tube} />
            <Bolt data={result.bolts} />
            <Gasket data={result.gasket} />

            <Condition res={result.calc} formulas={result.formulas} />
            {result.calc.isConditionsMet && (
                <>
                    <Pressure res={result.calc} formulas={result.formulas} />
                    <Auxiliary
                        method={result.data.method}
                        res={result.calc.auxiliary}
                        formulas={result.formulas.auxiliary}
                    />
                </>
            )}
        </>
    )
}

export const ResultData = memo(Result)
