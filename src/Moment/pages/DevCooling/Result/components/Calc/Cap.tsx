import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { CameraDiagram } from "../../../../../types/devCooling"
import { ICalcCap, ICapFormulas } from "../../../../../types/res_devCooling"
import { formatNumber } from "../../../../../utils/format"

type Props = {
    cameraDiagram: CameraDiagram
    res: ICalcCap
    formulas?: ICapFormulas
}

export const Cap: FC<Props> = ({ cameraDiagram, res, formulas }) => {
    return (
        <Container>
            <ResLine
                title='Толщина донышка крышки'
                imgUrl={
                    cameraDiagram === "schema5"
                        ? "/image/moment/formulas/dev-cooling/bottomThick2.svg"
                        : "/image/moment/formulas/dev-cooling/bottomThick1.svg"
                }
                formula={{
                    designation: (
                        <>
                            s<sub>4</sub>
                        </>
                    ),
                    value: formulas?.bottomThick,
                }}
                result={formatNumber(res.bottomThick)}
                units='мм'
            />
            <ResLine
                title='где коэффициенты:'
                imgUrl='/image/moment/formulas/dev-cooling/LambdaK.svg'
                formula={{
                    designation: (
                        <>
                            &Lambda;<sub>k</sub>
                        </>
                    ),
                    value: formulas?.Lambda,
                }}
                result={formatNumber(res.Lambda)}
            />
            {cameraDiagram !== "schema5" ? (
                <>
                    <ResLine
                        imgUrl='/image/moment/formulas/dev-cooling/psiK.svg'
                        formula={{
                            designation: (
                                <>
                                    &psi;<sub>k</sub>
                                </>
                            ),
                            value: formulas?.Psi,
                        }}
                        result={formatNumber(res.Psi)}
                    />
                    <ResLine
                        imgUrl='/image/moment/formulas/dev-cooling/f1.svg'
                        formula={{
                            designation: (
                                <>
                                    f<sub>1</sub>
                                </>
                            ),
                            value: formulas?.f1,
                        }}
                        result={formatNumber(res.f1)}
                    />
                    <ResLine
                        imgUrl='/image/moment/formulas/dev-cooling/f2.svg'
                        formula={{
                            designation: (
                                <>
                                    f<sub>2</sub>
                                </>
                            ),
                            value: formulas?.f2,
                        }}
                        result={formatNumber(res.f2)}
                    />
                    <ResLine
                        imgUrl={
                            cameraDiagram === "schema4"
                                ? "/image/moment/formulas/dev-cooling/chiK2.svg"
                                : "/image/moment/formulas/dev-cooling/chiK1.svg"
                        }
                        formula={{
                            designation: (
                                <>
                                    &chi;<sub>k</sub>
                                </>
                            ),
                            value: formulas?.chiK,
                        }}
                        result={formatNumber(res.chiK)}
                    />
                </>
            ) : (
                <ResLine
                    title='где коэффициенты:'
                    imgUrl='/image/moment/formulas/dev-cooling/chiC.svg'
                    formula={{
                        designation: (
                            <>
                                &chi;<sub>c</sub>
                            </>
                        ),
                        value: formulas?.chi,
                    }}
                    result={formatNumber(res.chi)}
                />
            )}

            {cameraDiagram !== "schema4" && (
                <>
                    <ResLine
                        title='Толщина стенки крышки в месте присоединения к фланцу'
                        imgUrl='/image/moment/formulas/dev-cooling/wallThick.svg'
                        formula={{
                            designation: (
                                <>
                                    s<sub>5</sub>
                                </>
                            ),
                            value: formulas?.wallThick,
                        }}
                        result={formatNumber(res.wallThick)}
                        units='мм'
                    />
                    {cameraDiagram !== "schema5" && (
                        <ResLine
                            title='где коэффициенты:'
                            imgUrl='/image/moment/formulas/dev-cooling/chiC.svg'
                            formula={{
                                designation: (
                                    <>
                                        &chi;<sub>c</sub>
                                    </>
                                ),
                                value: formulas?.chi,
                            }}
                            result={formatNumber(res.chi)}
                        />
                    )}
                </>
            )}

            <ResLine
                title='Толщина фланца крышки'
                imgUrl='/image/moment/formulas/dev-cooling/flangeThick.svg'
                formula={{
                    designation: (
                        <>
                            s<sub>6</sub>
                        </>
                    ),
                    value: formulas?.flangeThick,
                }}
                result={formatNumber(res.flangeThick)}
                units='мм'
            />
            <ResLine
                title='Толщина боковой стенки крышки'
                imgUrl={
                    cameraDiagram === "schema5"
                        ? "/image/moment/formulas/dev-cooling/sideWallThick2.svg"
                        : "/image/moment/formulas/dev-cooling/sideWallThick1.svg"
                }
                formula={{
                    designation: (
                        <>
                            s<sub>6</sub>
                        </>
                    ),
                    value: formulas?.sideWallThick,
                }}
                result={formatNumber(res.sideWallThick)}
                units='мм'
            />
        </Container>
    )
}
