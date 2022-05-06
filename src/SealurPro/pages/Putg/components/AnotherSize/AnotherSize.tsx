import { FC } from "react"
import classes from "../../../style/pages.module.scss"

type Props = {}

const imageUrl = "/image/ov.webp"

export const AnotherSize: FC<Props> = () => {
    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.putgDrawFl}`}>
                <p className={classes.titleGroup}>Размеры прокладки</p>
                <div className={classes.blockImage}>
                    <div className={classes.imageContainer}>
                        <img
                            className={classes.image}
                            width={500}
                            height={378}
                            src={imageUrl}
                            alt='gasket drawing'
                        />
                        {/* <Sizes
                            d1={size?.d1 || "0"}
                            d2={size?.d2 || "0"}
                            d3={size?.d3 || "0"}
                            d4={size?.d4 || "0"}
                        /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
