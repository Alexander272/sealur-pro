import { FC } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import { Dispatch } from "../../../SealurPro/store/store"
import { ISignIn } from "../../../SealurPro/types/user"
import { Button } from "../../../components/UI/Button/Button"
import { Input } from "../../../components/UI/Input/Input"
import classes from "./forms.module.scss"

type Props = {
    isOpen: boolean
    onChangeTab: () => void
}

export const SignInForm: FC<Props> = ({ isOpen, onChangeTab }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<ISignIn>()

    const { user } = useDispatch<Dispatch>()

    const signInHandler: SubmitHandler<ISignIn> = data => {
        user.signIn(data)
    }

    return (
        <form
            onClick={!isOpen ? onChangeTab : undefined}
            className={`${classes.form} ${isOpen ? "" : classes.close}`}
            onSubmit={handleSubmit(signInHandler)}
        >
            <h2 className={classes.title}>Вход</h2>
            <div className={classes.contents}>
                <Input
                    name='login'
                    rounded='round'
                    placeholder='Логин'
                    register={register}
                    rule={{ required: true }}
                    error={errors.login}
                    errorText='Поле логин не может быть пустым'
                />
                <Input
                    name='password'
                    type='password'
                    rounded='round'
                    placeholder='Пароль'
                    register={register}
                    rule={{ required: true }}
                    error={errors.password}
                    errorText='Поле пароль не может быть пустым'
                />
                <Button rounded='round'>Войти</Button>
                <Link className={classes.link} to='/survey'>
                    Заполнить опросный лист
                </Link>
            </div>
        </form>
    )
}
