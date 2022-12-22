import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ICalcBolts, IGasketResult } from "../../../../../types/res_exRect"
import classes from "../../../../styles/page.module.scss"

type Props = {
    res: ICalcBolts
    gasket: IGasketResult
}

export const Conclusions: FC<Props> = ({ res, gasket }) => {
    return (
        <Container title='Выводы о прочности фланцевого соединения'>
            <p className={classes.text}>
                - при 20 &#8451;, т.е. в условиях монтажа, фланцевое соединение{" "}
                <b>
                    {res.strengthBolt.x <= res.strengthBolt.y
                        ? "выдерживает нагрузки"
                        : "не выдерживает нагрузки"}
                </b>
            </p>
            {gasket.type === "Soft" && (
                <p className={classes.text}>
                    - условие прочности прокладки{" "}
                    <b>
                        {res.strengthGasket.x <= res.strengthGasket.y
                            ? "выполняется"
                            : "не выполняется"}
                    </b>
                </p>
            )}
        </Container>
    )
}
