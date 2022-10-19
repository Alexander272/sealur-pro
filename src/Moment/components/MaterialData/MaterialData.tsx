import { UseFormRegister } from "react-hook-form"
import { Input } from "../../../components/UI/Input/Input"
import classes from "../../pages/styles/page.module.scss"

type Props = {
    path: string
    register: UseFormRegister<any>
    errors: any
    titles: {
        name: string
        alpha?: string
        epsilonAt20?: string
        epsilon?: string
        sigmaAt20?: string
        sigma?: string
    }
    designation: {
        alpha?: JSX.Element
        epsilonAt20?: JSX.Element
        epsilon?: JSX.Element
        sigmaAt20?: JSX.Element
        sigma?: JSX.Element
    }
}

export default function MaterialData({ path, register, titles, designation, errors }: Props) {
    return (
        <>
            <div className={classes.line}>
                <p>Название {titles.name}</p>
                <div className={classes["line-field"]}>
                    <Input
                        name={`${path}.title`}
                        id={`${path}.title`}
                        register={register}
                        rule={{ required: true }}
                        error={errors[`${path}?.title`]}
                    />
                </div>
            </div>

            {titles.alpha && designation.alpha ? (
                <div className={classes.line}>
                    <p>Температурный коэффициент линейного расширения {titles.alpha}</p>
                    <p className={classes.designation}>{designation.alpha}</p>
                    <div className={classes["line-field"]}>
                        <Input
                            name={`${path}.alphaF`}
                            id={`${path}.alphaF`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='*10^-6 1/&#8451;'
                            rule={{ required: true }}
                            error={errors[`${path}?.alphaF`]}
                        />
                    </div>
                </div>
            ) : null}

            {titles.epsilonAt20 && designation.epsilonAt20 ? (
                <div className={classes.line}>
                    <p>
                        Модуль продольной упругости {titles.epsilonAt20} при температуре 20 &#8451;
                    </p>
                    <p className={classes.designation}>{designation.epsilonAt20}</p>
                    <div className={classes["line-field"]}>
                        <Input
                            name={`${path}.epsilonAt20`}
                            id={`${path}.epsilonAt20`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='МПа'
                            rule={{ required: true }}
                            error={errors[`${path}?.epsilonAt20`]}
                        />
                    </div>
                </div>
            ) : null}

            {titles.epsilon && designation.epsilon ? (
                <div className={classes.line}>
                    <p>Модуль продольной упругости {titles.epsilon} при расчетной температуре</p>
                    <p className={classes.designation}>{designation.epsilon}</p>
                    <div className={classes["line-field"]}>
                        <Input
                            name={`${path}.epsilon`}
                            id={`${path}.epsilon`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='МПа'
                            rule={{ required: true }}
                            error={errors[`${path}?.epsilon`]}
                        />
                    </div>
                </div>
            ) : null}

            {titles.sigmaAt20 && designation.sigmaAt20 ? (
                <div className={classes.line}>
                    <p>Допускаемое напряжение для {titles.sigmaAt20}</p>
                    <p className={classes.designation}>{designation.sigmaAt20}</p>
                    <div className={classes["line-field"]}>
                        <Input
                            name={`${path}.sigmaAt20`}
                            id={`${path}.sigmaAt20`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='МПа'
                            rule={{ required: true }}
                            error={errors[`${path}?.sigmaAt20`]}
                        />
                    </div>
                </div>
            ) : null}

            {titles.sigma && designation.sigma ? (
                <div className={classes.line}>
                    <p>Допускаемое напряжение для {titles.sigma}</p>
                    <p className={classes.designation}>{designation.sigma}</p>
                    <div className={classes["line-field"]}>
                        <Input
                            name={`${path}.sigma`}
                            id={`${path}.sigma`}
                            type='number'
                            step={0.001}
                            register={register}
                            suffix='МПа'
                            rule={{ required: true }}
                            error={errors[`${path}?.sigma`]}
                        />
                    </div>
                </div>
            ) : null}
        </>
    )
}
