import React, { FC } from "react"
import {
    IFlangeResult,
    IStrength,
    IStrengthFormulas,
    IStrengthFormulas_St,
    IStrengthResult,
} from "../../../../../types/res_flange"
import { Container } from "../../../../../components/Container/Container"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: IStrength
    flanges: IFlangeResult[]
    formulas: IStrengthFormulas | undefined
}

export const SealingCondition: FC<Props> = ({ data, flanges, formulas }) => {
    const renderCondtion = (
        d: IStrengthResult,
        index: 0 | 1,
        f: IStrengthFormulas_St | undefined
    ) => {
        return (
            <>
                <p className={classes.text}>- для {!index ? "первого" : "второго"} фланца</p>
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
                {flanges[index]?.type === "free" && (
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
                                    {formatNumber(d.tetaK)}&nbsp;
                                    {d.tetaK <= d.dTetaK ? <> &le; </> : " > "}
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
            {data.strength.length > 2 ? (
                <>
                    {renderCondtion(data.strength[2], 0, formulas?.strength[2])}
                    {renderCondtion(data.strength[3], 1, formulas?.strength[3])}
                </>
            ) : (
                renderCondtion(data.strength[1], 0, formulas?.strength[1])
            )}
        </Container>
    )
}
