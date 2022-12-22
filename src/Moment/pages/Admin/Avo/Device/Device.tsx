import React from "react"
import useSWR from "swr"
import ServerError from "../../../../../Error/ServerError"
import ReadService from "../../../../service/read"
import { IDeviceMod } from "../../../../types/device"
import { DeviceTable } from "./Table"
import classes from "../avo.module.scss"

export default function Device() {
    const { data: res, error } = useSWR<{ data: IDeviceMod[] }>(
        "/sealur-moment/device-mod",
        ReadService.getData
    )

    if (error) return <ServerError />

    return (
        <div className={classes.content}>
            <p className={classes["content-title"]}>Модификация аппарата</p>
            <DeviceTable data={res?.data || []} />
        </div>
    )
}
