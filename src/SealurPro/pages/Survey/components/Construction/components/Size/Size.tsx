import { FC, useEffect } from "react"
import { Dn } from "./components/Dn"
import classes from "../../../../survey.module.scss"
import { useDispatch, useSelector } from "react-redux"
import { Dispatch, ProState } from "../../../../../../store/store"
import { Sizes } from "./components/Sizes/Sizes"
import { AnotherSize } from "./components/AnotherSize"

type Props = {}

const imgUrls = {
    1: "/image/survey/1.webp",
    2: "/image/survey/2-3.webp",
    3: "/image/survey/4-5.webp",
}

export const Size: FC<Props> = () => {
    const loading = useSelector((state: ProState) => state.survey.loading)
    const type = useSelector((state: ProState) => state.survey.type)
    const row = useSelector((state: ProState) => state.survey.row)
    const size = useSelector((state: ProState) => state.survey.size)
    const anSize = useSelector((state: ProState) => state.survey.anotherSize)

    const { survey } = useDispatch<Dispatch>()

    useEffect(() => {
        if (!loading) survey.getSizes({ flange: type.flange, typeFl: type.typeFl, row: row })
    }, [survey, loading, type.flange, type.typeFl, row])

    return (
        <>
            <div className={classes.inline}>
                {type.type === "stand" && <Dn />}
                {type.type === "not_stand" && <AnotherSize />}

                <div className={classes.imageContainer}>
                    {["1", "2", "3"].includes(type.typeFl) && (
                        <>
                            <img
                                className={classes.image}
                                width={559}
                                height={440}
                                src={imgUrls[type.typeFl as "1"]}
                                alt='flange drawing'
                            />
                            {type.type !== "not_stand" && size ? (
                                <Sizes size={size} typeFl={type.typeFl} />
                            ) : null}
                            {type.type === "not_stand" && (
                                <Sizes size={anSize} typeFl={type.typeFl} />
                            )}
                        </>
                    )}
                </div>
            </div>
        </>
    )
}
