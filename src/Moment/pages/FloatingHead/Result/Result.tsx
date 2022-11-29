import { FC, memo } from "react"
import { IResFloat } from "../../../types/res_float"
import { Gasket } from "../../Flange_old/Calc/components/Gasket"
import { Data } from "./components/Data"
import { Flange } from "./components/Flange"
import { Cap } from "./components/Cap"
import { Bolt } from "./components/Bolt"
import { Auxiliary } from "./components/Calc/Auxiliary"
import { Force } from "./components/Calc/Force"
import { BoltStrength } from "./components/Calc/BoltStrength"
import { Conclusions } from "./components/Calc/Conclusions"
import { Moment } from "./components/Calc/Moment"

type Props = {
    result: IResFloat
}

const Result: FC<Props> = ({ result }) => {
    return (
        <>
            <Data data={result.data} />
            <Flange data={result.flange} />
            <Cap data={result.cap} />
            <Bolt data={result.bolt} />
            <Gasket data={result.gasket} />

            <Auxiliary result={result} />
            <Force calc={result.calc} formulas={result.formulas} />
            <BoltStrength calc={result.calc} gasket={result.gasket} formulas={result.formulas} />
            <Conclusions calc={result.calc} gasket={result.gasket} temp={result.flange.tf} />
            <Moment calc={result.calc} gasket={result.gasket} formulas={result.formulas} />
        </>
    )
}

export const ResultData = memo(Result)
