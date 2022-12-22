import { useEffect, useMemo, useRef } from "react"
import { useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"
import { toast } from "react-toastify"
import useSWR from "swr"
import { ConfirmModal } from "../../../components/ConfirmModal/ConfirmModal"
import { useModal } from "../../../components/Modal/hooks/useModal"
import { Loader } from "../../../components/UI/Loader/Loader"
import { Pagination } from "../../../components/UI/Pagination/Pagination"
import PageNotFound from "../../../Error/PageNotFound"
import { useDebounce } from "../../../hooks/debounse"
import UserService from "../../../service/user"
import { RootState } from "../../../store/store"
import { IUser } from "../../../types/user"
import { EditUser } from "./components/EditUser"
import { NewUsers } from "./components/NewUsers/NewUsers"
import { Search } from "./components/Search/Search"
import { useSearch } from "./components/Search/search.hook"
import { User } from "./components/User"
import classes from "./users.module.scss"

export default function Users() {
    const roles = useSelector((state: RootState) => state.user.roles)
    const navigate = useNavigate()
    const params = useParams()

    const isAdmin = useMemo(
        () => roles.some(r => r.service === "sealur" && r.role === "superuser"),
        [roles]
    )

    const user = useRef<IUser | null>(null)

    const { search, fields, changeSearch, changeFields } = useSearch()
    const searchValue = useDebounce(search, 500)

    const swrKey = [
        "/users/all",
        params.page,
        { value: searchValue, fields: searchValue ? fields : [] },
    ]

    const {
        data: res,
        isValidating,
        mutate,
    } = useSWR(isAdmin ? swrKey : null, UserService.getUsers)

    useEffect(() => {
        if (!isAdmin) navigate("/")
    }, [isAdmin, navigate])

    const { toggle, isOpen } = useModal()
    const { toggle: confirmToggle, isOpen: confirmIsOpen } = useModal()

    const openModal = (u: IUser, toggle: () => void) => () => {
        user.current = u
        toggle()
    }

    const deleteHandler = async () => {
        if (!user.current) return
        try {
            await UserService.deleteUser(user.current?.id)
            mutate()

            toast.success("Пользователь удален")
            confirmToggle()
        } catch (error: any) {
            toast.error("Произошла ошибка " + error.message)
        }
    }

    const changePage = (page: number) => {
        navigate(`/users/${page}`)
    }

    if (!isAdmin) return <PageNotFound />

    return (
        <div className={classes.wrapper}>
            <NewUsers swrKey={swrKey} />

            <div className={classes.container}>
                {isValidating && (
                    <div className={classes.loader}>
                        <Loader />
                    </div>
                )}

                <ConfirmModal
                    title='Удалить пользователя?'
                    isOpen={confirmIsOpen}
                    toggle={confirmToggle}
                    cancelHandler={confirmToggle}
                    confirmHandler={deleteHandler}
                />
                <EditUser user={user.current} isOpen={isOpen} toggle={toggle} swrKey={swrKey} />

                <div className={classes.header}>
                    <h3 className={classes.title}>Пользователи</h3>
                    <Search
                        search={search}
                        fields={fields}
                        changeSearch={changeSearch}
                        changeFields={changeFields}
                    />
                </div>

                {res?.data.map(u => (
                    <User
                        key={u.id}
                        user={u}
                        onEdit={openModal(u, toggle)}
                        onDelete={openModal(u, confirmToggle)}
                        getUsers={() => {}}
                    />
                ))}

                <div className={classes.pagination}>
                    <Pagination
                        page={+(params.page || 1)}
                        totalPages={res?.count || 1}
                        handlePagination={changePage}
                    />
                </div>
            </div>
        </div>
    )
}
