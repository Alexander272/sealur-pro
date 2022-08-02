import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ICalculate, IFormulas, IGasketResult } from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "./ResLine/ResLine"
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
    pathQ: "q"
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
                imgUrl=''
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>в1</sub>
                        </>
                    ),
                    value: formulas && formulas[pathBasis as "basis"][pathSigmaB1 as "sigmaB1"],
                }}
                result={formatNumber(data[pathBasis as "basis"][pathSigmaB1 as "sigmaB1"])}
                units='МПа'
            />
            <ResLine
                title='- в рабочих условиях'
                imgUrl=''
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>в2</sub>
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
                imgUrl=''
                formula={{
                    designation: (
                        <>
                            [&sigma;]<sub>м</sub>
                            <sup>в</sup>
                        </>
                    ),
                    value: formulas && formulas[pathBasis as "basis"][pathDSigmaM as "sigmaB2"],
                }}
                result={formatNumber(data[pathBasis as "basis"][pathDSigmaM as "sigmaB1"])}
                units='МПа'
            />
            <ResLine
                title='- допускаемое напряжение для болтов шпилек в рабочих условиях и при расчете на условия испытания'
                imgUrl=''
                formula={{
                    designation: (
                        <>
                            [&sigma;]<sub>р</sub>
                            <sup>в</sup>
                        </>
                    ),
                    value: formulas && formulas[pathBasis as "basis"][pathDSigmaR as "sigmaB2"],
                }}
                result={formatNumber(data[pathBasis as "basis"][pathDSigmaR as "sigmaB1"])}
                units='МПа'
            />

            <p className={classes.text}>Условия прочности болтов шпилек</p>

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
                </>
            )}
        </Container>
    )
}
