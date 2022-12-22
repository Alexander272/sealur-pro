import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import {
    IBoltStrength,
    IBoltStrengthFormulas,
    IGasketResult,
} from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: IBoltStrength
    gasket: IGasketResult
    formulas?: IBoltStrengthFormulas
}

export const BoltStrength: FC<Props> = ({ data, gasket, formulas }) => {
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
                result={formatNumber(data.sigmaB1)}
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
                result={formatNumber(data.sigmaB2)}
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
                result={formatNumber(data.dSigmaM)}
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
                result={formatNumber(data.dSigmaR)}
                units='МПа'
            />

            <p className={classes.text}>Условия прочности болтов шпилек</p>
            <ConditionLine
                title='- при затяжке'
                imgUrl='/image/moment/formulas/flange/vSigmaB1.svg'
                result={
                    <>
                        {formatNumber(data.sigmaB1)}&nbsp;
                        {data.vSigmaB1 ? <> &le; </> : " > "}
                        &nbsp;
                        {formatNumber(data.dSigmaM)}
                    </>
                }
            />
            <ConditionLine
                title='- в рабочих условиях'
                imgUrl='/image/moment/formulas/flange/vSigmaB2.svg'
                result={
                    <>
                        {formatNumber(data.sigmaB2)}&nbsp;
                        {data.vSigmaB2 ? <> &le; </> : " > "}
                        &nbsp;
                        {formatNumber(data.dSigmaR)}
                    </>
                }
            />

            {gasket.type === "Soft" && (
                <>
                    <ResLine
                        title='Условие прочности прокладки (проверяется для мягких прокладок)'
                        imgUrl='/image/moment/formulas/flange/qF.svg'
                        formula={{
                            designation: <>q</>,
                            value: formulas?.q,
                        }}
                        result={formatNumber(data.q)}
                        units='МПа'
                    />
                    <ConditionLine
                        imgUrl='/image/moment/formulas/flange/q.svg'
                        result={
                            <>
                                {formatNumber(data.q)}&nbsp;
                                {data.q <= gasket.permissiblePres ? <> &le; </> : " > "}
                                &nbsp;
                                {formatNumber(gasket.permissiblePres)}
                            </>
                        }
                    />
                </>
            )}
        </Container>
    )
}
