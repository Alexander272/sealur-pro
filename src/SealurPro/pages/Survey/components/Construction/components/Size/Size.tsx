import { FC } from "react"
import { Dn } from "./components/Dn"
import classes from "../../../../survey.module.scss"

type Props = {}

const imgUrl = "/image/survey/1.webp"

export const Size: FC<Props> = () => {
    return (
        <>
            <div className={classes.inline}>
                <Dn />
                <div className={classes.imageContainer}>
                    <img className={classes.image} width={559} height={440} src={imgUrl} alt='' />
                </div>
            </div>
        </>
    )
}
