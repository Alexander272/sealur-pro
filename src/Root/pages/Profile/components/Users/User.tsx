import React, { FC, useState } from "react"
import { toast } from "react-toastify"
import { ConfirmModal } from "../../../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../components/Modal/Modal"
import { Button } from "../../../../../components/UI/Button/Button"
import { Select } from "../../../../../components/UI/Select/Select"
import RoleService from "../../../../../service/role"
import { IRole, IUser } from "../../../../../types/user"
import { Ips } from "./Ips"
import classes from "./users.module.scss"

const { Option } = Select

type Props = {
    user: IUser
    getUsers: () => void
    onEdit: () => void
    onDelete: () => void
}

export const User: FC<Props> = ({ user, onEdit, onDelete, getUsers }) => {
    const [role, setRole] = useState<IRole | null>(null)

    const { isOpen, toggle } = useModal()
    const { isOpen: confirmIsOpen, toggle: confirmToggle } = useModal()

    const openHandler = (r: IRole, toggle: () => void) => () => {
        setRole(r)
        toggle()
    }

    const selectServiceHandler = (value: string) => {
        if (!role) return
        const newRole = { ...role, service: value }
        setRole(newRole)
    }
    const selectRoleHandler = (value: string) => {
        if (!role) return
        const newRole = { ...role, role: value }
        setRole(newRole)
    }

    const deleteHandler = async () => {
        try {
            if (!role) return

            await RoleService.deleteRole(role.id, user.id)
            toast.success("Роль удалена")
            confirmToggle()
            getUsers()
        } catch (error: any) {
            toast.error("Произошла ошибка " + error.message)
        }
    }

    const submitHandler = async () => {
        if (!role) return
        try {
            if (role.id === "") {
                await RoleService.createRole({ ...role, userId: user.id })
                toast.success("Роль добавлена")
            } else {
                await RoleService.updateRole(role.id, role)
                toast.success("Роль обновлена")
            }

            getUsers()
            toggle()
        } catch (error: any) {
            toast.error("Произошла ошибка " + error.message)
        }
    }

    return (
        <div className={classes.item}>
            <ConfirmModal
                title='Удалить роль?'
                isOpen={confirmIsOpen}
                toggle={confirmToggle}
                cancelHandler={confirmToggle}
                confirmHandler={deleteHandler}
            />
            <Modal isOpen={isOpen} toggle={toggle}>
                <Modal.Header
                    title={role?.id === "" ? "Добавить роль" : "Редактировать"}
                    onClose={toggle}
                />
                <Modal.Content>
                    <Select value={role?.service || ""} onChange={selectServiceHandler}>
                        <Option value='pro'>Sealur Pro</Option>
                        <Option value='moment'>Расчет момента затяжки</Option>
                    </Select>
                    <p className={classes.offset} />
                    <Select value={role?.role || ""} onChange={selectRoleHandler}>
                        <Option value='user'>Пользователь</Option>
                        <Option value='admin'>Администратор</Option>
                    </Select>
                </Modal.Content>
                <Modal.Footer>
                    <Button variant='grayPrimary' fullWidth onClick={toggle}>
                        Отмена
                    </Button>
                    <p className={classes.offset} />
                    <Button fullWidth onClick={submitHandler}>
                        {role?.id !== "" ? "Сохранить" : "Добавить"}
                    </Button>
                </Modal.Footer>
            </Modal>
            <div className={classes.btns}>
                <div className={classes.btn} onClick={onEdit}>
                    &#9998;
                </div>
                <div className={classes.btn} onClick={onDelete}>
                    &#10008;
                </div>
            </div>
            <p>Логин: {user.login}</p>
            <p>Предприятие: {user.organization}</p>
            <p className={classes.services}>Доступные сервисы:</p>
            <div className={classes.servicesContainer}>
                {user.roles &&
                    user.roles.map(r => (
                        <p key={r.id} className={classes.service}>
                            <span>Сервис: {r.service}</span>
                            <span>Роль: {r.role}</span>
                            <span className={classes.edit} onClick={openHandler(r, toggle)}>
                                &#9998;
                            </span>
                            <span
                                className={classes.delete}
                                onClick={openHandler(r, confirmToggle)}
                            >
                                &#10008;
                            </span>
                        </p>
                    ))}
                <p
                    className={classes.add}
                    onClick={openHandler({ id: "", service: "pro", role: "user" }, toggle)}
                >
                    &#10010;
                </p>
            </div>
            <Ips ips={user.ip || []} />
        </div>
    )
}
