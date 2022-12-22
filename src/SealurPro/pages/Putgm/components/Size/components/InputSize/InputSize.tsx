import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Input } from "../../../../../../../components/UI/Input/Input"
import { Dispatch, ProState } from "../../../../../../store/store"
import { ISize } from "../../../../../../types/size"
import classes from "../../../../../style/pages.module.scss"

type Props = {}

export const InputSize: FC<Props> = () => {
    const size = useSelector((state: ProState) => state.putgm.size)

    const { putgm } = useDispatch<Dispatch>()

    const changeSizeHandler =
        (name: "d4" | "d3" | "d2" | "d1") => (event: React.ChangeEvent<HTMLInputElement>) => {
            let newSize: ISize = JSON.parse(JSON.stringify(size))
            newSize[name] = event.target.value

            putgm.setSize(newSize)
        }

    return (
        <>
            {size?.d4 && (
                <div className={classes.group}>
                    <p className={classes.titleGroup}>D4</p>
                    <Input
                        name='d4'
                        value={size.d4}
                        type='number'
                        onChange={changeSizeHandler("d4")}
                    />
                </div>
            )}
            {size?.d3 && (
                <div className={classes.group}>
                    <p className={classes.titleGroup}>D3</p>
                    <Input
                        name='d3'
                        value={size.d3}
                        type='number'
                        onChange={changeSizeHandler("d3")}
                    />
                </div>
            )}
            {size?.d2 && (
                <div className={classes.group}>
                    <p className={classes.titleGroup}>D2</p>
                    <Input
                        name='d2'
                        value={size.d2}
                        type='number'
                        onChange={changeSizeHandler("d2")}
                    />
                </div>
            )}
            {size?.d1 && (
                <div className={classes.group}>
                    <p className={classes.titleGroup}>D1</p>
                    <Input
                        name='d1'
                        value={size.d1}
                        type='number'
                        onChange={changeSizeHandler("d1")}
                    />
                </div>
            )}
        </>
    )
}
