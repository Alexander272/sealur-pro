import React, { FC, useState } from "react"
import { useModal } from "../../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../../components/Modal/Modal"
import { Button } from "../../../../../components/UI/Button/Button"
import { Select } from "../../../../../components/UI/Select/Select"
import { IRole } from "../../../../../types/user"
import classes from "../../users.module.scss"

const { Option } = Select

type Props = {
    roles: IRole[]
    onDelete: (id: string) => void
    onAdd: (role: IRole) => void
}

export const Roles: FC<Props> = ({ roles, onDelete, onAdd }) => {
    const [role, setRole] = useState<IRole | null>(null)

    const { isOpen, toggle } = useModal()

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

    const deleteHandler = (id: string) => () => {
        onDelete(id)
    }

    const submitHandler = () => {
        if (!role) return
        onAdd(role)
        toggle()
    }

    return (
        <>
            <Modal isOpen={isOpen} toggle={toggle}>
                <Modal.Header title='Добавить роль' onClose={toggle} />
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
                        Добавить
                    </Button>
                </Modal.Footer>
            </Modal>
            <p className={classes.services}>Доступные сервисы:</p>
            <div className={classes.servicesContainer}>
                {roles.map(r => (
                    <p key={r.id} className={classes.service}>
                        <span>Сервис: {r.service}</span>
                        <span>Роль: {r.role}</span>
                        <span className={classes.delete} onClick={deleteHandler(r.id)}>
                            &#10008;
                        </span>
                    </p>
                ))}
                <p
                    className={classes.add}
                    onClick={openHandler(
                        { id: Date.now().toString(), service: "pro", role: "user" },
                        toggle
                    )}
                >
                    &#10010;
                </p>
            </div>
        </>
    )
}
