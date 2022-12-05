import React from "react"
import useSWR from "swr"
import ServerError from "../../../../../Error/ServerError"
import ReadService from "../../../../service/read"
import { ITubeCount } from "../../../../types/device"
import classes from "../avo.module.scss"
import { TableContainer } from "./Table"

export default function TubeCount() {
    const { data: res, error } = useSWR<{ data: ITubeCount[] }>(
        "/sealur-moment/tube-count",
        ReadService.getData
    )

    if (error) return <ServerError />

    return (
        <div className={classes.content}>
            <p className={classes["content-title"]}>Число рядов труб в секции</p>
            <TableContainer data={res?.data || []} />
        </div>
    )
}
