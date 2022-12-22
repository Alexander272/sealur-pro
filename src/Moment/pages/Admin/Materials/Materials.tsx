import React, { useEffect, useState } from "react"
import useSWR from "swr"
import ReadService from "../../../service/read"
import { IFullMaterial } from "../../../types/materials"
import ServerError from "../../../../Error/ServerError"
import { List } from "./List"
import { Tables } from "./Tables/Tables"
import classes from "./materials.module.scss"

export default function Materials() {
    const { data: materials, error } = useSWR<{ data: IFullMaterial[] }>(
        "/sealur-moment/materials/empty",
        ReadService.getData
    )

    const [material, setMaterial] = useState<IFullMaterial | null>(null)

    useEffect(() => {
        if (materials) setMaterial(materials.data[0])
    }, [materials])

    const changeMaterialHandler = (material: IFullMaterial) => setMaterial(material)

    if (error) return <ServerError />
    if (!material) return <div className={classes.container}></div>

    return (
        <div className={classes.container}>
            <List materials={materials?.data} material={material} onClick={changeMaterialHandler} />
            <Tables material={material} />
        </div>
    )
}
