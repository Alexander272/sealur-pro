import React, { FC } from "react"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { CameraDiagram } from "../../../../../types/devCooling"
import { IBoltFormulas, ICalcBolt } from "../../../../../types/res_devCooling"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    cameraDiagram: CameraDiagram
    res: ICalcBolt
    formulas: IBoltFormulas | undefined
}

export const Bolt: FC<Props> = ({ cameraDiagram, res, formulas }) => {
    return (
        <Container title='Расчет болтового соединения'>
            <ResLine
                title='Расчетное усилие в болтах (шпильках) в условиях эксплуатации'
                imgUrl='/image/moment/formulas/dev-cooling/workEffort.svg'
                formula={{
                    designation: (
                        <>
                            F<sub>B</sub>
                        </>
                    ),
                    value: formulas?.workEffort,
                }}
                result={formatNumber(res.workEffort)}
                units='H'
            />
            <ResLine
                title='где:'
                imgUrl='/image/moment/formulas/dev-cooling/Lp.svg'
                formula={{
                    designation: (
                        <>
                            L<sub>p</sub>
                        </>
                    ),
                    value: formulas?.Lp,
                }}
                result={formatNumber(res.Lp)}
                units='мм'
            />

            <ResLine
                title='Расчетно усилие в болтах (шпильках) в условиях испытаний или монтажа'
                imgUrl='/image/moment/formulas/dev-cooling/effort.svg'
                formula={{
                    designation: (
                        <>
                            F<sub>0</sub>
                        </>
                    ),
                    value: formulas?.effort,
                }}
                result={formatNumber(res.effort)}
                units='H'
            />
            <p className={classes.text}>где:</p>
            <ResLine
                title='Коэффициент податливости фланцевого соединения крышки и решетки'
                imgUrl='/image/moment/formulas/dev-cooling/etaP.svg'
                formula={{
                    designation: (
                        <>
                            F<sub>0</sub>
                        </>
                    ),
                    value: formulas?.eta,
                }}
                result={formatNumber(res.eta)}
            />

            <p className={classes.text}>где:</p>
            <ResLine
                title='Угловые податливости крышки'
                imgUrl={
                    cameraDiagram === "schema4"
                        ? "/image/moment/formulas/dev-cooling/capUpsilonP2.svg"
                        : "/image/moment/formulas/dev-cooling/capUpsilonP1.svg"
                }
                formula={{
                    designation: (
                        <>
                            Y<sub>k</sub>
                            <sup>p</sup>
                        </>
                    ),
                    value: formulas?.capUpsilonP,
                }}
                result={formatNumber(res.capUpsilonP)}
                units='1/(H*мм)'
            />
            <ResLine
                imgUrl={
                    cameraDiagram === "schema4"
                        ? "/image/moment/formulas/dev-cooling/capUpsilonM2.svg"
                        : "/image/moment/formulas/dev-cooling/capUpsilonM1.svg"
                }
                formula={{
                    designation: (
                        <>
                            Y<sub>k</sub>
                            <sup>М</sup>
                        </>
                    ),
                    value: formulas?.capUpsilonM,
                }}
                result={formatNumber(res.capUpsilonM)}
                units='1/(H*мм)'
            />
            <ResLine
                title='Угловые податливости решетки'
                imgUrl='/image/moment/formulas/dev-cooling/sheetUpsilonP.svg'
                formula={{
                    designation: (
                        <>
                            Y<sub>p</sub>
                            <sup>P</sup>
                        </>
                    ),
                    value: formulas?.sheetUpsilonP,
                }}
                result={formatNumber(res.sheetUpsilonP)}
                units='1/(H*мм)'
            />
            <ResLine
                imgUrl='/image/moment/formulas/dev-cooling/sheetUpsilonM.svg'
                formula={{
                    designation: (
                        <>
                            Y<sub>p</sub>
                            <sup>М</sup>
                        </>
                    ),
                    value: formulas?.sheetUpsilonM,
                }}
                result={formatNumber(res.sheetUpsilonM)}
                units='1/(H*мм)'
            />

            <ResLine
                title='Линейная податливость болта (шпильки)'
                imgUrl='/image/moment/formulas/dev-cooling/upsilonB.svg'
                formula={{
                    designation: (
                        <>
                            Y<sub>B</sub>
                        </>
                    ),
                    value: formulas?.upsilonB,
                }}
                result={formatNumber(res.upsilonB)}
                units='мм/H'
            />
            <ResLine
                title='Линейная податливость прокладки'
                imgUrl='/image/moment/formulas/dev-cooling/upsilonP.svg'
                formula={{
                    designation: (
                        <>
                            Y<sub>p</sub>
                        </>
                    ),
                    value: formulas?.upsilonP,
                }}
                result={formatNumber(res.upsilonP)}
                units='мм/H'
            />

            <p className={classes.title}>Условия прочности болтов/шпилек</p>
            <ConditionLine
                formula={{ value: formulas?.testCond }}
                imgUrl='/image/moment/formulas/dev-cooling/testCond.svg'
                result={
                    <>
                        {formatNumber(res.testCond.x)}&nbsp;
                        {res.testCond.x <= res.testCond.y ? <> &le; </> : " > "}
                        &nbsp;
                        {formatNumber(res.testCond.y)}
                    </>
                }
            />
            <ConditionLine
                formula={{ value: formulas?.workCond }}
                imgUrl='/image/moment/formulas/dev-cooling/workCond.svg'
                result={
                    <>
                        {formatNumber(res.workCond.x)}&nbsp;
                        {res.workCond.x <= res.workCond.y ? <> &le; </> : " > "}
                        &nbsp;
                        {formatNumber(res.workCond.y)}
                    </>
                }
            />

            <p className={classes.title}>
                <b>
                    Условие прочности болтов/шпилек{" "}
                    {!(res.testCond.x <= res.testCond.y && res.workCond.x <= res.workCond.y) &&
                        "не "}
                    выполнены
                </b>
            </p>
        </Container>
    )
}
