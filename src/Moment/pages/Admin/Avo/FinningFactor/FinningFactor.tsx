import React, { useEffect, useState } from "react"
import useSWR from "swr"
import { Select } from "../../../../../components/UI/Select/Select"
import ServerError from "../../../../../Error/ServerError"
import ReadService from "../../../../service/read"
import { IDeviceMod, IFinningFactor } from "../../../../types/device"
import classes from "../avo.module.scss"
import { TableContainer } from "./Table"

export default function FinningFactor() {
    const [devId, setDevId] = useState("")

    const { data: dev, error: errDev } = useSWR<{ data: IDeviceMod[] }>(
        "/sealur-moment/device-mod",
        ReadService.getData
    )

    const { data: res, error: errFin } = useSWR<{ data: IFinningFactor[] }>(
        devId ? ["/sealur-moment/finning-factor", [{ name: "devId", value: devId }]] : null,
        ReadService.getData
    )

    useEffect(() => {
        if (!devId && dev) setDevId(dev.data[0].id)
    }, [devId, dev])

    const changeDevIdHandler = (value: string) => {
        setDevId(value)
    }

    if (errDev || errFin) return <ServerError />

    return (
        <div className={classes.content}>
            <p className={classes["content-title"]}>Коэффициент оребрения</p>
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
