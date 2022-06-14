import { ChangeEvent, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../../../../../../../../components/UI/Input/Input"
import { Dispatch, ProState } from "../../../../../../../store/store"
import { IPadSize, ISizeInt } from "../../../../../../../types/survey"
import classes from "../../../../../survey.module.scss"

type Props = {}

export const AnotherSize: FC<Props> = () => {
    const size = useSelector((state: ProState) => state.survey.anotherSize)
    const typeFl = useSelector((state: ProState) => state.survey.type.typeFl)

    const { survey } = useDispatch<Dispatch>()

    const changeSizeDataHandler = (field: string) => (event: ChangeEvent<HTMLInputElement>) => {
        let newSize: ISizeInt & IPadSize = {} as ISizeInt & IPadSize
        Object.assign(newSize, size)
        newSize[field as "d"] = event.target.value
        survey.setAnotherSize(newSize)
    }

    return (
        <div className={["1", "2", "3"].includes(typeFl) ? classes.param : ""}>
            <div className={`${classes.field} ${classes.size}`}>
                {/* <p className={classes.titleGroup}>D, мм</p> */}
                <Input
                    name='dUp'
                    id='dUp'
                    value={size.dUp}
                    onChange={changeSizeDataHandler("dUp")}
                    label='D, мм'
                    orentation='horizontal'
                />
            </div>
            <div className={`${classes.field} ${classes.size}`}>
                <Input
                    name='d1'
                    id='d1'
                    value={size.d1}
                    onChange={changeSizeDataHandler("d1")}
                    label='D1, мм'
                    orentation='horizontal'
                />
            </div>
            <div className={`${classes.field} ${classes.size}`}>
                <Input
                    name='d2'
                    id='d2'
                    value={size.d2}
                    onChange={changeSizeDataHandler("d2")}
                    label='D2, мм'
                    orentation='horizontal'
                />
            </div>
            <div className={`${classes.field} ${classes.size}`}>
                <Input
                    name='d'
                    id='d'
                    value={size.d}
                    onChange={changeSizeDataHandler("d")}
                    label='d, мм'
                    orentation='horizontal'
                />
            </div>
            <div className={`${classes.field} ${classes.size}`}>
                <Input
                    name='h1'
                    id='h1'
                    value={size.h1}
                    onChange={changeSizeDataHandler("h1")}
                    label='h1, мм'
                    orentation='horizontal'
                />
            </div>
            <div className={`${classes.field} ${classes.size}`}>
                <Input
                    name='h2'
                    id='h2'
                    value={size.h2}
                    onChange={changeSizeDataHandler("h2")}
                    label='h2, мм'
                    orentation='horizontal'
                />
            </div>
            <p className={classes.title}>Или размеры прокладки</p>
            <div className={`${classes.field} ${classes.size}`}>
                <Input
                    name='dIn'
                    id='dIn'
                    value={size.dIn}
                    onChange={changeSizeDataHandler("dIn")}
                    label='Dнар, мм'
                    orentation='horizontal'
                />
            </div>
            <div className={`${classes.field} ${classes.size}`}>
                <Input
                    name='dOut'
                    id='dOut'
                    value={size.dOut}
                    onChange={changeSizeDataHandler("dOut")}
                    label='Dвн, мм'
                    orentation='horizontal'
                />
            </div>
            <div className={`${classes.field} ${classes.size}`}>
                <Input
                    name='h'
                    id='h'
                    value={size.h}
                    onChange={changeSizeDataHandler("h")}
                    label='h, мм'
                    orentation='horizontal'
                />
            </div>
        </div>
    )
}
