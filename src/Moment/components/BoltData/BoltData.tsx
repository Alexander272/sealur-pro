import { UseFormRegister } from "react-hook-form"
import { Input } from "../../../components/UI/Input/Input"
import classes from "../../pages/styles/page.module.scss"

type Props = {
    register: UseFormRegister<any>
}

export default function BoltData({ register }: Props) {
    return (
        <>
            <div className={classes.line}>
                <p>Наружный диаметр болта (шпильки)</p>
                <p className={classes.designation}>
                    <i>d</i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='bolts.diamter'
                        id='bolts.diamter'
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм'
                    />
                </div>
            </div>

            <div className={classes.line}>
                <p>Площадь болта (шпильки)</p>
                <p className={classes.designation}>
                    <i>
                        f<sub>6</sub>
                    </i>
                </p>
                <div className={classes["line-field"]}>
                    <Input
                        name='bolts.area'
                        id='bolts.area'
                        type='number'
                        step={0.001}
                        register={register}
                        suffix='мм&#178;'
                    />
                </div>
            </div>
        </>
    )
}
