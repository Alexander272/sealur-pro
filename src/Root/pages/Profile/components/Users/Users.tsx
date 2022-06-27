import { ChangeEvent, FC, useCallback, useLayoutEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../components/Modal/Modal"
import { Button } from "../../../../../components/UI/Button/Button"
import { Input } from "../../../../../components/UI/Input/Input"
import UserService from "../../../../../service/user"
import { ISignIn, IUser } from "../../../../../types/user"
import { NewUsers } from "./NewUsers"
import { User } from "./User"
import classes from "./users.module.scss"

export const Users: FC = () => {
    const [users, setUsers] = useState<IUser[]>([])
    const user = useRef<IUser | null>(null)

    const [search, setSearch] = useState("")
    const [serchedUsers, setSerchedUsers] = useState<IUser[]>([])

    const {
        register,
        handleSubmit,
        setValue,
        formState: { errors },
    } = useForm<ISignIn>()

    const fetchUsers = useCallback(async () => {
        try {
            const res = await UserService.getAllUsers()
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

    const searchHandler = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event.target.value
        setSearch(value)

        const su = users.filter(
            u =>
                u.organization.includes(value) ||
                u.city.includes(value) ||
                u.name.includes(value) ||
                u.login.includes(value)
        )

        setSerchedUsers(su)
    }

    const deleteHandler = async () => {
        if (!user.current) return
        try {
            await UserService.deleteUser(user.current?.id)

            let newUsers: IUser[] = JSON.parse(JSON.stringify(users))
            newUsers = newUsers.filter(u => u.id !== user.current?.id)
            setUsers(newUsers)

            toast.success("Пользователь удален")
            confirmToggle()
        } catch (error: any) {
            toast.error("Произошла ошибка " + error.message)
        }
    }

    const saveHandler = async (data: ISignIn) => {
        if (!user.current) return
        try {
            await UserService.updateUser(user.current.id, data)

            let newUsers: IUser[] = JSON.parse(JSON.stringify(users))
            newUsers = newUsers.map(u => {
                if (u.id === user.current?.id) return { ...u, login: data.login }
                else return u
            })
            setUsers(newUsers)

            toast.success("Пользовательские данные обновлены")
            toggle()
        } catch (error: any) {
            toast.error("Произошла ошибка " + error.message)
        }
    }

    return (
        <>
            <NewUsers fetchAllUsers={fetchUsers} />

            <div className={classes.container}>
                <ConfirmModal
                    title='Удалить пользователя?'
                    isOpen={confirmIsOpen}
                    toggle={confirmToggle}
                    cancelHandler={confirmToggle}
                    confirmHandler={deleteHandler}
                />
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
                <div className={classes.header}>
                    <h3 className={classes.title}>Пользователи</h3>
                    <Input
                        id='search'
                        name='search'
                        rounded='round'
                        placeholder='Поиск...'
                        value={search}
                        onChange={searchHandler}
                    />
                </div>

                {serchedUsers.length
                    ? serchedUsers.map(u => (
                          <User
                              key={u.id}
                              user={u}
                              onEdit={openModal(u, toggle)}
                              onDelete={openModal(u, confirmToggle)}
                              getUsers={fetchUsers}
                          />
                      ))
                    : users.map(u => (
                          <User
                              key={u.id}
                              user={u}
                              onEdit={openModal(u, toggle)}
                              onDelete={openModal(u, confirmToggle)}
                              getUsers={fetchUsers}
                          />
                      ))}
            </div>
        </>
    )
}
