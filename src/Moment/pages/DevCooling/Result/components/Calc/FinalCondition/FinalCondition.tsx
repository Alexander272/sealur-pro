import React, { FC } from "react"
import { Container } from "../../../../../../components/Container/Container"
import { IResDevCooling } from "../../../../../../types/res_devCooling"
import { formatNumber } from "../../../../../../utils/format"
import classes from "./result.module.scss"

type Props = {
    res: IResDevCooling
}

export const FinalCondition: FC<Props> = ({ res }) => {
    const condition1 = res.calc.tubeSheet.zoneThick <= res.tubeSheet.zoneThick
    const condition2 = res.calc.tubeSheet.placeThick <= res.tubeSheet.placeThick
    const condition3 = res.calc.tubeSheet.outZoneThick <= res.tubeSheet.outZoneThick
    const condition4 = res.calc.cap.bottomThick <= res.cap.bottomThick
    const condition5 =
        res.data.cameraDiagram === "schema4" ? true : res.calc.cap.wallThick <= res.cap.wallThick
    const condition6 = res.calc.cap.flangeThick <= res.cap.flangeThick
    const condition7 = res.calc.cap.sideWallThick <= res.cap.sideWallThick

    const finalCondition =
        condition1 &&
        condition2 &&
        condition3 &&
        condition4 &&
        condition5 &&
        condition6 &&
        condition7

    return (
        <>
            <Container title='Результаты расчета'>
                <div className={classes.line}>
                    <p className={classes.condition}>
                        s<sub>1min</sub>&nbsp;&le;&nbsp;s<sub>1</sub>
                    </p>
                    <p className={[classes.condition, !condition1 ? classes.warn : null].join(" ")}>
                        {formatNumber(res.calc.tubeSheet.zoneThick)}&nbsp;
                        {condition1 ? <> &le; </> : ">"}&nbsp;
                        {formatNumber(res.tubeSheet.zoneThick)}
                    </p>
                </div>
                <div className={classes.line}>
                    <p className={classes.condition}>
                        s<sub>2min</sub>&nbsp;&le;&nbsp;s<sub>2</sub>
                    </p>
                    <p className={[classes.condition, !condition2 ? classes.warn : null].join(" ")}>
                        {formatNumber(res.calc.tubeSheet.placeThick)}&nbsp;
                        {condition2 ? <> &le; </> : ">"}&nbsp;
                        {formatNumber(res.tubeSheet.placeThick)}
                    </p>
                </div>
                <div className={classes.line}>
                    <p className={classes.condition}>
                        s<sub>3min</sub>&nbsp;&le;&nbsp;s<sub>3</sub>
                    </p>
                    <p className={[classes.condition, !condition3 ? classes.warn : null].join(" ")}>
                        {formatNumber(res.calc.tubeSheet.outZoneThick)}&nbsp;
                        {condition3 ? <> &le; </> : ">"}&nbsp;
                        {formatNumber(res.tubeSheet.outZoneThick)}
                    </p>
                </div>
                {res.data.cameraDiagram !== "schema4" && (
                    <div className={classes.line}>
                        <p className={classes.condition}>
                            s<sub>4min</sub>&nbsp;&le;&nbsp;s<sub>4</sub>
                        </p>
                        <p
                            className={[classes.condition, !condition4 ? classes.warn : null].join(
                                " "
                            )}
                        >
                            {formatNumber(res.calc.cap.bottomThick)}&nbsp;
                            {condition4 ? <> &le; </> : ">"}&nbsp;
                            {formatNumber(res.cap.bottomThick)}
                        </p>
                    </div>
                )}
                <div className={classes.line}>
                    <p className={classes.condition}>
                        s<sub>5min</sub>&nbsp;&le;&nbsp;s<sub>5</sub>
                    </p>
                    <p className={[classes.condition, !condition5 ? classes.warn : null].join(" ")}>
                        {formatNumber(res.calc.cap.wallThick)}&nbsp;
                        {condition5 ? <> &le; </> : ">"}&nbsp;
                        {formatNumber(res.cap.wallThick)}
                    </p>
                </div>
                <div className={classes.line}>
                    <p className={classes.condition}>
                        s<sub>6min</sub>&nbsp;&le;&nbsp;s<sub>6</sub>
                    </p>
                    <p className={[classes.condition, !condition6 ? classes.warn : null].join(" ")}>
                        {formatNumber(res.calc.cap.flangeThick)}&nbsp;
                        {condition6 ? <> &le; </> : ">"}&nbsp;
                        {formatNumber(res.cap.flangeThick)}
                    </p>
                </div>
                <div className={classes.line}>
                    <p className={classes.condition}>
                        s<sub>7min</sub>&nbsp;&le;&nbsp;s<sub>7</sub>
                    </p>
                    <p className={[classes.condition, !condition7 ? classes.warn : null].join(" ")}>
                        {formatNumber(res.calc.cap.sideWallThick)}&nbsp;
                        {condition7 ? <> &le; </> : ">"}&nbsp;
                        {formatNumber(res.cap.sideWallThick)}
                    </p>
                </div>

                <p className={classes.title}>Условие {!finalCondition && "не "}выполнено</p>
            </Container>
            <Container title='Анализ результатов расчета'>
                <p>
                    Условия применения ГОСТ 25822-83 Сосуды и аппараты. АППАРАТЫ ВОЗДУШНОГО
                    ОХЛАЖДЕНИЯ. Нормы и методы расчета на прочность выполнены.
                </p>
                <p>
                    Условия прочности болтов/шпилек{" "}
                    {!(
                        res.calc.bolt.testCond.x <= res.calc.bolt.testCond.y &&
                        res.calc.bolt.workCond.x <= res.calc.bolt.workCond.y
                    ) && "не "}
                    выполнено.
                </p>
                <p>
                    Условие прочности прокладки{" "}
                    {!(res.calc.gasketCond.x <= res.calc.gasketCond.y) && "не "} выполняется
                </p>
                <p>
                    Коэффициент несущей способности трубного пучка &Omega;
                    {res.calc.tubeSheet.condition.x <= res.calc.tubeSheet.condition.y ? (
                        <> &le;1. Условия применения формул выполнены.</>
                    ) : (
                        <>
                            &gt;1 следует увеличивать толщину труб для выполнения условия
                            &Omega;&le;1.
                        </>
                    )}
                </p>
                <p>
                    Условия прочности крепления труб{" "}
                    {!(res.calc.tubeSheet.strength.x >= res.calc.tubeSheet.strength.y) && "не "}
                    выполнены
                </p>
                <p>
                    {finalCondition
                        ? "Настоящий расчет подтверждает правильность выбранных толщин для трубной решетки и крышки."
                        : "Выбранные толщины для трубной решетки и крышки не соответствуют условиям прочности."}
                </p>
            </Container>
        </>
    )
}
