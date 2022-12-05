import React from "react"
import useSWR from "swr"
import ServerError from "../../../../../Error/ServerError"
import ReadService from "../../../../service/read"
import { IPressure } from "../../../../types/device"
import classes from "../avo.module.scss"
import { PressureTable } from "./Table"

export default function Pressure() {
    const { data: res, error } = useSWR<{ data: IPressure[] }>(
        "/sealur-moment/pressure",
        ReadService.getData
    )

    if (error) return <ServerError />

    return (
        <div className={classes.content}>
            <p className={classes["content-title"]}>Условное давление</p>
            <PressureTable data={res?.data || []} />
        </div>
    )
}
