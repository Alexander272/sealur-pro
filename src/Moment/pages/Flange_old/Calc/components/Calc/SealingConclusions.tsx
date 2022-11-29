import React, { FC } from "react"
import { IFlangeResult, IStrength, IStrengthResult } from "../../../../../types/res_flange_old"
import { Container } from "../../../../../components/Container/Container"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: IStrength
    flanges: IFlangeResult[]
}

export const SealingConclusions: FC<Props> = ({ data, flanges }) => {
    const renderConclusions = (
        d: IStrengthResult,
        index: 0 | 1,
        vTeta: boolean,
        vTetaK: boolean
    ) => {
        let cons = `полностью герметично так как, ϴ=${formatNumber(d.teta)} ≤ ${formatNumber(
            d.dTeta
        )}, т.е. выполняется условие герметичности фланцевого соединения`
        if (flanges[index].type === "free") {
            if (!(vTeta && vTetaK)) {
                let thetaK = ` и ϴₖ=${formatNumber(d.tetaK)} ${vTetaK ? "≤" : ">"} ${formatNumber(
                    d.dTetaK
                )}`

                cons = `не герметично так как, ϴ=${formatNumber(d.teta)} ${
                    vTeta ? "≤" : ">"
                } ${formatNumber(
                    d.dTeta
                )}${thetaK}, т.е. не выполняется условие герметичности фланцевого соединения`
            }
        } else {
            if (!vTeta) {
                cons = `не герметично так как, ϴ=${formatNumber(d.teta)} ${
                    vTeta ? "≤" : ">"
                } ${formatNumber(
                    d.dTeta
                )}, т.е. не выполняется условие герметичности фланцевого соединения`
            }
        }

        return (
            <>
                <p className={classes.text}>- для {!index ? "первого" : "второго"} фланца</p>
                <p className={classes.text}>
                    Фланцевое соединение <b>{cons}</b>
                </p>
            </>
        )
    }

    return (
        <Container title='Выводы о герметичности фланцевого соединения'>
            {data.strength.length > 2 ? (
                <>
                    {renderConclusions(data.strength[2], 0, data.vTeta1, data.vTetaK1)}
                    {renderConclusions(data.strength[3], 1, data.vTeta2, data.vTetaK2)}
                </>
            ) : (
                renderConclusions(data.strength[1], 0, data.vTeta1, data.vTetaK1)
            )}
        </Container>
    )
}
