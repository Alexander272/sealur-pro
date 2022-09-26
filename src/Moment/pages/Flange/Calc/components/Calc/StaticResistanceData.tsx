import React, { FC } from "react"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import {
    IStrengthResult,
    IStrengthFormulas_St,
    IFlangeResult,
} from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: IStrengthResult
    flange: IFlangeResult
    title: string
    formulas: IStrengthFormulas_St | undefined
}

export const StaticResistanceData: FC<Props> = ({ data, flange, title, formulas }) => {
    return (
        <>
            <p className={classes.text}>{title}</p>
            <ResLine
                title='Коэффициент учитывающий изгиб тарелки фланца между болтами шпильками'
                imgUrl='/image/moment/formulas/flange/Cf.svg'
                formula={{
                    designation: (
                        <>
                            C<sub>F</sub>
                        </>
                    ),
                    value: formulas?.Cf,
                }}
                result={formatNumber(data.Cf)}
            />
            {flange.type === "welded" ? (
                <ResLine
                    title='Приведенный диаметр приварного встык фланца с конической или	прямой втулкой'
                    imgUrl='/image/moment/formulas/flange/D.svg'
                    result={formatNumber(data.Dzv)}
                    units='мм'
                />
            ) : (
                <ResLine
                    title='Приведенный диаметр плоского фланца'
                    imgUrl='/image/moment/formulas/flange/D_0.svg'
                    result={formatNumber(data.Dzv)}
                    units='мм'
                />
            )}

            <p className={classes.text}>
                Расчетный изгибающий момент действующий на фланец при затяжке
            </p>
            <ResLine
                title='- для приварного встык фланца плоского и бурта свободного фланца'
                imgUrl='/image/moment/formulas/flange/mm.svg'
                result={formatNumber(data.MM)}
                formula={{
                    designation: (
                        <>
                            M<sup>M</sup>
                        </>
                    ),
                    value: formulas?.MM,
                }}
                units='H*мм'
            />
            {flange.type === "free" && (
                <ResLine
                    title='- для кольца свободного фланца'
                    imgUrl='/image/moment/formulas/flange/mmk.svg'
                    result={formatNumber(data.MMk)}
                    formula={{
                        designation: (
                            <>
                                M<sub>к</sub>
                                <sup>M</sup>
                            </>
                        ),
                        value: formulas?.MMk,
                    }}
                    units='H*мм'
                />
            )}

            <p className={classes.text}>
                Расчетный изгибающий момент действующий на фланец в рабочих условиях
            </p>
            <ResLine
                title='- для приварного встык фланца плоского и бурта свободного фланца'
                imgUrl='/image/moment/formulas/flange/Mp.svg'
                result={formatNumber(data.Mp)}
                formula={{
                    designation: (
                        <>
                            M<sup>p</sup>
                        </>
                    ),
                    value: formulas?.Mp,
                }}
                units='H*мм'
            />
            {flange.type === "free" && (
                <ResLine
                    title='- для кольца свободного фланца'
                    imgUrl='/image/moment/formulas/flange/Mpk.svg'
                    result={formatNumber(data.Mpk)}
                    formula={{
                        designation: (
                            <>
                                M<sub>к</sub>
                                <sup>p</sup>
                            </>
                        ),
                        value: formulas?.Mpk,
                    }}
                    units='H*мм'
                />
            )}

            <p className={classes.text}>
                Меридиональное изгибное напряжение во втулке приварного встык фланца обечайке трубе
                плоского фланца или обечайке бурта свободного фланца
            </p>
            {!data.isSameSigma ? (
                <>
                    <ResLine
                        title='- для приварных встык фланцев с конической втулкой в сечении S&#8321;'
                        imgUrl='/image/moment/formulas/flange/sigmaM1.svg'
                        result={formatNumber(data.sigmaM1)}
                        formula={{
                            designation: (
                                <>
                                    &sigma;<sub>1</sub>
                                    <sup>M</sup>
                                </>
                            ),
                            value: formulas?.sigmaM1,
                        }}
                        units='МПа'
                    />
                    <ResLine
                        title='- для приварных встык фланцев с конической втулкой в сечении S&#8320;'
                        imgUrl='/image/moment/formulas/flange/sigmaM0.svg'
                        result={formatNumber(data.sigmaM0)}
                        formula={{
                            designation: (
                                <>
                                    &sigma;<sub>0</sub>
                                    <sup>M</sup>
                                </>
                            ),
                            value: formulas?.sigmaM0,
                        }}
                        units='МПа'
                    />
                </>
            ) : (
                <ResLine
                    title='- для приварных встык фланцев с прямой втулкой плоских фланцев и свободных фланцев'
                    imgUrl='/image/moment/formulas/flange/sigmaM0M1.svg'
                    result={formatNumber(data.sigmaM0)}
                    formula={{
                        designation: (
                            <>
                                &sigma;<sub>0</sub>
                                <sup>M</sup>
                            </>
                        ),
                        value: formulas?.sigmaM0,
                    }}
                    units='МПа'
                />
            )}

            <ResLine
                title='Радиальное напряжение в тарелке приварного встык фланца плоского фланца и бурте свободного фланца в условиях затяжки'
                imgUrl='/image/moment/formulas/flange/sigmaMR.svg'
                result={formatNumber(data.sigmaR)}
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>R</sub>
                            <sup>M</sup>
                        </>
                    ),
                    value: formulas?.sigmaR,
                }}
                units='МПа'
            />
            <ResLine
                title='Окружное напряжение в тарелке приварного встык фланца плоского фланца и бурте свободного фланца в условиях затяжки'
                imgUrl='/image/moment/formulas/flange/sigmaMT.svg'
                result={formatNumber(data.sigmaT)}
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>T</sub>
                            <sup>M</sup>
                        </>
                    ),
                    value: formulas?.sigmaT,
                }}
                units='МПа'
            />
            {flange.type === "free" && (
                <ResLine
                    title='Окружное напряжение в кольце свободного фланца в условиях затяжки'
                    imgUrl='/image/moment/formulas/flange/sigmaMK.svg'
                    result={formatNumber(data.sigmaK)}
                    formula={{
                        designation: (
                            <>
                                &sigma;<sub>к</sub>
                                <sup>M</sup>
                            </>
                        ),
                        value: formulas?.sigmaK,
                    }}
                    units='H*мм'
                />
            )}

            <p className={classes.text}>
                Меридиональные изгибные напряжения во втулке приварного встык фланца обечайке трубе
                плоского фланца или обечайке трубе бурта свободного фланца в рабочих условиях
            </p>
            {!data.isSameSigma ? (
                <>
                    <ResLine
                        title='- для приварных встык фланцев с конической втулкой в сечении S&#8321;'
                        imgUrl='/image/moment/formulas/flange/sigmaP1.svg'
                        result={formatNumber(data.sigmaP1)}
                        formula={{
                            designation: (
                                <>
                                    &sigma;<sub>1</sub>
                                    <sup>p</sup>
                                </>
                            ),
                            value: formulas?.sigmaP1,
                        }}
                        units='МПа'
                    />
                    <ResLine
                        title='- для приварных встык фланцев с конической втулкой в сечении S&#8320;'
                        imgUrl='/image/moment/formulas/flange/sigmaP0.svg'
                        result={formatNumber(data.sigmaP0)}
                        formula={{
                            designation: (
                                <>
                                    &sigma;<sub>0</sub>
                                    <sup>p</sup>
                                </>
                            ),
                            value: formulas?.sigmaP0,
                        }}
                        units='МПа'
                    />
                </>
            ) : (
                <ResLine
                    title='- для приварных встык фланцев с прямой втулкой плоских фланцев и свободных фланцев'
                    imgUrl='/image/moment/formulas/flange/sigmaP0P1.svg'
                    result={formatNumber(data.sigmaP0)}
                    formula={{
                        designation: (
                            <>
                                &sigma;<sub>0</sub>
                                <sup>p</sup>
                            </>
                        ),
                        value: formulas?.sigmaP0,
                    }}
                    units='МПа'
                />
            )}

            <p className={classes.text}>
                Меридиональные мембранные напряжения во втулке приварного встык фланца обечайке
                трубе плоского фланца или обечайке трубе бурта свободного фланца в рабочих условиях
            </p>
            {!data.isSameSigma && (
                <ResLine
                    title='- для приварных встык фланцев с конической втулкой в сечении S&#8321;'
                    imgUrl='/image/moment/formulas/flange/sigma1mmp.svg'
                    result={formatNumber(data.sigmaMp)}
                    formula={{
                        designation: (
                            <>
                                &sigma;<sub>1мм</sub>
                                <sup>p</sup>
                            </>
                        ),
                        value: formulas?.sigmaMp,
                    }}
                    units='МПа'
                />
            )}
            <ResLine
                title='- для приварных встык фланцев с конической втулкой в сечении S&#8320; приварных фланцев с прямой втулкой плоских фланцев и свободных фланцев'
                imgUrl='/image/moment/formulas/flange/sigma0mmp.svg'
                result={formatNumber(data.sigmaMp0)}
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>1мм</sub>
                            <sup>p</sup>
                        </>
                    ),
                    value: formulas?.sigmaMp0,
                }}
                units='МПа'
            />

            <ResLine
                title='Окружные мембранные напряжения от действия давления во втулке приварного встык
                фланца обечайке трубе плоского фланца или обечайке трубе бурта свободного фланца в
                сечениии S&#8320;'
                imgUrl='/image/moment/formulas/flange/sigma0mop.svg'
                result={formatNumber(data.sigmaMop)}
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>0мо</sub>
                            <sup>p</sup>
                        </>
                    ),
                    value: formulas?.sigmaMop,
                }}
                units='МПа'
            />

            <p className={classes.text}>
                Напряжения в тарелке приварного встык фланца плоского фланца и бурте свободного
                фланца в рабочих условиях
            </p>
            <ResLine
                title='- радиальные напряжения'
                imgUrl='/image/moment/formulas/flange/sigmaPR.svg'
                result={formatNumber(data.sigmaRp)}
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>R</sub>
                            <sup>p</sup>
                        </>
                    ),
                    value: formulas?.sigmaRp,
                }}
                units='МПа'
            />
            <ResLine
                title='- окружное напряжения'
                imgUrl='/image/moment/formulas/flange/sigmaPT.svg'
                result={formatNumber(data.sigmaTp)}
                formula={{
                    designation: (
                        <>
                            &sigma;<sub>T</sub>
                            <sup>p</sup>
                        </>
                    ),
                    value: formulas?.sigmaTp,
                }}
                units='МПа'
            />

            {flange.type === "free" && (
                <ResLine
                    title='Окружное напряжение в кольце свободного фланца в рабочих условиях'
                    imgUrl='/image/moment/formulas/flange/sigmaPK.svg'
                    result={formatNumber(data.sigmaKp)}
                    formula={{
                        designation: (
                            <>
                                &sigma;<sub>к</sub>
                                <sup>p</sup>
                            </>
                        ),
                        value: formulas?.sigmaKp,
                    }}
                    units='МПа'
                />
            )}
        </>
    )
}
