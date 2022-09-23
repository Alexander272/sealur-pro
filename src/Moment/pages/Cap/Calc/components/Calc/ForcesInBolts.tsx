import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ICalculate, IFormulas } from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import { ResLine } from "../../../../../components/ResLine/ResLine"

//TODO нужно исправить ссылки
export const CapQtLink = {
    "Qt-any": "/image/moment/formulas/Qt.svg",
    "Qt-free": "/image/moment/formulas/Qt-free.svg",
    "Qt-free-any": "/image/moment/formulas/Qt-first.svg",
    "Qt-any-free": "/image/moment/formulas/Qt-second.svg",
    "Qt-free-free": "/image/moment/formulas/Qt-free.svg",
    "Qt-any-embed": "/image/moment/formulas/Qt-embed.svg",
    "Qt-free-embed": "/image/moment/formulas/Qt-free-embed.svg",
    "Qt-free-any-embed": "/image/moment/formulas/Qt-first-embed.svg",
    "Qt-any-free-embed": "/image/moment/formulas/Qt-second-embed.svg",
    "Qt-free-free-embed": "/image/moment/formulas/Qt-free-embed.svg",
    "Qt-washer-any": "/image/moment/formulas/Qt-washer.svg",
    "Qt-washer-free": "/image/moment/formulas/Qt-washer-free.svg",
    "Qt-washer-free-any": "/image/moment/formulas/Qt-washer-first.svg",
    "Qt-washer-any-free": "/image/moment/formulas/Qt-washer-second.svg",
    "Qt-washer-any-any": "/image/moment/formulas/Qt-washer.svg",
    "Qt-washer-free-free": "/image/moment/formulas/Qt-washer-free.svg",
    "Qt-washer-any-embed": "/image/moment/formulas/Qt-washer-embed.svg",
    "Qt-washer-free-embed": "/image/moment/formulas/Qt-washer-free-embed.svg",
    "Qt-washer-free-any-embed": "/image/moment/formulas/Qt-washer-first-embed.svg",
    "Qt-washer-any-free-embed": "/image/moment/formulas/Qt-washer-second-embed.svg",
    "Qt-washer-any-any-embed": "/image/moment/formulas/Qt-washer-embed.svg",
    "Qt-washer-free-free-embed": "/image/moment/formulas/Qt-washer-free-embed.svg",
}

type Props = {
    data: ICalculate
    formulas: IFormulas | undefined
    typeQt: string
    path: "basis" | "strength"
    pb: "Pb" | "sPb"
    pb1: "Pb1" | "sPb1"
    pb2: "Pb2" | "sPb2"
    pbr: "Pbr" | "sPbr"
}

export const ForcesInBolts: FC<Props> = ({ data, formulas, typeQt, path, pb, pb1, pb2, pbr }) => {
    return (
        <Container title='Усилия в болтах (шпильках) фланцевого соединения при затяжке и в рабочих условиях'>
            <ResLine
                title='Суммарная площадь сечения болтов/шпилек по внутреннему диаметру резьбы или нагруженному сечению наименьшего диаметра'
                imgUrl='/image/moment/formulas/a.svg'
                formula={{
                    designation: (
                        <>
                            A<sub>в</sub>
                        </>
                    ),
                    value: formulas?.A,
                }}
                result={formatNumber(data.A)}
                units='мм&#178;'
            />
            <ResLine
                title='Равнодействующая нагрузка от давления'
                imgUrl='/image/moment/formulas/Qd.svg'
                formula={{
                    designation: (
                        <>
                            Q<sub>Д</sub>
                        </>
                    ),
                    value: formulas?.Qd,
                }}
                result={formatNumber(data.Qd)}
                units='H'
            />
            <ResLine
                title='Приведенная нагрузка, вызванная воздействием внешней силы и изгибающего момента'
                imgUrl='/image/moment/formulas/Qfm.svg'
                formula={{
                    designation: (
                        <>
                            Q<sub>FM</sub>
                        </>
                    ),
                    value: formulas?.Qfm,
                }}
                result={formatNumber(data.Qfm)}
                units='H'
            />

            <ResLine
                title='Нагрузка вызванная стесненностью температурных деформаций'
                imgUrl={CapQtLink[typeQt as "Qt-any"]}
                formula={{
                    designation: (
                        <>
                            Q<sub>t</sub>
                        </>
                    ),
                    value: formulas?.Qt,
                }}
                result={formatNumber(data.Qt)}
                units='H'
            />
            <ResLine
                title='Расчетная нагрузка на болты/шпильки фланцевых соединений'
                imgUrl='/image/moment/formulas/Pb.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б</sub>
                            <sup>м</sup>
                        </>
                    ),
                    value: formulas && formulas[`${path as "basis"}`][`${pb as "Pb"}`],
                }}
                result={formatNumber(data[`${path as "basis"}`][`${pb as "Pb"}`])}
                units='H'
            />
            <ResLine
                title='Коэффициент жесткости фланцевого соединения нагруженного внутренним давлением или внешней осевой силой'
                imgUrl='/image/moment/formulas/alpha1.svg'
                formula={{
                    designation: <>&alpha;</>,
                    value: formulas?.alpha,
                }}
                result={formatNumber(data.alpha)}
            />

            <ResLine
                title='Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения в рабочих условиях давления на прокладку достаточного для герметизации фланцевого соединения'
                imgUrl='/image/moment/formulas/Pb1.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б1</sub>
                        </>
                    ),
                    value: formulas && formulas[`${path as "basis"}`][`${pb1 as "Pb"}`],
                }}
                result={formatNumber(data[`${path as "basis"}`][`${pb1 as "Pb"}`])}
                units='H'
            />

            <ResLine
                title='Минимальное начальное натяжение болтов (шпилек)'
                imgUrl='/image/moment/formulas/minB.svg'
                result={formatNumber(data[`${path as "basis"}`]?.minB)}
                units='H'
            />
            <ResLine
                title='Расчетная нагрузка на болты/шпильки при затяжке необходимая для обеспечения обжатия прокладки и минимального начального натяжения болтов/шпилек'
                imgUrl='/image/moment/formulas/Pb2.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б2</sub>
                        </>
                    ),
                    value: formulas && formulas[`${path as "basis"}`][`${pb2 as "Pb"}`],
                }}
                result={formatNumber(data[`${path as "basis"}`][`${pb2 as "Pb"}`])}
                units='H'
            />
            <ResLine
                title='Расчетная нагрузка на болты/шпильки фланцевых соединений в рабочих условиях'
                imgUrl='/image/moment/formulas/Pbr.svg'
                formula={{
                    designation: (
                        <>
                            P<sub>б</sub>
                            <sup>р</sup>
                        </>
                    ),
                    value: formulas && formulas[`${path as "basis"}`][`${pbr as "Pb"}`],
                }}
                result={formatNumber(data[`${path as "basis"}`][`${pbr as "Pb"}`])}
                units='H'
            />
        </Container>
    )
}
