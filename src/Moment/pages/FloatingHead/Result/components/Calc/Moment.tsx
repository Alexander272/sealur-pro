import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ICalculate, IFormulas, IGasketResult } from "../../../../../types/res_float"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    calc: ICalculate
    formulas: IFormulas | undefined
    gasket: IGasketResult
}

export const Moment: FC<Props> = ({ calc, formulas, gasket }) => {
    return (
        <Container title='Расчет момента затяжки'>
            {calc.Mkp && calc.Mrek ? (
                <>
                    <ResLine
                        title='Крутящий момент при затяжке болтов/шпилек'
                        imgUrl='/image/moment/formulas/flange/Mkp.svg'
                        result={formatNumber(calc.Mkp)}
                        formula={{
                            designation: (
                                <>
                                    M<sub>кр</sub>
                                </>
                            ),
                            value: formulas?.Mkp,
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
                        result={formatNumber(calc.Mkp1)}
                        formula={{
                            designation: (
                                <>
                                    M<sub>кр</sub>
                                </>
                            ),
                            value: formulas?.Mkp1,
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
                        result={formatNumber(calc.Mrek)}
                        formula={{
                            designation: (
                                <>
                                    M<sub>рек</sub>
                                </>
                            ),
                            value: formulas?.Mrek,
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
                        result={formatNumber(calc.Qrek)}
                        formula={{
                            designation: (
                                <>
                                    q<sub>рек</sub>
                                </>
                            ),
                            value: formulas?.Qrek,
                        }}
                        units='МПа'
                        resBold
                    />
                    <p className={classes.text}>
                        Максимальный крутящий момент определяется из{" "}
                        <b>
                            {gasket.type === "Мягкая" && calc.Qmax > gasket.permissiblePres
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
                            value: formulas?.Mmax,
                        }}
                        result={formatNumber(calc.Mmax)}
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
                            value: formulas?.Qmax,
                        }}
                        result={formatNumber(calc.Qmax)}
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
