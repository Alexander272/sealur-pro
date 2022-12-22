import React, { useEffect, useState } from "react"
import useSWR from "swr"
import ReadService from "../../../service/read"
import ServerError from "../../../../Error/ServerError"
import { IGasket } from "../../../types/flange"
import { List } from "./List"
import { Content } from "./Content/Content"
import classes from "./gasket.module.scss"

export default function Gaskets() {
    const { data: gaskets, error } = useSWR<{ data: IGasket[] }>(
        "/sealur-moment/gasket/",
        ReadService.getData
    )

    const [gasket, setGasket] = useState<IGasket | null>(null)

    useEffect(() => {
        if (gaskets) setGasket(gaskets.data[0])
    }, [gaskets])

    const changeGasketHandler = (gasket: IGasket) => setGasket(gasket)

    if (error) return <ServerError />
    if (!gasket) return <div className={classes.container}></div>

    return (
        <div className={classes.container}>
            <List gaskets={gaskets?.data} gasket={gasket} onClick={changeGasketHandler} />
            <Content gasket={gasket} />
        </div>
    )
}
