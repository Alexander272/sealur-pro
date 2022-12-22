import React, { FC } from "react"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import {
    ICalcAuxiliary,
    ICalcTubeSheet,
    ITubeSheetFormulas,
} from "../../../../../types/res_devCooling"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    pressure: number
    auxiliary: ICalcAuxiliary
    res: ICalcTubeSheet
    formulas?: ITubeSheetFormulas
}

export const TubeSheet: FC<Props> = ({ pressure, auxiliary, res, formulas }) => {
    return (
        <Container title='Расчет трубной решетки'>
            <ResLine
                title='Толщина трубной решетки в пределах зоны перфорации'
                imgUrl='/image/moment/formulas/dev-cooling/zoneThick.svg'
                formula={{
                    designation: (
                        <>
                            s<sub>1</sub>
                        </>
                    ),
                    value: formulas?.zoneThick,
                }}
                result={formatNumber(res.zoneThick)}
                units='мм'
            />
            <ResLine
                title='где коэффициенты:'
                imgUrl='/image/moment/formulas/dev-cooling/Lambda.svg'
                formula={{
                    designation: (
                        <>
                            &Lambda;<sub>p</sub>
                        </>
                    ),
                    value: formulas?.Lambda,
                }}
                result={formatNumber(res.Lambda)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/dev-cooling/psiP.svg'
                formula={{
                    designation: (
                        <>
                            &psi;<sub>p</sub>
                        </>
                    ),
                    value: formulas?.Psi,
                }}
                result={formatNumber(res.Psi)}
            />
            <ResLine
                imgUrl={
                    pressure * auxiliary.eta <= auxiliary.phiT * auxiliary.loadTube
                        ? "/image/moment/formulas/dev-cooling/OmegaP1.svg"
                        : "/image/moment/formulas/dev-cooling/OmegaP2.svg"
                }
                formula={{
                    designation: <>&Omega;</>,
                    value: formulas?.OmegaP,
                }}
                result={formatNumber(res.OmegaP)}
            />

            <p className={classes.title}>Условия применения формул</p>
            <ConditionLine
                imgText={<>&Omega; &le; 1</>}
                result={
                    <>
                        {formatNumber(res.condition.x)}&nbsp;
                        {res.condition.x <= res.condition.y ? <> &le; </> : " > "}
                        &nbsp;
                        {formatNumber(res.condition.y)}
                    </>
                }
            />
            <p className={classes.title}>
                <b>
                    Условия применения формул {!(res.condition.x <= res.condition.y) && "не "}
                    выполнены
                </b>
            </p>

            <ResLine
                title='Толщина трубной решетки в месте уплотнения'
                imgUrl='/image/moment/formulas/dev-cooling/placeThick.svg'
                formula={{
                    designation: (
                        <>
                            s<sub>2</sub>
                        </>
                    ),
                    value: formulas?.placeThick,
                }}
                result={formatNumber(res.placeThick)}
                units='мм'
            />
            <ResLine
                title='Толщина трубной решетки вне зоны уплотнения'
                imgUrl='/image/moment/formulas/dev-cooling/outZoneThick.svg'
                formula={{
                    designation: (
                        <>
                            s<sub>3</sub>
                        </>
                    ),
                    value: formulas?.outZoneThick,
                }}
                result={formatNumber(res.outZoneThick)}
                units='мм'
            />
            <p className={classes.text}>где:</p>
            <ResLine
                title='Расчетное усилие'
                imgUrl='/image/moment/formulas/dev-cooling/sheetEffort.svg'
                formula={{
                    designation: (
                        <>
                            F<sub>1</sub>
                        </>
                    ),
                    value: formulas?.effort,
                }}
                result={formatNumber(res.effort)}
                units='H'
            />

            <p className={classes.title}>Условие прочности крепления труб в решетке</p>
            <ConditionLine
                formula={{ value: formulas?.strength }}
                imgUrl={"/image/moment/formulas/dev-cooling/strength.svg"}
                result={
                    <>
                        {formatNumber(res.strength.x)}&nbsp;
                        {res.strength.x >= res.strength.y ? <>&ge; </> : " < "}
                        &nbsp;
                        {formatNumber(res.strength.y)}
                    </>
                }
            />
            <ResLine
                title='где коэффициенты:'
                imgUrl='/image/moment/formulas/dev-cooling/omega.svg'
                formula={{
                    designation: <>&omega;</>,
                    value: formulas?.omega,
                }}
                result={formatNumber(res.omega)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/dev-cooling/zF.svg'
                formula={{
                    designation: (
                        <>
                            z<sub>F</sub>
                        </>
                    ),
                    value: formulas?.zF,
                }}
                result={formatNumber(res.zF)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/dev-cooling/zM.svg'
                formula={{
                    designation: (
                        <>
                            z<sub>M</sub>
                        </>
                    ),
                    value: formulas?.zM,
                }}
                result={formatNumber(res.zM)}
            />
            <p className={classes.title}>
                <b>
                    Условия прочности крепления труб {!(res.strength.x >= res.strength.y) && "не "}
                    выполнены
                </b>
            </p>
        </Container>
    )
}
