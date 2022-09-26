import React, { FC } from "react"
import { IFlangeResult, IStrength, IStrengthResult } from "../../../../../types/res_flange"
import { Container } from "../../../../../components/Container/Container"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: IStrength
    flange: IFlangeResult
}

export const SealingConclusions: FC<Props> = ({ data, flange }) => {
    const renderConclusions = (d: IStrengthResult, vTeta: boolean, vTetaK: boolean) => {
        let cons = `полностью герметично так как, ϴ=${formatNumber(d.teta)} ≤ ${formatNumber(
            d.dTeta
        )}, т.е. выполняется условие герметичности фланцевого соединения`
        if (flange.type === "free") {
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
                <p className={classes.text}>- для фланца</p>
                <p className={classes.text}>
                    Фланцевое соединение <b>{cons}</b>
                </p>
            </>
        )
    }

    return (
        <Container title='Выводы о герметичности фланцевого соединения'>
            {renderConclusions(data.strength[1], data.vTeta1, data.vTetaK1)}
        </Container>
    )
}
