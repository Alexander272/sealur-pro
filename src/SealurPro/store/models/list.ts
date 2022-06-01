import { createModel } from "@rematch/core"
import { ProModel } from "."
import { IResult } from "../../types/list"

interface IListState {
    list: IResult[]
    orderId: string
}

export const list = createModel<ProModel>()({
    state: {
        list: [],
        orderId: "",
    } as IListState,

    reducers: {
        setOrderId(state, payload: string) {
            state.orderId = payload
            return state
        },
        setList(state, payload: IResult[]) {
            state.list = payload
            return state
        },
        addResult(state, payload: IResult) {
            state.list.push(payload)
            return state
        },

        changeCount(state, payload: { id: string; count: string }) {
            state.list = state.list.map(l => {
                if (l.id === payload.id) l.count = payload.count
                return l
            })
            return state
        },
        deleteItem(state, payload: string) {
            state.list = state.list.filter(l => l.id !== payload)
        },
    },
})
