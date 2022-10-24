import React, { FC } from "react"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ICapResult, IStrengthFormulas_Cap } from "../../../../../types/res_cap"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: ICapResult
    formulas: IStrengthFormulas_Cap | undefined
}

export const CapData: FC<Props> = ({ data, formulas }) => {
    if (data.type === "flat")
        return (
            <>
                <p className={classes.text}>- для плоской крышки</p>
                <ResLine
                    title='Угловая податливость плоской крышки'
                    imgUrl='/image/moment/formulas/cap/ykr.svg'
                    formula={{
                        designation: (
                            <>
                                у<sub>кр</sub>
                            </>
                        ),
                        value: formulas?.y,
                    }}
                    result={formatNumber(data.y)}
                    units='1/(H*мм)'
                />
                <ResLine
                    title='где'
                    imgUrl='/image/moment/formulas/cap/x.svg'
                    formula={{
                        designation: (
                            <>
                                X<sub>кр</sub>
                            </>
                        ),
                        value: formulas?.x,
                    }}
                    result={formatNumber(data.x)}
                />
                <ResLine
                    imgUrl='/image/moment/formulas/cap/k.svg'
                    formula={{
                        designation: (
                            <>
                                K<sub>кр</sub>
                            </>
                        ),
                        value: formulas?.k,
                    }}
                    result={formatNumber(data.k)}
                />
            </>
        )

    return (
        <>
            <p className={classes.text}>- для сферической крышки</p>
            <ResLine
                title='Угловая податливость сферической неотбортованной крышки'
                imgUrl='/image/moment/formulas/cap/ykr1.svg'
                formula={{
                    designation: (
                        <>
                            у<sub>кр</sub>
                        </>
                    ),
                    value: formulas?.y,
                }}
                result={formatNumber(data.y)}
                units='1/(H*мм)'
            />
            <ResLine
                title='где'
                imgUrl='/image/moment/formulas/cap/lambda.svg'
                formula={{
                    designation: (
                        <>
                            &lambda;<sub>1</sub>
                        </>
                    ),
                    value: formulas?.lambda,
                }}
                result={formatNumber(data.lambda)}
            />
            <ResLine
                imgUrl='/image/moment/formulas/cap/omega.svg'
                formula={{
                    designation: (
                        <>
                            &omega;<sub>1</sub>
                        </>
                    ),
                    value: formulas?.omega,
                }}
                result={formatNumber(data.omega)}
            />
        </>
    )
}
