import { FC, useCallback, useLayoutEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { useSWRConfig } from "swr"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../components/Modal/Modal"
import { Button } from "../../../../../components/UI/Button/Button"
import { Input } from "../../../../../components/UI/Input/Input"
import UserService from "../../../../../service/user"
import { ConfirmUser, IRole, IUser } from "../../../../../types/user"
import { NewUser } from "./NewUser"
import { Roles } from "./Roles"
import classes from "../../users.module.scss"

type Props = {
    swrKey: any
}

export const NewUsers: FC<Props> = ({ swrKey }) => {
    const [users, setUsers] = useState<IUser[]>([])
    const [roles, setRoles] = useState<IRole[]>([
        { id: Date.now().toString(), service: "pro", role: "user" },
    ])
    const user = useRef<IUser | null>(null)

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ConfirmUser>()

    const { mutate } = useSWRConfig()

    const fetchUsers = useCallback(async () => {
        try {
            const res = await UserService.getNewUsers()
            setUsers(res.data)
        } catch (error: any) {
            toast.error("Произошла ошибка " + error.message)
        }
    }, [])

    useLayoutEffect(() => {
        fetchUsers()
    }, [fetchUsers])

    const { toggle, isOpen } = useModal()
    const { toggle: confirmToggle, isOpen: confirmIsOpen } = useModal()

    const openModal = (u: IUser, toggle: () => void) => () => {
        user.current = u
        setValue("login", u.login)
        toggle()
    }

    const deleteRoleHandler = (id: string) => {
        setRoles(prev => prev.filter(r => r.id !== id))
    }

    const addRoleHandler = (role: IRole) => {
        const newRoles = [...roles, role]
        setRoles(newRoles)
    }

    const rejectHandler = async () => {
        if (!user.current) return
        try {
            await UserService.rejectUser(user.current.id)

            let newUsers: IUser[] = JSON.parse(JSON.stringify(users))
            newUsers = newUsers.filter(u => u.id !== user.current?.id)
            setUsers(newUsers)

            toast.success("Пользователь отклонен")
            confirmToggle()
        } catch (error: any) {
            toast.error("Произошла ошибка " + error.message)
        }
    }

    const saveHandler = async (data: ConfirmUser) => {
        if (!user.current) return
        try {
            data.roles = roles
            data.id = user.current.id
            await UserService.confirmUser(data)

            let newUsers: IUser[] = JSON.parse(JSON.stringify(users))
            newUsers = newUsers.filter(u => u.id !== user.current?.id)
            setUsers(newUsers)

            toast.success("Пользователь подтвержден")
            toggle()

            mutate(swrKey)
        } catch (error: any) {
            toast.error("Произошла ошибка " + error.message)
        }
    }

    if (!users) return null

    return (
        <div className={classes.container}>
            <ConfirmModal
                title='Отклонить?'
                isOpen={confirmIsOpen}
                toggle={confirmToggle}
                cancelHandler={confirmToggle}
                confirmHandler={rejectHandler}
            />
            <Modal isOpen={isOpen} toggle={toggle}>
                <Modal.Header title={"Потверждение пользователя"} onClose={toggle} />
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
                    <p className={classes.offset} />
                    <Roles roles={roles} onDelete={deleteRoleHandler} onAdd={addRoleHandler} />
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
            <div className={classes.header}>
                <h3 className={classes.title}>Новые пользователи</h3>
            </div>
            {users.map(u => (
                <NewUser
                    key={u.id}
                    user={u}
                    onReject={openModal(u, confirmToggle)}
                    onConfirm={openModal(u, toggle)}
                />
            ))}
        </div>
    )
}
