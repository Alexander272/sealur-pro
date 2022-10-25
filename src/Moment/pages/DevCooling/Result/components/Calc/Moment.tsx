import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ICalcMoment, IGasketResult, IMomentFormulas } from "../../../../../types/res_devCooling"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    res: ICalcMoment
    formulas?: IMomentFormulas
    gasket: IGasketResult
}

export const Moment: FC<Props> = ({ res, formulas, gasket }) => {
    return (
        <>
            <p className={!(res.Mkp && res.Mrek) ? classes.incorrect : ""}>
                Выбранная конструкция {!(res.Mkp && res.Mrek) && "не "}соответствует требованиям
                методики расчета аппаратов воздушного охлаждения.
            </p>
            {res.Mkp && res.Mrek ? (
                <Container title='Расчет момента затяжки'>
                    <ResLine
                        title='Крутящий момент при затяжке болтов/шпилек'
                        imgUrl='/image/moment/formulas/dev-cooling/Mkp.svg'
                        result={formatNumber(res.Mkp)}
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
                        result={formatNumber(res.Mkp1)}
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
                        result={formatNumber(res.Mrek)}
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
                        result={formatNumber(res.Qrek)}
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
                            {gasket.type === "Мягкая" && res.Qmax > gasket.permissiblePres
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
                        result={formatNumber(res.Mmax)}
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
                        result={formatNumber(res.Qmax)}
                        units='МПа'
                        resBold
                    />
                </Container>
            ) : (
                <p className={classes.incorrect}>Проверьте правильность ввода исходных данных</p>
            )}
        </>
    )
}
