import { createModel } from "@rematch/core"
import { toast } from "react-toastify"
import { ProModel } from "."
import OrderService from "../../service/order"
import PositionService from "../../service/position"
import { IResult } from "../../types/list"
import { IOrderDTO, IPositionDTO } from "../../types/order"

interface IListState {
    loading: boolean
    list: IResult[]
    orderId: string
    isOrderCreated: boolean
}

export const list = createModel<ProModel>()({
    state: {
        loading: false,
        list: [],
        orderId: "",
        isOrderCreated: false,
    } as IListState,

    reducers: {
        setLoading(state, payload: boolean) {
            state.loading = payload
            return state
        },
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
        setIsOrderCreated(state, payload: boolean) {
            state.isOrderCreated = payload
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

    effects: dispatch => {
        const { list } = dispatch
        return {
            async createOrder(payload: { order: IOrderDTO; position: IPositionDTO }) {
                try {
                    list.setLoading(true)
                    let res = await OrderService.create(payload.order)
                    list.setIsOrderCreated(true)
                    list.setOrderId(res.id || "")

                    res = await PositionService.add(res.id || "", payload.position)
                    list.addResult({ ...payload.position, id: res.id || "" })
                    toast.success("Прокладка добавлена")
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    list.setLoading(false)
                }
            },

            async deleteOrder(orderId: string) {
                try {
                    list.setLoading(true)
                    await OrderService.delete(orderId)
                    list.setIsOrderCreated(false)
                    list.setOrderId("")
                    list.setList([])
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    list.setLoading(false)
                }
            },

            async addPosition(position: IPositionDTO) {
                try {
                    list.setLoading(true)
                    const res = await PositionService.add(position.orderId, position)
                    list.addResult({ ...position, id: res.id || "" })
                    toast.success("Прокладка добавлена")
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    list.setLoading(false)
                }
            },

            async updatePosition(payload: { orderId: string; id: string; count: string }) {
                try {
                    list.setLoading(true)
                    await PositionService.update(payload.orderId, payload.id, payload.count)
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    list.setLoading(false)
                }
            },

            async getPositions(userId: string) {
                try {
                    list.setLoading(true)
                    const res = await PositionService.getCur(userId)
                    if (res.data.length > 0) {
                        list.setList(res.data)
                        list.setOrderId(res.data[0].orderId)
                        list.setIsOrderCreated(true)
                    }
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    list.setLoading(false)
                }
            },
        }
    },
})
