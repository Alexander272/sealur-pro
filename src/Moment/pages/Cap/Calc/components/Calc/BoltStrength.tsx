import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { IFormulas, IGasketResult } from "../../../../../types/res_flange"
import { ICalculateCap } from "../../../../../types/res_cap"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: ICalculateCap
    res: IGasketResult
    formulas: IFormulas | undefined
    path: "basis" | "strength"
    sigmaB1: "sigmaB1" | "fSigmaB1" | "sSigmaB1"
    sigmaB2: "sigmaB2" | "fSigmaB2" | "sSigmaB2"
    dSigmaM: "dSigmaM" | "fDSigmaM" | "sDSigmaM"
    dSigmaR: "dSigmaR" | "fDSigmaR" | "sDSigmaR"
    q: "q" | "fQ" | "sQ"
}

export const BoltStrength: FC<Props> = ({
    data,
    res,
    formulas,
    path,
    sigmaB1,
    sigmaB2,
    dSigmaM,
    dSigmaR,
    q,
}) => {
    return (
        <Container title='Проверка прочности болтов (шпилек) и прокладки'>
            <p className={classes.text}>Расчетное напряжение в болтах/шпильках</p>
            <ResLine
                title='- при затяжке'
                imgUrl='/image/moment/formulas/flange/sigmaB1.svg'
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>б1</sub>
                        </>
                    ),
                    value: formulas && formulas[path as "basis"][sigmaB1 as "sigmaB1"],
                }}
                result={formatNumber(data[path as "basis"][sigmaB1 as "sigmaB1"])}
                units='МПа'
            />
            <ResLine
                title='- в рабочих условиях'
                imgUrl='/image/moment/formulas/flange/sigmaB2.svg'
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>б2</sub>
                        </>
                    ),
                    value: formulas && formulas[path as "basis"][sigmaB2 as "sigmaB2"],
                }}
                result={formatNumber(data[path as "basis"][sigmaB2 as "sigmaB1"])}
                units='МПа'
            />

            <p className={classes.text}>Допускаемое напряжение для болтов шпилек</p>
            <ResLine
                title='- при затяжке'
                imgUrl='/image/moment/formulas/flange/dSigmaM.svg'
                formula={{
                    designation: (
                        <>
                            [&sigma;]<sub>м</sub>
                            <sup>б</sup>
                        </>
                    ),
                    value: formulas && formulas[path as "basis"][dSigmaM as "sigmaB2"],
                }}
                result={formatNumber(data[path as "basis"][dSigmaM as "sigmaB1"])}
                units='МПа'
            />
            <ResLine
                title='- допускаемое напряжение для болтов шпилек в рабочих условиях и при расчете на условия испытания'
                imgUrl='/image/moment/formulas/flange/dSigmaR.svg'
                formula={{
                    designation: (
                        <>
                            [&sigma;]<sub>р</sub>
                            <sup>б</sup>
                        </>
                    ),
                    value: formulas && formulas[path as "basis"][dSigmaR as "sigmaB2"],
                }}
                result={formatNumber(data[path as "basis"][dSigmaR as "sigmaB1"])}
                units='МПа'
            />

            <p className={classes.text}>Условия прочности болтов шпилек</p>
            <ConditionLine
                title='- при затяжке'
                imgUrl='/image/moment/formulas/flange/vSigmaB1.svg'
                result={
                    <>
                        {formatNumber(data[path as "basis"][sigmaB1 as "sigmaB1"])}&nbsp;
                        {data[path as "basis"][sigmaB1 as "sigmaB1"] <=
                        data[path as "basis"][dSigmaM as "sigmaB1"] ? (
                            <> &le; </>
                        ) : (
                            " > "
                        )}
                        &nbsp;
                        {formatNumber(data[path as "basis"][dSigmaM as "sigmaB1"])}
                    </>
                }
            />
            <ConditionLine
                title='- в рабочих условиях'
                imgUrl='/image/moment/formulas/flange/vSigmaB2.svg'
                result={
                    <>
                        {formatNumber(data[path as "basis"][sigmaB2 as "sigmaB1"])}&nbsp;
                        {data[path as "basis"][sigmaB2 as "sigmaB1"] <=
                        data[path as "basis"][dSigmaR as "sigmaB1"] ? (
                            <> &le; </>
                        ) : (
                            " > "
                        )}
                        &nbsp;
                        {formatNumber(data[path as "basis"][dSigmaR as "sigmaB1"])}
                    </>
                }
            />

            {res.type === "Мягкая" && (
                <>
                    <ResLine
                        title='Условие прочности прокладки (проверяется для мягких прокладок)'
                        imgUrl='/image/moment/formulas/flange/qF.svg'
                        formula={{
                            designation: <>q</>,
                            value: formulas && formulas[path as "basis"][q as "sigmaB2"],
                        }}
                        result={formatNumber(data[path as "basis"][q as "sigmaB1"])}
                        units='МПа'
                    />
                    <ConditionLine
                        imgUrl='/image/moment/formulas/flange/q.svg'
                        result={
                            <>
                                {formatNumber(data[path as "basis"][q as "sigmaB1"])}&nbsp;
                                {data[path as "basis"][q as "sigmaB1"] <= res.permissiblePres ? (
                                    <> &le; </>
                                ) : (
                                    " > "
                                )}
                                &nbsp;
                                {formatNumber(res.permissiblePres)}
                            </>
                        }
                    />
                </>
            )}
        </Container>
    )
}
