import { FC, memo } from "react"
import { IResExCircle } from "../../../types/res_exCircle"
import { Bolt } from "./components/Bolt"
import { BoltStrength } from "./components/Calc/Bolts"
import { Deformation } from "./components/Calc/Deformation"
import { ForcesInBolts } from "./components/Calc/ForcesInBolts"
import { Moment } from "./components/Calc/Moment"
import { Data } from "./components/Data"
import { Gasket } from "./components/Gasket"

type Props = {
    result: IResExCircle
}

const Result: FC<Props> = ({ result }) => {
    return (
        <>
            <Data data={result.data} />
            <Bolt data={result.bolts} />
            <Gasket data={result.gasket} />

            <Deformation
                res={result.calc.deformation}
                formulas={result.formulas?.deformation}
                gasket={result.gasket}
            />
            <ForcesInBolts
                res={result.calc.forsesInBolts}
                formulas={result.formulas?.forsesInBolts}
            />
            <BoltStrength
                res={result.calc.bolt}
                formulas={result.formulas?.bolt}
                gasket={result.gasket}
            />
            <Moment
                res={result.calc.moment}
                formulas={result.formulas?.moment}
                gasket={result.gasket}
            />
        </>
    )
}

export const ResultData = memo(Result)
