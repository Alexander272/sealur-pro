import { FC } from "react"
import { Button } from "../../../../components/UI/Button/Button"
import { IResFlange } from "../../../types/res_flange"
import { Bolt } from "./components/Bolt"
import { Flange } from "./components/Flange"
import { Gasket } from "./components/Gasket"
import classes from "../../styles/page.module.scss"
import { Data } from "./components/Data"
import { Deformation } from "./components/Calc/Deformation"
import { ForcesInBolts } from "./components/Calc/ForcesInBolts"
import { Embed } from "./components/Embed"
import { BoltStrength } from "./components/Calc/BoltStrength"

type Props = {
    //TODO добавить тип
    result: IResFlange
    clearResult: () => void
}

export const Calc: FC<Props> = ({ result, clearResult }) => {
    console.log(result)

    return (
        <div className={classes.form}>
            <Data data={result.data} />

            <Flange index={0} data={result.flanges[0]} />
            {!result.isSameFlange && <Flange index={1} data={result.flanges[1]} />}

            <Bolt data={result.bolt} />
            <Gasket data={result.gasket} />
            {result.embed && <Embed data={result.embed} />}

            <Deformation data={result.calc} formulas={result.formulas} />
            <ForcesInBolts data={result.calc} formulas={result.formulas} />
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

            <div className={classes["form-button"]}>
                <Button fullWidth onClick={clearResult}>
                    Новый расчет
                </Button>
            </div>
        </div>
    )
}
