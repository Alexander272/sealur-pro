import { FC } from "react"
import { useSelector } from "react-redux"
import { ProState } from "../../../../../../../store/store"
import classes from "./drawing.module.scss"

type Props = {}

export const Drawing: FC<Props> = () => {
    const constructions = useSelector((state: ProState) => state.putg.constructions)

    const renderDrawing = () => {
        const drawings: JSX.Element[] = []
        constructions.forEach(con => {
            con.obturators.forEach(o => {
                drawings.push(
                    <p key={`${con.short}-${o.short}`} className={classes.listItem}>
                        <span>
                            {con.short}-{o.short}:
                        </span>
                        {o.imageUrl !== "" ? (
                            <>
                                <a
                                    href={o.imageUrl}
                                    className={classes.link}
                                    target='_blank'
                                    rel='noreferrer'
                                >
                                    {o.imageUrl}
                                </a>
                                <span className={classes.times}>&times;</span>
                            </>
                        ) : (
                            <span className={classes.choose}>Выберите файл</span>
                        )}
                    </p>
                )
            })
        })

        return drawings
    }

    return <div className={`${classes.list} scroll`}>{renderDrawing()}</div>
}
