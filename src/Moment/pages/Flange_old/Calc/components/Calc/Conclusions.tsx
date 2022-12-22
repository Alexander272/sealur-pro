import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { ICalculate, IGasketResult } from "../../../../../types/res_flange_old"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: ICalculate
    gasket: IGasketResult
    temp: number
    pathBasis: "basis" | "strength"
    pathQ: "q" | "fQ" | "sQ"
}

export const Conclusions: FC<Props> = ({ data, gasket, temp, pathBasis, pathQ }) => {
    return (
        <Container title='Выводы о прочности фланцевого соединения'>
            <p className={classes.text}>
                - при 20 &#8451;, т.е. в условиях монтажа, фланцевое соединение{" "}
                <b>
                    {data[pathBasis as "basis"]["vSigmaB1"]
                        ? "выдерживает нагрузки"
                        : "не выдерживает нагрузки"}
                </b>
            </p>
            <p className={classes.text}>
                - при рабочей температуре {formatNumber(temp)} &#8451;, т.е. в условиях
                эксплуатации, фланцевое соединение{" "}
                <b>
                    {data[pathBasis as "basis"]["vSigmaB2"]
                        ? "выдерживает нагрузки"
                        : "не выдерживает нагрузки"}
                </b>
            </p>
            {gasket.type === "Мягкая" && (
                <p className={classes.text}>
                    - условие прочности прокладки{" "}
                    <b>
                        {data[pathBasis as "basis"][pathQ as "q"] <= gasket.permissiblePres
                            ? "выполняется"
                            : "не выполняется"}
                    </b>
                </p>
            )}
        </Container>
    )
}
