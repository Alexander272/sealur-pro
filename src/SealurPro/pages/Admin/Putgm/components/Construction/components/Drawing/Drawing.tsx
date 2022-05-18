import { FC } from "react"
import { useSelector } from "react-redux"
import { ProState } from "../../../../../../../store/store"
import classes from "./drawing.module.scss"

type Props = {}

export const Drawing: FC<Props> = () => {
    const constructions = useSelector((state: ProState) => state.putgm.constructions)

    const renderDrawing = () => {
        const drawings: JSX.Element[] = []
        constructions.forEach(con => {
            con.obturator.forEach(o => {
                o.sealant.forEach(s => {
                    drawings.push(
                        <p
                            key={`${con.basis}-${o.obturator}-${s.seal}`}
                            className={classes.listItem}
                        >
                            <span>
                                {con.basis}-{o.obturator}-{s.seal}:
                            </span>
                            {s.imageUrl !== "" ? (
                                <>
                                    <a
                                        href={s.imageUrl}
                                        className={classes.link}
                                        target='_blank'
                                        rel='noreferrer'
                                    >
                                        {s.imageUrl}
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
        })

        return drawings
    }

    return <div className={`${classes.list} scroll`}>{renderDrawing()}</div>
}
