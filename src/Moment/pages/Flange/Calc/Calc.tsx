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
import { Auxiliary } from "./components/Calc/Auxiliary"
import { Tightness } from "./components/Calc/Tightness"
import { StrengthMoment } from "./components/Calc/StrengthMoment"
import { StaticResistance } from "./components/Calc/StaticResistance"
import { TightnessLoad } from "./components/Calc/TightnessLoad"
import classes from "../../styles/page.module.scss"

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

            {result.calc.basis && (
                <>
                    <Deformation
                        data={result.calc}
                        gasket={result.gasket}
                        formulas={result.formulas}
                    />
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
            )}
            {result.calc.strength && (
                <>
                    <Auxiliary
                        data={result.calc}
                        basis={result.data}
                        gasket={result.gasket}
                        flanges={result.flanges}
                        bolt={result.bolt}
                        formulas={result.formulas}
                        typeAlpha={getTypeAlpha()}
                    />
                    <Tightness data={result.calc} formulas={result.formulas} />
                    <BoltStrength
                        data={result.calc}
                        res={result.gasket}
                        formulas={result.formulas}
                        pathBasis='strength'
                        pathSigmaB1='fSigmaB1'
                        pathSigmaB2='fSigmaB2'
                        pathDSigmaM='fDSigmaM'
                        pathDSigmaR='fDSigmaR'
                        pathQ='fQ'
                    />
                    <StrengthMoment
                        data={result.calc.strength}
                        formulas={result.formulas}
                        mkp='fMkp'
                        mkp1='fMkp1'
                    />
                    <StaticResistance
                        data={result.calc.strength.strength}
                        flanges={result.flanges}
                        isSameFlange={result.isSameFlange}
                        index={0}
                        title='Расчет фланца на статическую прочность'
                        formulas={result.formulas}
                    />
                    <TightnessLoad
                        data={result.calc}
                        typeQt={getTypeQt()}
                        formulas={result.formulas}
                    />
                    <BoltStrength
                        data={result.calc}
                        res={result.gasket}
                        formulas={result.formulas}
                        pathBasis='strength'
                        pathSigmaB1='sSigmaB1'
                        pathSigmaB2='sSigmaB2'
                        pathDSigmaM='sDSigmaM'
                        pathDSigmaR='sDSigmaR'
                        pathQ='sQ'
                    />
                    <StrengthMoment
                        data={result.calc.strength}
                        formulas={result.formulas}
                        mkp='sMkp'
                        mkp1='sMkp1'
                    />
                    <StaticResistance
                        data={result.calc.strength.strength}
                        flanges={result.flanges}
                        isSameFlange={result.isSameFlange}
                        index={1}
                        title='Расчет фланца на статическую прочность c учетом температурных деформаций'
                        formulas={result.formulas}
                    />
                    <h5 className={classes.title}>Анализ результатов расчета</h5>
                    <Deformation
                        data={result.calc}
                        gasket={result.gasket}
                        formulas={result.formulas}
                    />
                </>
            )}
        </>
    )
}

export const Calc = memo(ResCalc)
