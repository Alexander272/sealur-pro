import React, { FC } from "react"
import {
    IFlangeResult,
    IStrength,
    IStrengthFormulas_St,
    IStrengthResult,
} from "../../../../../types/res_flange_old"
import { IStrengthFormulas } from "../../../../../types/res_cap"
import { Container } from "../../../../../components/Container/Container"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: IStrength
    flange: IFlangeResult
    formulas: IStrengthFormulas | undefined
}

export const SealingCondition: FC<Props> = ({ data, flange, formulas }) => {
    const renderCondtion = (d: IStrengthResult, f: IStrengthFormulas_St | undefined) => {
        return (
            <>
                <p className={classes.text}>- для фланца</p>
                <ResLine
                    title='Угол поворота приварного встык фланца и бурта свободного фланца'
                    imgUrl='/image/moment/formulas/flange/theta.svg'
                    formula={{ designation: <>&Theta;</>, value: f?.teta }}
                    result={formatNumber(d.teta)}
                    units='рад'
                />
                <ConditionLine
                    imgUrl='/image/moment/formulas/flange/thetaCond.svg'
                    result={
                        <>
                            {formatNumber(d.teta)}&nbsp;
                            {d.teta <= d.dTeta ? <> &le; </> : " > "}
                            &nbsp;
                            {formatNumber(d.dTeta)}
                        </>
                    }
                />
                {flange?.type === "free" && (
                    <>
                        <ResLine
                            title='Угол поворота кольца свободного фланца'
                            imgUrl='/image/moment/formulas/flange/thetaK.svg'
                            result={formatNumber(d.tetaK)}
                            units='рад'
                        />
                        <ConditionLine
                            imgUrl='/image/moment/formulas/flange/thetaCondK.svg'
                            result={
                                <>
                                    {formatNumber(d.teta)}&nbsp;
                                    {d.teta <= d.dTetaK ? <> &le; </> : " > "}
                                    &nbsp;
                                    {formatNumber(d.dTetaK)}
                                </>
                            }
                        />
                    </>
                )}
            </>
        )
    }

    return (
        <Container title='Условие герметичности фланцевого соединения'>
            {renderCondtion(data.strength[1], formulas?.strength[1])}
        </Container>
    )
}
