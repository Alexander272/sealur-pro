import React, { FC } from "react"
import { IFullMaterial } from "../../../types/materials"
import classes from "./materials.module.scss"

type Props = {
    materials: IFullMaterial[] | undefined
    materialId: string
    onClick: (material: IFullMaterial) => void
}

export const List: FC<Props> = ({ materials, materialId, onClick }) => {
    if (!materials) return null

    const selectHandler = (material: IFullMaterial) => () => onClick(material)

    return (
        <div className={`${classes.list} scroll`}>
            {materials.map(m => (
                <p
                    key={m.id}
                    className={[
                        classes["list-item"],
                        materialId === m.id ? classes["list-item--active"] : "",
                    ].join(" ")}
                    onClick={selectHandler(m)}
                >
                    {m.title}
                    {m.IsEmptyAlpha || m.IsEmptyElasticity || m.IsEmptyVoltage ? (
                        <span className={classes["warn-icon"]}>!</span>
                    ) : null}
                </p>
            ))}
        </div>
    )
}
