import React, { useEffect, useState } from "react"
import useSWR from "swr"
import { IAVOData, IFinningFactor, INameGasket, INumberOfMoves } from "../../../../types/device"
import ReadService from "../../../../service/read"
import ServerError from "../../../../../Error/ServerError"
import { Select } from "../../../../../components/UI/Select/Select"
import classes from "../avo.module.scss"
import { TableContainer } from "./Table"

export default function NameGasket() {
    const [devId, setDevId] = useState("")
    const [presId, setPresId] = useState("")
    const [countId, setCountId] = useState("")
    const [finId, setFinId] = useState("")
    const [numId, setNumId] = useState("")
    const [fin, setFin] = useState<IFinningFactor[]>([])
    const [num, setNum] = useState<INumberOfMoves[]>([])

    const { data: avo, error: errAvo } = useSWR<{ data: IAVOData }>(
        "/sealur-moment/data/avo",
        ReadService.getData
    )
    const { data: res, error: errGas } = useSWR<{ data: INameGasket[] }>(
        devId && presId && numId
            ? [
                  "/sealur-moment/name-gasket/full",
                  [
                      { name: "finId", value: finId },
                      { name: "presId", value: presId },
                      { name: "numId", value: numId },
                  ],
              ]
            : null,
        ReadService.getData
    )

    useEffect(() => {
        if (avo) {
            if (!devId) setDevId(avo.data.devices[0].id)
            if (!presId) setPresId(avo.data.pressure[0].id)
            if (!countId) setCountId(avo.data.tubeCount[0].id)
            if (!finId) {
                setFinId(avo.data.finningFactor[0].id)
                setFin(
                    avo?.data.finningFactor.filter(f => f.devId === avo.data.devices[0].id) || []
                )
            }
            if (!numId) {
                setNumId(avo.data.numberOfMoves[0].id)
                setNum(
                    avo?.data.numberOfMoves.filter(
                        n =>
                            n.devId === avo.data.devices[0].id &&
                            n.countId === avo.data.tubeCount[0].id
                    ) || []
                )
            }
        }
    }, [devId, presId, countId, finId, numId, avo])

    const changeDevIdHandler = (id: string) => {
        setDevId(id)
        const fin = avo?.data.finningFactor.filter(f => f.devId === id) || []
        const num =
            avo?.data.numberOfMoves.filter(n => n.devId === id && n.countId === countId) || []
        setFin(fin)
        setNum(num)
        console.log(fin)

        setFinId(fin[0].id)
        setNumId(num[0].id)
    }
    const changeCountIdHandler = (id: string) => {
        setCountId(id)
        const num = avo?.data.numberOfMoves.filter(n => n.devId === devId && n.countId === id) || []
        setNum(num)
        setNumId(num[0].id)
    }
    const changePresIdHandler = (id: string) => setPresId(id)
    const changeFinIdHandler = (id: string) => setFinId(id)
    const changeNumIdHandler = (id: string) => setNumId(id)

    if (errAvo || errGas) return <ServerError />

    return (
        <div className={classes.content}>
            <p className={classes["content-title"]}>Тип прокладки</p>
            <div className={classes["content-filter"]}>
                <div className={classes.row}>
                    <div>
                        <p>Модификация аппарата</p>
                        <Select value={devId} onChange={changeDevIdHandler}>
                            {avo?.data.devices.map(d => (
                                <Select.Option key={d.id} value={d.id}>
                                    {d.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <p>Число рядов труб в секции</p>
                        <Select value={countId} onChange={changeCountIdHandler}>
                            {avo?.data.tubeCount.map(c => (
                                <Select.Option key={c.id} value={c.id}>
                                    {c.value}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <div className={classes.row}>
                    <div>
                        <p>Условное давление</p>
                        <Select value={presId} onChange={changePresIdHandler}>
                            {avo?.data.pressure.map(p => (
                                <Select.Option key={p.id} value={p.id}>
                                    {p.value}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <p>Коэффициент оребрения</p>
                        <Select value={finId} onChange={changeFinIdHandler}>
                            {fin.map(f => (
                                <Select.Option key={f.id} value={f.id}>
                                    {f.value}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                </div>
                <p>Число ходов по трубному пространству</p>
                <Select value={numId} onChange={changeNumIdHandler}>
                    {num.map(n => (
                        <Select.Option key={n.id} value={n.id}>
                            {n.value}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <TableContainer data={res?.data || []} finId={finId} presId={presId} numId={numId} />
        </div>
    )
}
