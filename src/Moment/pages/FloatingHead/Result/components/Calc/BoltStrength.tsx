import React, { FC } from "react"
import { formatNumber } from "../../../../../utils/format"
import { ICalculate, IFormulas, IGasketResult } from "../../../../../types/res_float"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import classes from "../../../../styles/page.module.scss"

type Props = {
    calc: ICalculate
    gasket: IGasketResult
    formulas: IFormulas | undefined
}

export const BoltStrength: FC<Props> = ({ calc, gasket, formulas }) => {
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
                    value: formulas?.sigmaB1,
                }}
                result={formatNumber(calc.sigmaB1)}
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
                    value: formulas?.sigmaB2,
                }}
                result={formatNumber(calc.sigmaB2)}
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
                    value: formulas?.dSigmaM,
                }}
                result={formatNumber(calc.dSigmaM)}
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
                    value: formulas?.dSigmaR,
                }}
                result={formatNumber(calc.dSigmaR)}
                units='МПа'
            />

            <p className={classes.text}>Условия прочности болтов шпилек</p>
            <ConditionLine
                title='- при затяжке'
                imgUrl='/image/moment/formulas/flange/vSigmaB1.svg'
                result={
                    <>
                        {formatNumber(calc.sigmaB1)}&nbsp;
                        {calc.sigmaB1 <= calc.dSigmaM ? <> &le; </> : " > "}
                        &nbsp;{formatNumber(calc.dSigmaM)}
                    </>
                }
            />
            <ConditionLine
                title='- в рабочих условиях'
                imgUrl='/image/moment/formulas/flange/vSigmaB2.svg'
                result={
                    <>
                        {formatNumber(calc.sigmaB2)}&nbsp;
                        {calc.sigmaB2 <= calc.dSigmaR ? <> &le; </> : " > "}
                        &nbsp;{formatNumber(calc.dSigmaR)}
                    </>
                }
            />

            {gasket.type === "Мягкая" && (
                <>
                    <ResLine
                        title='Условие прочности прокладки (проверяется для мягких прокладок)'
                        imgUrl='/image/moment/formulas/flange/qF.svg'
                        formula={{
                            designation: <>q</>,
                            value: formulas?.q,
                        }}
                        result={formatNumber(calc.q)}
                        units='МПа'
                    />
                    <ConditionLine
                        imgUrl='/image/moment/formulas/flange/q.svg'
                        result={
                            <>
                                {formatNumber(calc.q)}&nbsp;
                                {calc.q <= gasket.permissiblePres ? <> &le; </> : " > "}
                                &nbsp;{formatNumber(gasket.permissiblePres)}
                            </>
                        }
                    />
                </>
            )}
        </Container>
    )
}
