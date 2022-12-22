import React, { FC } from "react"
import { IConditionsForStrength, IFlangeResult } from "../../../../../types/res_flange"
import { Container } from "../../../../../components/Container/Container"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: IConditionsForStrength[]
    flanges: IFlangeResult[]
}

export const SealingConclusions: FC<Props> = ({ data, flanges }) => {
    const renderConclusions = (d: IConditionsForStrength, index: number) => {
        let cons = `полностью герметично так как, ϴ=${formatNumber(d.condTeta.x)} ≤ ${formatNumber(
            d.condTeta.y
        )}, т.е. выполняется условие герметичности фланцевого соединения`
        if (flanges[index].type === "free") {
            if (!(d.condTeta.x <= d.condTeta.y && d.condTetaK.x <= d.condTetaK.y)) {
                let thetaK = ` и ϴₖ=${formatNumber(d.condTetaK.x)} ${
                    d.condTetaK.x <= d.condTetaK.y ? "≤" : ">"
                } ${formatNumber(d.condTetaK.y)}`

                cons = `не герметично так как, ϴ=${formatNumber(d.condTeta.x)} ${
                    d.condTeta.x <= d.condTeta.y ? "≤" : ">"
                } ${formatNumber(
                    d.condTeta.y
                )}${thetaK}, т.е. не выполняется условие герметичности фланцевого соединения`
            }
        } else {
            if (!(d.condTeta.x <= d.condTeta.y)) {
                cons = `не герметично так как, ϴ=${formatNumber(d.condTeta.x)} ${
                    d.condTeta.x <= d.condTeta.y ? "≤" : ">"
                } ${formatNumber(
                    d.condTeta.y
                )}, т.е. не выполняется условие герметичности фланцевого соединения`
            }
        }

        return (
            <React.Fragment key={index}>
                <p className={classes.text}>- для {!index ? "первого" : "второго"} фланца</p>
                <p className={classes.text}>
                    Фланцевое соединение <b>{cons}</b>
                </p>
            </React.Fragment>
        )
    }

    return (
        <Container title='Выводы о герметичности фланцевого соединения'>
            {data.map((d, i) => renderConclusions(d, i))}
        </Container>
    )
}
