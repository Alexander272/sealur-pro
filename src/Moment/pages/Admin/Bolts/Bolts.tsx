import React from "react"
import useSWR from "swr"
import ServerError from "../../../../Error/ServerError"
import ReadService from "../../../service/read"
import { IBolt } from "../../../types/bolts"
import { Table } from "./Table/Table"
import classes from "./bolts.module.scss"

export default function Bolts() {
    const { data: bolts, error: boltsError } = useSWR<{ data: IBolt[] }>(
        "/sealur-moment/bolts?isInch=false",
        ReadService.getData
    )
    const { data: inchBolts, error: inchBoltsError } = useSWR<{ data: IBolt[] }>(
        "/sealur-moment/bolts?isInch=true",
        ReadService.getData
    )

    if (boltsError || inchBoltsError) return <ServerError />

    return (
        <div className={classes.container}>
            <Table title='Болты' bolts={bolts?.data} isInch={false} />
            <Table title='Дюймовые болты' bolts={inchBolts?.data} isInch={true} />
        </div>
    )
}
