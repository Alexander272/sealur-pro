import React, { FC } from "react"
import {
    IConditionsForStrength,
    IConditionsForStrengthFormulas,
    IFlangeResult,
} from "../../../../../types/res_flange"
import { Container } from "../../../../../components/Container/Container"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: IConditionsForStrength[]
    flanges: IFlangeResult[]
    formulas: IConditionsForStrengthFormulas[] | undefined
}

export const SealingCondition: FC<Props> = ({ data, flanges, formulas }) => {
    return (
        <Container title='Условие герметичности фланцевого соединения'>
            {data.map((d, i) => (
                <React.Fragment key={i}>
                    <p className={classes.text}>- для {i === 0 ? "первого" : "второго"} фланца</p>
                    <ResLine
                        title='Угол поворота приварного встык фланца и бурта свободного фланца'
                        imgUrl='/image/moment/formulas/flange/theta.svg'
                        formula={{ designation: <>&Theta;</>, value: formulas && formulas[i].teta }}
                        result={formatNumber(d.teta)}
                        units='рад'
                    />
                    <ConditionLine
                        imgUrl='/image/moment/formulas/flange/thetaCond.svg'
                        result={
                            <>
                                {formatNumber(d.condTeta.x)}&nbsp;
                                {d.condTeta.x <= d.condTeta.y ? <> &le; </> : " > "}
                                &nbsp;
                                {formatNumber(d.condTeta.y)}
                            </>
                        }
                    />
                    {flanges[i]?.type === "free" && (
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
                                        {formatNumber(d.condTetaK.x)}&nbsp;
                                        {d.condTetaK.x <= d.condTetaK.y ? <> &le; </> : " > "}
                                        &nbsp;
                                        {formatNumber(d.condTetaK.y)}
                                    </>
                                }
                            />
                        </>
                    )}
                </React.Fragment>
            ))}
        </Container>
    )
}
