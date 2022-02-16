import { createModel } from "@rematch/core"
import { toast } from "react-toastify"
import { RootModel } from "."
import AdditService from "../../service/addit"
import StFlService from "../../service/stFl"
import TypeFlService from "../../service/typeFl"
import { IAddit } from "../../types/addit"
import { IStFl } from "../../types/stFl"
import { ITypeFl } from "../../types/typeFl"

interface IAdditState {
    loading: boolean
    stfl: IStFl[]
    typeFl: ITypeFl[]
    addit: IAddit | null
}

export const addit = createModel<RootModel>()({
    state: {
        loading: false,
        stfl: [],
        typeFl: [],
        addit: null,
    } as IAdditState,

    reducers: {
        setLoading(state, payload: boolean) {
            state.loading = payload
            return state
        },
        setStFl(state, payload: IStFl[]) {
            state.stfl = payload
            return state
        },
        setTypeFl(state, payload: ITypeFl[]) {
            state.typeFl = payload
            return state
        },
        setAddit(state, payload: IAddit) {
            state.addit = payload
            return state
        },
    },

    effects: dispatch => {
        const { addit } = dispatch
        return {
            async getStFl() {
                addit.setLoading(true)
                try {
                    const res = await StFlService.get()
                    addit.setStFl(res.data)
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    addit.setLoading(false)
                }
            },
            async getTypeFl() {
                addit.setLoading(true)
                try {
                    const res = await TypeFlService.get()
                    addit.setTypeFl(res.data)
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    addit.setLoading(false)
                }
            },
            async getAddit() {
                addit.setLoading(true)
                try {
                    const res = await AdditService.get()
                    addit.setAddit(res.data)
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    addit.setLoading(false)
                }
            },
        }
    },
})
