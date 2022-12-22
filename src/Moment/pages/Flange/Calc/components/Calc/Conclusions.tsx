import React, { FC } from "react"
import { Container } from "../../../../../components/Container/Container"
import { IBoltStrength, IGasketResult } from "../../../../../types/res_flange"
import { formatNumber } from "../../../../../utils/format"
import classes from "../../../../styles/page.module.scss"

type Props = {
    data: IBoltStrength
    gasket: IGasketResult
    temp: number
}

export const Conclusions: FC<Props> = ({ data, gasket, temp }) => {
    return (
        <Container title='Выводы о прочности фланцевого соединения'>
            <p className={classes.text}>
                - при 20 &#8451;, т.е. в условиях монтажа, фланцевое соединение{" "}
                <b>{data.vSigmaB1 ? "выдерживает нагрузки" : "не выдерживает нагрузки"}</b>
            </p>
            <p className={classes.text}>
                - при рабочей температуре {formatNumber(temp)} &#8451;, т.е. в условиях
                эксплуатации, фланцевое соединение{" "}
                <b>{data.vSigmaB2 ? "выдерживает нагрузки" : "не выдерживает нагрузки"}</b>
            </p>
            {gasket.type === "Soft" && (
                <p className={classes.text}>
                    - условие прочности прокладки{" "}
                    <b>{data.q <= gasket.permissiblePres ? "выполняется" : "не выполняется"}</b>
                </p>
            )}
        </Container>
    )
}
