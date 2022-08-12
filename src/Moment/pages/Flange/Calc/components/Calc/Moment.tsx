import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ICalculate, IFormulas, IGasketResult } from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: ICalculate
    formulas: IFormulas | undefined
    gasket: IGasketResult
}

export const Moment: FC<Props> = ({ data, formulas, gasket }) => {
    return (
        <Container title='Расчет момента затяжки'>
            {data.basis?.Mkp ? (
                <>
                    <ResLine
                        title='Крутящий момент при затяжке болтов/шпилек'
                        imgUrl='/image/moment/formulas/Mkp.svg'
                        result={formatNumber(data.basis?.Mkp)}
                        formula={{
                            designation: (
                                <>
                                    M<sub>кр</sub>
                                </>
                            ),
                            value: formulas?.basis.Mkp,
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
                        result={formatNumber(data.basis?.Mkp1)}
                        formula={{
                            designation: (
                                <>
                                    M<sub>кр</sub>
                                </>
                            ),
                            value: formulas?.basis.Mkp1,
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
                        result={formatNumber(data.basis?.Mrek)}
                        formula={{
                            designation: (
                                <>
                                    M<sub>рек</sub>
                                </>
                            ),
                            value: formulas?.basis.Mrek,
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
                        result={formatNumber(data.basis?.Qrek)}
                        formula={{
                            designation: (
                                <>
                                    q<sub>рек</sub>
                                </>
                            ),
                            value: formulas?.basis.Qrek,
                        }}
                        units='МПа'
                        resBold
                    />
                    <p className={classes.text}>
                        Максимальный крутящий момент определяется из{" "}
                        <b>
                            {gasket.type === "Мягкая" && data.basis!.Qmax > gasket.permissiblePres
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
                            value: formulas?.basis.Mmax,
                        }}
                        result={formatNumber(data.basis?.Mmax)}
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
                            value: formulas?.basis.Qmax,
                        }}
                        result={formatNumber(data.basis?.Qmax)}
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
