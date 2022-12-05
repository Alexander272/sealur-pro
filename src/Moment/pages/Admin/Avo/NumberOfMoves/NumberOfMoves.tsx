import React, { useEffect, useState } from "react"
import useSWR from "swr"
import { Select } from "../../../../../components/UI/Select/Select"
import ServerError from "../../../../../Error/ServerError"
import ReadService from "../../../../service/read"
import { IDeviceMod, INumberOfMoves, ITubeCount } from "../../../../types/device"
import classes from "../avo.module.scss"
import { TableContainer } from "./Table"

export default function NumberOfMoves() {
    const [devId, setDevId] = useState("")
    const [countId, setCountId] = useState("")

    const { data: dev, error: errDev } = useSWR<{ data: IDeviceMod[] }>(
        "/sealur-moment/device-mod",
        ReadService.getData
    )

    const { data: count, error: errCount } = useSWR<{ data: ITubeCount[] }>(
        "/sealur-moment/tube-count",
        ReadService.getData
    )

    const { data: res, error: errNum } = useSWR<{ data: INumberOfMoves[] }>(
        devId && countId
            ? [
                  "/sealur-moment/number-of-moves",
                  [
                      { name: "devId", value: devId },
                      { name: "countId", value: countId },
                  ],
              ]
            : null,
        ReadService.getData
    )

    useEffect(() => {
        if (!devId && dev) setDevId(dev.data[0].id)
    }, [devId, dev])
    useEffect(() => {
        if (!countId && count) setCountId(count.data[0].id)
    }, [countId, count])

    const changeDevIdHandler = (id: string) => {
        setDevId(id)
    }
    const changeCountIdHandler = (id: string) => {
        setCountId(id)
    }

    if (errDev || errCount || errNum) return <ServerError />

    return (
        <div className={classes.content}>
            <p className={classes["content-title"]}>Число ходов по трубному пространству</p>
            <div className={classes["content-filter"]}>
                <div className={classes.row}>
                    <div>
                        <p>Модификация аппарата</p>
                        <Select value={devId} onChange={changeDevIdHandler}>
                            {dev?.data.map(d => (
                                <Select.Option key={d.id} value={d.id}>
                                    {d.title}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                    <div>
                        <p>Число рядов труб в секции</p>
                        <Select value={countId} onChange={changeCountIdHandler}>
                            {count?.data.map(c => (
                                <Select.Option key={c.id} value={c.id}>
                                    {c.value}
                                </Select.Option>
                            ))}
                        </Select>
                    </div>
                </div>
            </div>

            <TableContainer data={res?.data || []} devId={devId} countId={countId} />
        </div>
    )
}
