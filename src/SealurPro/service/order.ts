import { IResponse } from "../types/response"
import api from "../../service/api"
import { IOrder, IOrderDTO } from "../types/order"

type OrderResponse = { data: IOrder[] }

export default class OrderService {
    static async create(data: IOrderDTO): Promise<IResponse> {
        try {
            const res = await api.post<IResponse>("/sealur-pro/orders/", data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getAll(userId: string): Promise<OrderResponse> {
        try {
            const res = await api.get(`/sealur-pro/orders/all?userId=${userId}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async delete(orderId: string): Promise<IResponse> {
        try {
            const res = await api.delete<IResponse>(`/sealur-pro/orders/${orderId}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async save(orderId: string): Promise<IResponse> {
        try {
            const res = await api.post<IResponse>(`/sealur-pro/orders/${orderId}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
