import { createModel } from "@rematch/core"
import { toast } from "react-toastify"
import { RootModel } from "."
import AuthService from "../../service/auth"
import { ISignInResponse } from "../../types/response"
import { ISignIn, ISignUp, IRole } from "../../types/user"

interface IUserState {
    ready: boolean
    loading: boolean
    userId: string
    email: string
    roles: IRole[]
    isAuth: boolean
}

export const user = createModel<RootModel>()({
    state: {
        ready: false,
        loading: false,
        roles: [],
        userId: "",
        email: "",
        isAuth: false,
    } as IUserState,

    reducers: {
        setReady(state, payload: boolean) {
            state.ready = payload
            return state
        },
        setLoading(state, payload: boolean) {
            state.loading = payload
            return state
        },
        setUser(state, payload: ISignInResponse) {
            state.userId = payload.userId
            state.email = payload.email
            state.roles = payload.roles
            state.isAuth = true
            return state
        },
        clearUser(state) {
            state.roles = []
            state.userId = ""
            state.isAuth = false
            return state
        },
    },

    effects: dispatch => {
        const { user } = dispatch
        return {
            async signIn(payload: ISignIn) {
                user.setLoading(true)
                try {
                    const res = await AuthService.signIn(payload)
                    user.setUser(res.data)
                } catch (error: any) {
                    if (error.message === "invalid data send")
                        toast.error("Введены неверные данные для входа")
                    else if (error.message === "something went wrong")
                        toast.error("Произошла ошибка")
                    else toast.error(error.message)
                } finally {
                    user.setLoading(false)
                }
            },

            async singUp(payload: ISignUp) {
                user.setLoading(true)
                try {
                    await AuthService.signUp(payload)
                    toast.success(
                        "Регистрация успешно завершена. Пожалуйста, дождитесь активации учетной записи",
                        { autoClose: false }
                    )
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    user.setLoading(false)
                }
            },

            async singOut() {
                user.setLoading(true)
                try {
                    await AuthService.signOut()
                    user.clearUser()
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    user.setLoading(false)
                }
            },

            async refresh() {
                user.setLoading(true)
                try {
                    const res = await AuthService.refresh()
                    user.setUser(res.data)
                } catch (error: any) {
                    console.log(error.message)
                } finally {
                    user.setLoading(false)
                }
            },
        }
    },
})
