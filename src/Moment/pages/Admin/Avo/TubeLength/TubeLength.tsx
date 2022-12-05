import React, { useEffect, useState } from "react"
import useSWR from "swr"
import ServerError from "../../../../../Error/ServerError"
import ReadService from "../../../../service/read"
import { IDeviceMod, ITubeLength } from "../../../../types/device"
import { Select } from "../../../../../components/UI/Select/Select"
import { TableContainer } from "./Table"
import classes from "../avo.module.scss"

export default function TubeLength() {
    const [devId, setDevId] = useState("")

    const { data: dev, error: errDev } = useSWR<{ data: IDeviceMod[] }>(
        "/sealur-moment/device-mod",
        ReadService.getData
    )

    const { data: res, error: errTube } = useSWR<{ data: ITubeLength[] }>(
        devId ? ["/sealur-moment/tube-length", [{ name: "devId", value: devId }]] : null,
        ReadService.getData
    )

    useEffect(() => {
        if (!devId && dev) setDevId(dev.data[0].id)
    }, [devId, dev])

    const changeDevIdHandler = (id: string) => {
        setDevId(id)
    }

    if (errDev || errTube) return <ServerError />

    return (
        <div className={classes.content}>
            <p className={classes["content-title"]}>Длина оребренных труб в секции</p>
            <div className={classes["content-filter"]}>
                <p>Модификация аппарата</p>
                <Select value={devId} onChange={changeDevIdHandler}>
                    {dev?.data.map(d => (
                        <Select.Option key={d.id} value={d.id}>
                            {d.title}
                        </Select.Option>
                    ))}
                </Select>
            </div>
            <TableContainer data={res?.data || []} devId={devId} />
        </div>
    )
}
