import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { IGasketResult, IMoment, IMomentFormulas } from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: IMoment
    formulas?: IMomentFormulas
    gasket: IGasketResult
}

export const Moment: FC<Props> = ({ data, formulas, gasket }) => {
    return data.Mkp ? (
        <Container title='Расчет момента затяжки'>
            <>
                <ResLine
                    title='Крутящий момент при затяжке болтов/шпилек'
                    imgUrl='/image/moment/formulas/flange/Mkp.svg'
                    result={formatNumber(data.Mkp)}
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
                    result={formatNumber(data.Mkp1)}
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
                {data.Mrek && (
                    <>
                        {" "}
                        <ResLine
                            title='Момент затяжки при применении уплотнения на старых (изношенных) фланцах, имеющих перекосы'
                            imgText={
                                <>
                                    M<sub>рек</sub>
                                </>
                            }
                            result={formatNumber(data.Mrek)}
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
                            result={formatNumber(data.Qrek)}
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
                                {gasket.type === "Soft" && data.Qmax > gasket.permissiblePres
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
                            result={formatNumber(data.Mmax)}
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
                            result={formatNumber(data.Qmax)}
                            units='МПа'
                            resBold
                        />
                    </>
                )}
            </>
        </Container>
    ) : (
        <p className={classes.incorrect}>Проверьте правильность ввода исходных данных</p>
    )
}
