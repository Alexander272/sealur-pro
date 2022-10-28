import React, { FC, useEffect } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { Modal } from "../../../../components/Modal/Modal"
import { Button } from "../../../../components/UI/Button/Button"
import { Input } from "../../../../components/UI/Input/Input"
import UserService from "../../../../service/user"
import { ISignIn, IUser } from "../../../../types/user"
import classes from "../users.module.scss"

type Props = {
    user: IUser | null
    isOpen: boolean
    toggle: () => void
    swrKey: any
}

export const EditUser: FC<Props> = ({ user, isOpen, toggle, swrKey }) => {
    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ISignIn>()

    const { mutate } = useSWRConfig()

    useEffect(() => {
        setValue("login", user?.login || "")
    }, [setValue, user])

    const saveHandler = async (data: ISignIn) => {
        if (!user) return

        try {
            await UserService.updateUser(user.id, data)
            mutate(swrKey)

            toast.success("Пользовательские данные обновлены")
            toggle()
        } catch (error: any) {
            toast.error("Произошла ошибка " + error.message)
        }
    }

    return (
        <Modal isOpen={isOpen} toggle={toggle}>
            <Modal.Header title={"Редактировать пользователя"} onClose={toggle} />
            <Modal.Content>
                <Input
                    id='login'
                    name='login'
                    placeholder='Логин'
                    register={register}
                    rule={{ required: true }}
                    error={errors.login}
                    errorText='Логин не может быть пустым'
                />
                <p className={classes.offset} />
                <Input
                    id='password'
                    name='password'
                    type='password'
                    placeholder='Пароль'
                    register={register}
                    rule={{ required: true }}
                    error={errors.password}
                    errorText='Пароль не может быть пустым'
                />
            </Modal.Content>
            <Modal.Footer>
                <Button variant='grayPrimary' fullWidth onClick={toggle}>
                    Отмена
                </Button>
                <p className={classes.offset} />
                <Button fullWidth onClick={handleSubmit(saveHandler)}>
                    Сохранить
                </Button>
            </Modal.Footer>
        </Modal>
    )
}
