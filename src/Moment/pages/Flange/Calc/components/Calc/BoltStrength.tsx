import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ICalculate, IFormulas, IGasketResult } from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: ICalculate
    res: IGasketResult
    formulas: IFormulas | undefined
    pathBasis: "basis" | "strength"
    pathSigmaB1: "sigmaB1" | "fSigmaB1" | "sSigmaB1"
    pathSigmaB2: "sigmaB2" | "fSigmaB2" | "sSigmaB2"
    pathDSigmaM: "dSigmaM" | "fDSigmaM" | "sDSigmaM"
    pathDSigmaR: "dSigmaR" | "fDSigmaR" | "sDSigmaR"
    pathQ: "q" | "fQ" | "sQ"
}

export const BoltStrength: FC<Props> = ({
    data,
    res,
    formulas,
    pathBasis,
    pathSigmaB1,
    pathSigmaB2,
    pathDSigmaM,
    pathDSigmaR,
    pathQ,
}) => {
    return (
        <Container title='Проверка прочности болтов (шпилек) и прокладки'>
            <p className={classes.text}>Расчетное напряжение в болтах/шпильках</p>
            <ResLine
                title='- при затяжке'
                imgUrl='/image/moment/formulas/sigmaB1.svg'
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>б1</sub>
                        </>
                    ),
                    value: formulas && formulas[pathBasis as "basis"][pathSigmaB1 as "sigmaB1"],
                }}
                result={formatNumber(data[pathBasis as "basis"][pathSigmaB1 as "sigmaB1"])}
                units='МПа'
            />
            <ResLine
                title='- в рабочих условиях'
                imgUrl='/image/moment/formulas/sigmaB2.svg'
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>б2</sub>
                        </>
                    ),
                    value: formulas && formulas[pathBasis as "basis"][pathSigmaB2 as "sigmaB2"],
                }}
                result={formatNumber(data[pathBasis as "basis"][pathSigmaB2 as "sigmaB1"])}
                units='МПа'
            />

            <p className={classes.text}>Допускаемое напряжение для болтов шпилек</p>
            <ResLine
                title='- при затяжке'
                imgUrl='/image/moment/formulas/dSigmaM.svg'
                formula={{
                    designation: (
                        <>
                            [&sigma;]<sub>м</sub>
                            <sup>б</sup>
                        </>
                    ),
                    value: formulas && formulas[pathBasis as "basis"][pathDSigmaM as "sigmaB2"],
                }}
                result={formatNumber(data[pathBasis as "basis"][pathDSigmaM as "sigmaB1"])}
                units='МПа'
            />
            <ResLine
                title='- допускаемое напряжение для болтов шпилек в рабочих условиях и при расчете на условия испытания'
                imgUrl='/image/moment/formulas/dSigmaR.svg'
                formula={{
                    designation: (
                        <>
                            [&sigma;]<sub>р</sub>
                            <sup>б</sup>
                        </>
                    ),
                    value: formulas && formulas[pathBasis as "basis"][pathDSigmaR as "sigmaB2"],
                }}
                result={formatNumber(data[pathBasis as "basis"][pathDSigmaR as "sigmaB1"])}
                units='МПа'
            />

            <p className={classes.text}>Условия прочности болтов шпилек</p>
            <ConditionLine
                title='- при затяжке'
                imgUrl='/image/moment/formulas/vSigmaB1.svg'
                result={
                    <>
                        {formatNumber(data[pathBasis as "basis"][pathSigmaB1 as "sigmaB1"])}
                        {data[pathBasis as "basis"][pathSigmaB1 as "sigmaB1"] <=
                        data[pathBasis as "basis"][pathDSigmaM as "sigmaB1"] ? (
                            <> &le; </>
                        ) : (
                            " > "
                        )}
                        {formatNumber(data[pathBasis as "basis"][pathDSigmaM as "sigmaB1"])}
                    </>
                }
            />
            <ConditionLine
                title='- в рабочих условиях'
                imgUrl='/image/moment/formulas/vSigmaB2.svg'
                result={
                    <>
                        {formatNumber(data[pathBasis as "basis"][pathSigmaB2 as "sigmaB1"])}
                        {data[pathBasis as "basis"][pathSigmaB2 as "sigmaB1"] <=
                        data[pathBasis as "basis"]["Qmax"] ? (
                            <> &le; </>
                        ) : (
                            " > "
                        )}
                        {formatNumber(data[pathBasis as "basis"]["Qmax"])}
                    </>
                }
            />

            {res.typeG === "Мягкая" && (
                <>
                    <ResLine
                        title='Условие прочности прокладки (проверяется для мягких прокладок)'
                        imgUrl=''
                        formula={{
                            designation: <>q</>,
                            value: formulas && formulas[pathBasis as "basis"][pathQ as "sigmaB2"],
                        }}
                        result={formatNumber(data[pathBasis as "basis"][pathQ as "sigmaB1"])}
                        units='МПа'
                    />
                    <ConditionLine
                        imgUrl='/image/moment/formulas/q.svg'
                        result={
                            <>
                                {formatNumber(data[pathBasis as "basis"][pathQ as "sigmaB1"])}
                                {data[pathBasis as "basis"][pathQ as "sigmaB1"] <=
                                res.permissiblePres ? (
                                    <> &le; </>
                                ) : (
                                    " > "
                                )}
                                {formatNumber(res.permissiblePres)}
                            </>
                        }
                    />
                </>
            )}
        </Container>
    )
}
