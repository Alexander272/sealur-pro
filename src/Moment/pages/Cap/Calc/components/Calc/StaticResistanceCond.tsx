import React, { FC } from "react"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import {
    IStrengthResult,
    IFlangeResult,
    IStrengthFormulas_St,
} from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: IStrengthResult
    flange: IFlangeResult
    formulas: IStrengthFormulas_St | undefined
}

export const StaticResistanceCond: FC<Props> = ({ data, flange, formulas }) => {
    return (
        <>
            {!data.isSameSigma ? (
                <>
                    <p className={classes.text}>
                        Для приварных встык фланцев с конической втулкой в сечении S&#8321; условия
                        статической прочности
                    </p>
                    <ConditionLine
                        title='- при затяжке'
                        imgUrl='/image/moment/formulas/flange/max1.svg'
                        formula={{ value: formulas?.Max1 }}
                        result={
                            <>
                                {formatNumber(data.Max1)}&nbsp;
                                {data.Max1 <= data.condMax1 ? <> &le; </> : " > "}
                                &nbsp;
                                {formatNumber(data.condMax1)}
                            </>
                        }
                    />
                    <ConditionLine
                        title='- в рабочих условиях'
                        imgUrl='/image/moment/formulas/flange/max2.svg'
                        formula={{ value: formulas?.Max2 }}
                        result={
                            <>
                                {formatNumber(data.Max2)}&nbsp;
                                {data.Max2 <= data.condMax2 ? <> &le; </> : " > "}&nbsp;
                                {formatNumber(data.condMax2)}
                            </>
                        }
                    />

                    <p className={classes.text}>
                        Для приварных встык фланцев с конической втулкой в сечении S&#8320; условия
                        статической прочности
                    </p>
                    <ConditionLine
                        title='- при затяжке'
                        imgUrl='/image/moment/formulas/flange/max3.svg'
                        formula={{ value: formulas?.Max3 }}
                        result={
                            <>
                                {formatNumber(data.Max3)}&nbsp;
                                {data.Max3 <= data.condMax3 ? <> &le; </> : " > "}&nbsp;
                                {formatNumber(data.condMax3)}
                            </>
                        }
                    />
                    <ConditionLine
                        title='- в рабочих условиях'
                        imgUrl='/image/moment/formulas/flange/max4.svg'
                        formula={{ value: formulas?.Max4 }}
                        result={
                            <>
                                {formatNumber(data.Max4)}&nbsp;
                                {data.Max4 <= data.condMax4 ? <> &le; </> : " > "}&nbsp;
                                {formatNumber(data.condMax4)}
                            </>
                        }
                    />
                </>
            ) : (
                <>
                    <p className={classes.text}>
                        Для приварных встык фланцев с прямой втулкой плоских фланцев и буртов
                        свободных фланцев в сечении S&#8321; условия статической прочности
                    </p>
                    <ConditionLine
                        title='- при затяжке'
                        imgUrl='/image/moment/formulas/flange/max1_0.svg'
                        formula={{ value: formulas?.Max5 }}
                        result={
                            <>
                                {formatNumber(data.Max5)}&nbsp;
                                {data.Max5 <= data.condMax5 ? <> &le; </> : " > "}&nbsp;
                                {formatNumber(data.condMax5)}
                            </>
                        }
                    />
                    <ConditionLine
                        title='- в рабочих условиях'
                        imgUrl='/image/moment/formulas/flange/max2_0.svg'
                        formula={{ value: formulas?.Max6 }}
                        result={
                            <>
                                {formatNumber(data.Max6)}&nbsp;
                                {data.Max6 <= data.condMax6 ? <> &le; </> : " > "}&nbsp;
                                {formatNumber(data.condMax6)}
                            </>
                        }
                    />
                </>
            )}

            <ConditionLine
                title='Для фланцев всех типов в сечении S&#8320; должно выполняться условие'
                imgUrl='/image/moment/formulas/flange/max5.svg'
                formula={{ value: formulas?.Max7 }}
                result={
                    <>
                        {formatNumber(data.Max7)}&nbsp;
                        {data.Max7 <= data.condMax7 ? <> &le; </> : " > "}&nbsp;
                        {formatNumber(data.condMax7)}
                    </>
                }
            />

            <p className={classes.text}>
                Для тарелок приварных встык фланцев, плоских фланцев и буртов свободных фланцев
                должны выполняться условия
            </p>
            <ConditionLine
                title='- при затяжке'
                imgUrl='/image/moment/formulas/flange/max6.svg'
                formula={{ value: formulas?.Max8 }}
                result={
                    <>
                        {formatNumber(data.Max8)}&nbsp;
                        {data.Max8 <= data.condMax8 ? <> &le; </> : " > "}&nbsp;
                        {formatNumber(data.condMax8)}
                    </>
                }
            />
            <ConditionLine
                title='- в рабочих условиях'
                imgUrl='/image/moment/formulas/flange/max7.svg'
                formula={{ value: formulas?.Max9 }}
                result={
                    <>
                        {formatNumber(data.Max9)}&nbsp;
                        {data.Max9 <= data.condMax9 ? <> &le; </> : " > "}&nbsp;
                        {formatNumber(data.condMax9)}
                    </>
                }
            />

            {flange.type === "free" && (
                <>
                    <p className={classes.text}>
                        Для колец свободных фланцев условия статической прочности определяют по
                        формулам
                    </p>
                    <ConditionLine
                        title='- при затяжке'
                        imgUrl='/image/moment/formulas/flange/max8.svg'
                        formula={{ value: formulas?.Max10 }}
                        result={
                            <>
                                {formatNumber(data.Max10)}&nbsp;
                                {data.Max10 <= data.condMax10 ? <> &le; </> : " > "}&nbsp;
                                {formatNumber(data.condMax10)}
                            </>
                        }
                    />
                    <ConditionLine
                        title='- в рабочих условиях'
                        imgUrl='/image/moment/formulas/flange/max9.svg'
                        formula={{ value: formulas?.Max11 }}
                        result={
                            <>
                                {formatNumber(data.Max11)}&nbsp;
                                {data.Max11 <= data.condMax11 ? <> &le; </> : " > "}&nbsp;
                                {formatNumber(data.condMax11)}
                            </>
                        }
                    />
                </>
            )}

            <ResLine
                title='Угол поворота приварного встык фланца и бурта свободного фланца в рабочих условия'
                imgUrl='/image/moment/formulas/flange/theta.svg'
                formula={{
                    designation: <>&theta;</>,
                    value: formulas?.teta,
                }}
                result={formatNumber(data.teta)}
                units='рад'
            />
            <ConditionLine
                imgUrl='/image/moment/formulas/flange/thetaCond.svg'
                result={
                    <>
                        {formatNumber(data.teta)}&nbsp;
                        {data.teta <= data.dTeta ? <> &le; </> : " > "}&nbsp;
                        {formatNumber(data.dTeta)}
                    </>
                }
            />

            {flange.type === "free" && (
                <>
                    <ResLine
                        title='Угол поворота кольца свободного фланца в рабочих условиях'
                        imgUrl='/image/moment/formulas/flange/thetaK.svg'
                        formula={{
                            designation: (
                                <>
                                    &theta;<sub>к</sub>
                                </>
                            ),
                            value: formulas?.tetaK,
                        }}
                        result={formatNumber(data.tetaK)}
                        units='рад'
                    />
                    <ConditionLine
                        imgUrl='/image/moment/formulas/flange/thetaCondK.svg'
                        result={
                            <>
                                {formatNumber(data.tetaK)}&nbsp;
                                {data.teta <= data.dTetaK ? <> &le; </> : " > "}&nbsp;
                                {formatNumber(data.dTetaK)}
                            </>
                        }
                    />
                </>
            )}
        </>
    )
}
