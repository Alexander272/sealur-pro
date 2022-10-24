import { FC, memo } from "react"
import { IResDevCooling } from "../../../types/res_devCooling"
import { Auxiliary } from "./components/Calc/Auxiliary"
import { Condition } from "./components/Calc/Condition"
import { Pressure } from "./components/Calc/Pressure"
import { Bolt as BoltResult } from "./components/Calc/Bolt"
import { TubeSheet as TubeSheetResult } from "./components/Calc/TubeSheet"
import { Cap as CapResult } from "./components/Calc/Cap"
import { Bolt } from "./components/Bolt"
import { Cap } from "./components/Cap"
import { Data } from "./components/Data"
import { Gasket } from "./components/Gasket"
import { Tube } from "./components/Tube"
import { TubeSheet } from "./components/TubeSheet"
import { GasketCondition } from "./components/Calc/GasketCondition"
import { FinalCondition } from "./components/Calc/FinalCondition/FinalCondition"

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

            <Condition res={result.calc} formulas={result?.formulas} />
            {result.calc.isConditionsMet && (
                <>
                    <Pressure res={result.calc} formulas={result?.formulas} />
                    <Auxiliary
                        method={result.data.method}
                        mounting={result.data.mounting}
                        res={result.calc.auxiliary}
                        formulas={result.formulas?.auxiliary}
                    />
                    <BoltResult
                        cameraDiagram={result.data.cameraDiagram}
                        res={result.calc.bolt}
                        formulas={result.formulas?.bolt}
                    />
                    <GasketCondition res={result.calc} formulas={result.formulas} />
                    <TubeSheetResult
                        pressure={result.calc.pressure}
                        auxiliary={result.calc.auxiliary}
                        res={result.calc.tubeSheet}
                        formulas={result.formulas?.tubeSheet}
                    />
                    <CapResult
                        cameraDiagram={result.data.cameraDiagram}
                        res={result.calc.cap}
                        formulas={result.formulas?.cap}
                    />
                    <FinalCondition res={result} />
                </>
            )}
        </>
    )
}

export const ResultData = memo(Result)
