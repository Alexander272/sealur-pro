import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ConditionLine } from "../../../../../components/ConditionLine/ConditionLine"
import { ICalculated, IFormulas } from "../../../../../types/res_devCooling"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    res: ICalculated
    formulas: IFormulas
}

export const Condition: FC<Props> = ({ res, formulas }) => {
    return (
        <Container title='Условия применения формул'>
            <ConditionLine
                formula={{ value: formulas.condition1 }}
                imgUrl='/image/moment/formulas/dev-cooling/cond1.svg'
                result={
                    <>
                        {formatNumber(res.condition1.x)}&nbsp;
                        {res.condition1.x <= res.condition1.y ? <> &le; </> : " > "}
                        &nbsp;
                        {formatNumber(res.condition1.y)}
                    </>
                }
            />
            <ConditionLine
                formula={{ value: formulas.condition2 }}
                imgUrl='/image/moment/formulas/dev-cooling/cond2.svg'
                result={
                    <>
                        {formatNumber(res.condition2.x)}&nbsp;
                        {res.condition2.x <= res.condition2.y ? <> &le; </> : " > "}
                        &nbsp;
                        {formatNumber(res.condition2.y)}
                    </>
                }
            />

            <p className={classes.title}>
                Условие применения формул {!res.isConditionsMet && "не "}выполнены
            </p>
        </Container>
    )
}
