import { createModel } from "@rematch/core"
import { ProModel } from "."
import { IResult } from "../../types/list"

interface IListState {
    list: IResult[]
}

export const list = createModel<ProModel>()({
    state: {
        list: [],
    } as IListState,

    reducers: {
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
    },
})
