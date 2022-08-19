import React, { useEffect, useState } from "react"
import useSWR from "swr"
import ServerError from "../../../../Error/ServerError"
import ReadService from "../../../service/read"
import { ITypeFlange } from "../../../types/flange"
import { IStandart } from "../../../types/standart"
import { Content } from "./Content/Content"
import { List } from "./List/List"
import classes from "./standarts.module.scss"

export default function Standarts() {
    const { data: types, error } = useSWR<{ data: ITypeFlange[] }>(
        "/sealur-moment/type-flange",
        ReadService.getData
    )

    const [typeId, setTypeId] = useState<string | null>(null)
    const [standart, setStandart] = useState<IStandart | null>(null)

    useEffect(() => {
        if (types) setTypeId(types.data[0].id)
    }, [types])

    const { data: standarts } = useSWR<{ data: IStandart[] }>(
        typeId ? `/sealur-moment/standarts/?typeId=${typeId}` : null,
        ReadService.getData
    )
    useEffect(() => {
        if (standarts) setStandart(standarts.data ? standarts.data[0] : null)
    }, [standarts])

    if (error) return <ServerError />
    if (!types) return <div className={classes.container}></div>

    const changeTypeHandler = (id: string) => setTypeId(id)

    return (
        <div className={classes.container}>
            <List
                types={types?.data}
                typeId={typeId}
                chageType={changeTypeHandler}
                standarts={standarts?.data}
                standart={standart}
            />
            <Content standart={standart} />
        </div>
    )
}
