import { FC, memo } from "react"
import { IResFlange } from "../../../types/res_flange"
import { Bolt } from "./components/Bolt"
import { Flange } from "./components/Flange"
import { Gasket } from "./components/Gasket"
import { Data } from "./components/Data"
import { Embed } from "./components/Embed"
import { Washer } from "./components/Washer"
import { Deformation } from "./components/Calc/Deformation"
import { ForcesInBolts } from "./components/Calc/ForcesInBolts"
import { BoltStrength } from "./components/Calc/BoltStrength"
import { Conclusions } from "./components/Calc/Conclusions"
import { Moment } from "./components/Calc/Moment"

type Props = {
    result: IResFlange
}

const ResCalc: FC<Props> = ({ result }) => {
    const getTypeAlpha = () => {
        let res = ""
        if (result.flanges.length === 1) {
            res = result.flanges[0].type
        } else {
            res = result.flanges[0].type + "-" + result.flanges[1].type
        }

        return result.isSameFlange + "-" + res
    }

    const getTypeQt = () => {
        let washer = ""
        if (result.washers) washer = "-washer"

        let embed = ""
        if (result.embed) embed = "-embed"

        let flanges = ""
        if (result.flanges.length === 1) {
            flanges = result.flanges[0].type === "free" ? "-free" : "-any"
        } else {
            const t1 = result.flanges[0].type === "free" ? "-free" : "-any"
            const t2 = result.flanges[0].type === "free" ? "-free" : "-any"
            flanges = t1 + t2
        }

        return `Qt${washer}${flanges}${embed}`
    }

    return (
        <>
            <Data data={result.data} />

            <Flange index={0} data={result.flanges[0]} />
            {!result.isSameFlange && <Flange index={1} data={result.flanges[1]} />}

            <Bolt data={result.bolt} />
            {result.washers && <Washer data={result.washers} />}
            <Gasket data={result.gasket} />
            {result.embed && <Embed data={result.embed} />}

            <Deformation data={result.calc} formulas={result.formulas} />
            <ForcesInBolts
                data={result.calc}
                formulas={result.formulas}
                typeAlpha={getTypeAlpha()}
                typeQt={getTypeQt()}
            />
            <BoltStrength
                data={result.calc}
                res={result.gasket}
                formulas={result.formulas}
                pathBasis='basis'
                pathSigmaB1='sigmaB1'
                pathSigmaB2='sigmaB2'
                pathDSigmaM='dSigmaM'
                pathDSigmaR='dSigmaR'
                pathQ='q'
            />
            <Conclusions
                data={result.calc}
                gasket={result.gasket}
                temp={result.data.temp}
                pathBasis='basis'
                pathQ='q'
            />
            <Moment data={result.calc} formulas={result.formulas} gasket={result.gasket} />
        </>
    )
}

export const Calc = memo(ResCalc)
