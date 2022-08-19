import React, { FC } from "react"
import { Button } from "../../../../../components/UI/Button/Button"
import { Select } from "../../../../../components/UI/Select/Select"
import { ITypeFlange } from "../../../../types/flange"
import { IStandart } from "../../../../types/standart"
import classes from "../standarts.module.scss"

type Props = {
    types: ITypeFlange[] | undefined
    typeId: string | null
    chageType: (id: string) => void
    standarts: IStandart[] | undefined
    standart: IStandart | null
}

export const List: FC<Props> = ({ types, typeId, chageType, standarts, standart }) => {
    if (!types || !typeId) return <div className={classes.list}></div>

    return (
        <div className={classes.list}>
            <h5 className={classes["list-title"]}>Тип фланца</h5>
            <div className={classes["list-button"]}>
                <Select value={typeId} onChange={chageType}>
                    {types.map(t => (
                        <Select.Option key={t.id} value={t.id}>
                            {t.title}
                        </Select.Option>
                    ))}
                </Select>
            </div>

            <h5 className={classes["list-title"]}>Стандарты</h5>
            <div className={classes["list-button"]}>
                <Button variant='grayPrimary' fullWidth>
                    Добавить
                </Button>
            </div>
            <div className={`${classes["list-content"]} scroll`}>
                {standarts ? (
                    standarts.map(s => (
                        <p
                            key={s.id}
                            className={[
                                classes["list-item"],
                                standart?.id === s.id ? classes["list-item--active"] : "",
                            ].join(" ")}
                            // onClick={selectHandler(s)}
                        >
                            {s.title}
                            <span className={classes["edit-icon"]}>&#9998;</span>
                        </p>
                    ))
                ) : (
                    <p>Нет ни одного стандарта</p>
                )}
            </div>
        </div>
    )
}
