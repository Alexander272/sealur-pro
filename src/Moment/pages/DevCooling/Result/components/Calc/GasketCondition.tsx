import React, { FC } from "react"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import { Container } from "../../../../../components/Container/Container"
import { ResLine } from "../../../../../components/ResLine/ResLine"
import { ICalculated, IFormulas } from "../../../../../types/res_devCooling"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    res: ICalculated
    formulas: IFormulas | undefined
}

export const GasketCondition: FC<Props> = ({ res, formulas }) => {
    return (
        <Container>
            <ResLine
                title='Условие прочности прокладки'
                imgUrl='/image/moment/formulas/dev-cooling/q.svg'
                formula={{
                    designation: <>q</>,
                    value: formulas?.gasketCond,
                }}
                result={formatNumber(res.gasketCond.x)}
                units='МПа'
            />

            <ConditionLine
                imgUrl='/image/moment/formulas/dev-cooling/gasketCond.svg'
                result={
                    <>
                        {formatNumber(res.gasketCond.x)}&nbsp;
                        {res.gasketCond.x <= res.gasketCond.y ? <> &le; </> : " > "}
                        &nbsp;
                        {formatNumber(res.gasketCond.y)}
                    </>
                }
            />

            <p className={classes.title}>
                <b>
                    Условие прочности прокладки {!(res.gasketCond.x <= res.gasketCond.y) && "не "}
                    выполняется
                </b>
            </p>
        </Container>
    )
}
