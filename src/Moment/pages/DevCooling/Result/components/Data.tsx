import React, { FC } from "react"
import { Container } from "../../../../components/Container/Container"
import { IDataResult } from "../../../../types/res_devCooling"
import { formatNumber } from "../../../../utils/format"
import { Line } from "../../../Flange_old/Calc/components/Line"
import classes from "../../../styles/page.module.scss"

const cameraDiagram = {
    schema1: "Черт. 1. ГОСТ 25822-83",
    schema2: "Черт. 2. ГОСТ 25822-83",
    schema3: "Черт. 3. ГОСТ 25822-83",
    schema4: "Черт. 4. ГОСТ 25822-83",
    schema5: "Черт. 5. ГОСТ 25822-83",
}
const layout = {
    lSchema1: "Черт. 11. ГОСТ 25822-83",
    lSchema2: "Черт. 12. ГОСТ 25822-83",
}

type Props = {
    data: IDataResult
}

export const Data: FC<Props> = ({ data }) => {
    return (
        <Container title='Исходные данные для расчета'>
            <Line title='Расчетное давление' res={formatNumber(data.pressure || 0)} units='МПа' />
            <Line
                title='Расчетная температура'
                res={formatNumber(data.temp || 0)}
                units='&#8451;'
            />
            <Line title='Способ крепления труб' res={data.method} full />
            <Line title='Тип соединения' res={data.typeBolt} full />
            <Line title='Способ крепления труб в трубной решетке' res={data.mounting} full />
            <Line title='Тип крепления труб в трубной решетке' res={data.typeMounting} full />

            <div>
                <p className={classes.title}>Чертеж камеры аппарата воздушного охлаждения</p>
                <div className={classes["line-image"]}>
                    <img
                        src={`/image/moment/dev-cooling/${data.cameraDiagram}.webp`}
                        alt={`${data.cameraDiagram}`}
                    />
                    <p>{cameraDiagram[data.cameraDiagram]}</p>
                </div>

                <p className={classes.title}>Схема размещения отверстий</p>
                <div className={classes["line-image"]}>
                    <img
                        src={`/image/moment/dev-cooling/${data.layout}.webp`}
                        alt={`${data.layout}`}
                    />
                    <p>{layout[data.layout]}</p>
                </div>
            </div>
        </Container>
    )
}
