import { createModel } from "@rematch/core"
import { toast } from "react-toastify"
import { RootModel } from "."
import StFlService from "../../service/stFl"
import { IStFl } from "../../types/stFl"
import { ITypeFl } from "../../types/typeFl"

interface IFlangeState {
    loading: boolean
    stfl: IStFl[]
    typeFl: ITypeFl[]
}

export const flange = createModel<RootModel>()({
    state: {
        loading: false,
        stfl: [],
        typeFl: [],
    } as IFlangeState,

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
    },

    effects: dispatch => {
        const { flange } = dispatch
        return {
            async getStFl() {
                flange.setLoading(true)
                try {
                    const res = await StFlService.getStFl()
                    flange.setStFl(res.data)
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    flange.setLoading(false)
                }
            },
        }
    },
})
