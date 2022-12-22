import { useEffect, useState } from "react"
import { SubmitHandler, useForm } from "react-hook-form"
import { useDispatch, useSelector } from "react-redux"
import { Button } from "../../../components/UI/Button/Button"
import { Input } from "../../../components/UI/Input/Input"
import { Dispatch, RootState } from "../../../store/store"
import { IUserDTO } from "../../../types/user"
import classes from "./profile.module.scss"

export default function Profile() {
    const userId = useSelector((state: RootState) => state.user.userId)
    const user = useSelector((state: RootState) => state.user.user)

    const dispatch = useDispatch<Dispatch>()

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<IUserDTO>()

    const [isDisable, setIsDisable] = useState(true)

    useEffect(() => {
        if (user) {
            setValue("name", user.name)
            setValue("email", user.email)
            setValue("position", user.position)
            setValue("phone", user.phone)
        }
    }, [user, setValue])

    const editHandler = () => setIsDisable(false)

    const updateUserHandler: SubmitHandler<IUserDTO> = async data => {
        if (!user) return
        await dispatch.user.updateUser({ id: userId, user: data })
        dispatch.user.setUserData({ ...user, ...data })
        setIsDisable(true)
    }

    return (
        <div className={classes.container}>
            <form className={classes.form} onSubmit={handleSubmit(updateUserHandler)}>
                <h4 className={classes.title}>Профиль</h4>
                {/* <div className={classes.contents}> */}
                <Input
                    id='organization'
                    name='organization'
                    label='Предприятие'
                    rounded='round'
                    value={user?.organization || ""}
                    disabled
                />
                <Input
                    id='name'
                    name='name'
                    rounded='round'
                    label='Ф.И.О.'
                    placeholder='Ф.И.О.'
                    register={register}
                    rule={{ required: true }}
                    error={errors.name}
                    errorText='Поле Ф.И.О. не может быть пустым'
                    disabled={isDisable}
                />
                <Input
                    id='email'
                    name='email'
                    label='Email'
                    rounded='round'
                    type='email'
                    placeholder='Email'
                    register={register}
                    rule={{
                        required: true,
                        pattern:
                            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    }}
                    error={errors.email}
                    errorText='Email задан некорректно'
                    disabled={isDisable}
                />
                <Input
                    id='city'
                    name='city'
                    label='Город'
                    rounded='round'
                    placeholder='Город'
                    value={user?.city || ""}
                    disabled
                />
                <Input
                    id='position'
                    name='position'
                    label='Должность'
                    rounded='round'
                    placeholder='Должность'
                    register={register}
                    rule={{ required: true }}
                    error={errors.position}
                    errorText='Поле должность не может быть пустым'
                    disabled={isDisable}
                />
                <Input
                    id='phone'
                    name='phone'
                    label='Контактный телефон'
                    rounded='round'
                    placeholder='Контактный телефон'
                    register={register}
                    disabled={isDisable}
                />
                {!isDisable && (
                    <Button rounded='round' fullWidth>
                        Сохранить
                    </Button>
                )}
                {/* </div> */}
            </form>
            {isDisable && (
                <Button rounded='round' fullWidth variant='grayPrimary' onClick={editHandler}>
                    Редактировать
                </Button>
            )}
        </div>
    )
}
