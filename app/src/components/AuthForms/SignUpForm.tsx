import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Dispatch } from "../../store/store"
import { ISignUp } from "../../types/user"
import { Button } from "../UI/Button/Button"
import { Input } from "../UI/Input/Input"
import classes from "./forms.module.scss"

type Props = {
    isOpen: boolean
    onChangeTab: () => void
}

export const SignUpForm: FC<Props> = ({ isOpen, onChangeTab }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignUp>()

    const { user } = useDispatch<Dispatch>()

    const signInHandler: SubmitHandler<ISignUp> = data => {
        user.singUp(data)
    }

    return (
        <form
            onClick={!isOpen ? onChangeTab : undefined}
            className={`${classes.form} ${classes.signup} ${isOpen ? "" : classes.close}`}
            onSubmit={handleSubmit(signInHandler)}
        >
            <h2 className={classes.title}>Регистрация</h2>
            <div className={classes.contents}>
                <Input
                    name='organization'
                    rounded='round'
                    placeholder='Предприятие'
                    register={register}
                    rule={{ required: true }}
                    error={errors.organization}
                    errorText='Поле предприятие не может быть пустым'
                />
                <Input
                    name='name'
                    rounded='round'
                    placeholder='Ф.И.О.'
                    register={register}
                    rule={{ required: true }}
                    error={errors.organization}
                    errorText='Поле Ф.И.О. не может быть пустым'
                />
                <Input
                    name='email'
                    rounded='round'
                    type='email'
                    placeholder='Email'
                    register={register}
                    rule={{
                        required: true,
                        pattern:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    }}
                    error={errors.organization}
                    errorText='Email задан некорректно'
                />
                <Input
                    name='city'
                    rounded='round'
                    placeholder='Город'
                    register={register}
                    rule={{ required: true }}
                    error={errors.organization}
                    errorText='Поле город не может быть пустым'
                />
                <Input
                    name='position'
                    rounded='round'
                    placeholder='Должность'
                    register={register}
                    rule={{ required: true }}
                    error={errors.organization}
                    errorText='Поле должность не может быть пустым'
                />
                <Input name='phone' rounded='round' placeholder='Контактный телефон' />
                <Button rounded='round'>Зарегистрироваться</Button>
            </div>
        </form>
    )
}
