import React, { FC } from "react"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { IBoltsFormulas, ICalcBolts, IGasketResult } from "../../../../../types/res_exRect"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    res: ICalcBolts
    formulas?: IBoltsFormulas
    gasket: IGasketResult
}

export const BoltStrength: FC<Props> = ({ res, formulas, gasket }) => {
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
                    value: formulas?.ratedStress,
                }}
                result={formatNumber(res.ratedStress)}
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
                    value: formulas?.allowableVoltage,
                }}
                result={formatNumber(res.allowableVoltage)}
                units='МПа'
            />

            <p className={classes.text}>Условия прочности болтов шпилек</p>
            <ConditionLine
                title='- при затяжке'
                imgUrl='/image/moment/formulas/flange/vSigmaB1.svg'
                result={
                    <>
                        {formatNumber(res.strengthBolt.x)}&nbsp;
                        {res.strengthBolt.x <= res.strengthBolt.y ? <> &le; </> : " > "}
                        &nbsp;
                        {formatNumber(res.strengthBolt.y)}
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
                            value: formulas?.strengthGasket,
                        }}
                        result={formatNumber(res.strengthGasket.x)}
                        units='МПа'
                    />
                    <ConditionLine
                        imgUrl='/image/moment/formulas/flange/q.svg'
                        result={
                            <>
                                {formatNumber(res.strengthGasket.x)}&nbsp;
                                {res.strengthGasket.x <= res.strengthGasket.y ? <> &le; </> : " > "}
                                &nbsp;
                                {formatNumber(res.strengthGasket.y)}
                            </>
                        }
                    />
                </>
            )}
        </Container>
    )
}
