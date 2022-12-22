import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ICalculateCap, IFormulasCap } from "../../../../../types/res_cap"
import { IGasketResult } from "../../../../../types/res_flange_old"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: ICalculateCap
    formulas: IFormulasCap | undefined
    gasket: IGasketResult
    path: "basis" | "strength"
    mkp: "Mkp" | "sMkp"
    mkp1: "Mkp1" | "sMkp1"
}

export const Moment: FC<Props> = ({ data, formulas, gasket, path, mkp, mkp1 }) => {
    return (
        <Container title='Расчет момента затяжки'>
            {data[`${path as "basis"}`][`${mkp as "Mkp"}`] && data[`${path as "basis"}`]?.Mrek ? (
                <>
                    <ResLine
                        title='Крутящий момент при затяжке болтов/шпилек'
                        imgUrl='/image/moment/formulas/flange/Mkp.svg'
                        result={formatNumber(data[`${path as "basis"}`][`${mkp as "Mkp"}`])}
                        formula={{
                            designation: (
                                <>
                                    M<sub>кр</sub>
                                </>
                            ),
                            value: formulas && formulas[`${path as "basis"}`][`${mkp as "Mkp"}`],
                        }}
                        units='H*м'
                        resBold
                    />
                    <ResLine
                        title='Крутящий момент при затяжке болтов/шпилек со смазкой снижается на 25%'
                        imgText={
                            <>
                                M<sub>кр</sub>=0,75*M<sub>кр</sub>
                            </>
                        }
                        result={formatNumber(data[`${path as "basis"}`][`${mkp1 as "Mkp1"}`])}
                        formula={{
                            designation: (
                                <>
                                    M<sub>кр</sub>
                                </>
                            ),
                            value: formulas && formulas[`${path as "basis"}`][`${mkp1 as "Mkp"}`],
                        }}
                        units='H*м'
                    />
                    <ResLine
                        title='Момент затяжки при применении уплотнения на старых (изношенных) фланцах, имеющих перекосы'
                        imgText={
                            <>
                                M<sub>рек</sub>
                            </>
                        }
                        result={formatNumber(data[`${path as "basis"}`]?.Mrek)}
                        formula={{
                            designation: (
                                <>
                                    M<sub>рек</sub>
                                </>
                            ),
                            value: formulas && formulas[`${path as "basis"}`].Mrek,
                        }}
                        units='H*м'
                        resBold
                    />
                    <ResLine
                        title='Напряжение на прокладке'
                        imgText={
                            <>
                                q<sub>рек</sub>
                            </>
                        }
                        result={formatNumber(data[`${path as "basis"}`]?.Qrek)}
                        formula={{
                            designation: (
                                <>
                                    q<sub>рек</sub>
                                </>
                            ),
                            value: formulas && formulas[`${path as "basis"}`].Qrek,
                        }}
                        units='МПа'
                        resBold
                    />
                    <p className={classes.text}>
                        Максимальный крутящий момент определяется из{" "}
                        <b>
                            {gasket.type === "Мягкая" &&
                            data[`${path as "basis"}`].Qmax > gasket.permissiblePres
                                ? "условия прочности прокладки"
                                : "условия прочности болта"}
                        </b>
                    </p>
                    <ResLine
                        title='Максимальный крутящий момент при затяжке болтов/шпилек'
                        imgText={
                            <>
                                M<sub>кр</sub> <sub>max</sub>
                            </>
                        }
                        formula={{
                            designation: (
                                <>
                                    M<sub>кр</sub> <sub>max</sub>
                                </>
                            ),
                            value: formulas && formulas[`${path as "basis"}`].Mmax,
                        }}
                        result={formatNumber(data[`${path as "basis"}`]?.Mmax)}
                        units='H*м'
                        resBold
                    />
                    <ResLine
                        title='Максимальное напряжение на прокладке'
                        imgText={
                            <>
                                q<sub>max</sub>
                            </>
                        }
                        formula={{
                            designation: (
                                <>
                                    q<sub>max</sub>
                                </>
                            ),
                            value: formulas && formulas[`${path as "basis"}`].Qmax,
                        }}
                        result={formatNumber(data[`${path as "basis"}`]?.Qmax)}
                        units='МПа'
                        resBold
                    />
                </>
            ) : (
                <p className={classes.incorrect}>Проверьте правильность ввода исходных данных</p>
            )}
        </Container>
    )
}
