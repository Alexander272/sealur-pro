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
import { StaticResistance } from "./components/Calc/StaticResistance"
import { TightnessLoad } from "./components/Calc/TightnessLoad"
import { SealingCondition } from "./components/Calc/SealingCondition"
import { SealingConclusions } from "./components/Calc/SealingConclusions"
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

        return (result.data.sameFlange === "Да") + "-" + res
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

    const getTypeGamma = () => {
        let flanges = ""
        if (result.flanges.length === 1) {
            flanges = result.flanges[0].type === "free" ? "-free" : "-any"
        } else {
            const t1 = result.flanges[0].type === "free" ? "-free" : "-any"
            const t2 = result.flanges[0].type === "free" ? "-free" : "-any"
            flanges = t1 + t2
        }

        return `Gamma${flanges}`
    }

    return (
        <>
            <Data data={result.data} />

            <Flange index={0} data={result.flanges[0]} />
            {result.flanges.length > 1 && <Flange index={1} data={result.flanges[1]} />}

            <Bolt data={result.bolt} />
            {result.washers && <Washer data={result.washers} />}
            <Gasket data={result.gasket} />
            {result.embed && <Embed data={result.embed} />}

            {result.calc.basis && (
                <>
                    <Deformation
                        data={result.calc.basis.deformation}
                        gasket={result.gasket}
                        formulas={result.formulas?.basis.deformation}
                    />
                    <ForcesInBolts
                        data={result.calc.basis.forcesInBolts}
                        formulas={result.formulas?.basis.forcesInBolts}
                        typeAlpha={getTypeAlpha()}
                        typeQt={getTypeQt()}
                    />
                    <BoltStrength
                        data={result.calc.basis.boltStrength}
                        gasket={result.gasket}
                        formulas={result.formulas?.basis.boltStrength}
                    />
                    <Conclusions
                        data={result.calc.basis.boltStrength}
                        gasket={result.gasket}
                        temp={result.data.temp}
                    />
                    <Moment
                        data={result.calc.basis.moment}
                        formulas={result.formulas?.basis.moment}
                        gasket={result.gasket}
                    />
                </>
            )}

            {result.calc.strength && (
                <>
                    <Auxiliary
                        data={result.calc.strength.auxiliary}
                        basis={result.data}
                        gasket={result.gasket}
                        flanges={result.flanges}
                        formulas={result.formulas?.strength.auxiliary}
                        typeAlpha={getTypeAlpha()}
                        typeGamma={getTypeGamma()}
                    />
                    <Tightness
                        data={result.calc.strength.tightness}
                        formulas={result.formulas?.strength.tightness}
                    />
                    <BoltStrength
                        data={result.calc.strength.boltStrength1}
                        gasket={result.gasket}
                        formulas={result.formulas?.strength.boltStrength1}
                    />
                    <Moment
                        data={result.calc.strength.moment1}
                        formulas={result.formulas?.strength.moment1}
                        gasket={result.gasket}
                    />
                    <StaticResistance
                        data={result.calc.strength.staticResistance1}
                        cond={result.calc.strength.conditionsForStrength1}
                        flanges={result.flanges}
                        title='Расчет фланца на статическую прочность'
                        formulas={result.formulas?.strength.staticResistance1}
                        condFormulas={result.formulas?.strength.conditionsForStrength1}
                    />
                    <TightnessLoad
                        data={result.calc.strength.tightnessLoad}
                        typeQt={getTypeQt()}
                        formulas={result.formulas?.strength.tightnessLoad}
                    />
                    <BoltStrength
                        data={result.calc.strength.boltStrength2}
                        gasket={result.gasket}
                        formulas={result.formulas?.strength.boltStrength2}
                    />
                    <Moment
                        data={result.calc.strength.moment2}
                        formulas={result.formulas?.strength.moment2}
                        gasket={result.gasket}
                    />
                    <StaticResistance
                        data={result.calc.strength.staticResistance2}
                        cond={result.calc.strength.conditionsForStrength2}
                        flanges={result.flanges}
                        title='Расчет фланца на статическую прочность c учетом температурных деформаций'
                        formulas={result.formulas?.strength.staticResistance2}
                        condFormulas={result.formulas?.strength.conditionsForStrength2}
                    />
                    <h5 className={classes.title}>Анализ результатов расчета</h5>
                    <Deformation
                        data={result.calc.strength.deformation}
                        gasket={result.gasket}
                        formulas={result.formulas?.strength.deformation}
                    />
                    <ForcesInBolts
                        data={result.calc.strength.forcesInBolts}
                        formulas={result.formulas?.strength.forcesInBolts}
                        typeAlpha={getTypeAlpha()}
                        typeQt={getTypeQt()}
                    />
                    <BoltStrength
                        data={result.calc.strength.boltStrength2}
                        gasket={result.gasket}
                        formulas={result.formulas?.strength.boltStrength2}
                    />
                    <Conclusions
                        data={result.calc.strength.boltStrength2}
                        gasket={result.gasket}
                        temp={result.data.temp}
                    />
                    <SealingCondition
                        data={result.calc.strength.conditionsForStrength2}
                        flanges={result.flanges}
                        formulas={result.formulas?.strength.conditionsForStrength2}
                    />
                    <SealingConclusions
                        data={result.calc.strength.conditionsForStrength2}
                        flanges={result.flanges}
                    />
                    <Moment
                        data={result.calc.strength.finalMoment}
                        formulas={result.formulas?.strength.finalMoment}
                        gasket={result.gasket}
                    />
                </>
            )}
        </>
    )
}

export const Calc = memo(ResCalc)
