import { IResponse } from "../types/response"
import api from "../../service/api"
import { IPosition, IPositionDTO } from "../types/order"

type PositionResponse = { data: IPosition[] }

export default class PositionService {
    static async add(orderId: string, data: IPositionDTO): Promise<IResponse> {
        try {
            const res = await api.post<IResponse>(`/sealur-pro/orders/${orderId}/positions`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async get(orderId: string): Promise<PositionResponse> {
        try {
            const res = await api.get(`/sealur-pro/orders/${orderId}/positions`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getCur(userId: string): Promise<PositionResponse> {
        try {
            const res = await api.get(`/sealur-pro/orders/positions?userId=${userId}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async update(orderId: string, id: string, count: string): Promise<IResponse> {
        try {
            const res = await api.patch<IResponse>(
                `/sealur-pro/orders/${orderId}/positions/${id}`,
                { count }
            )
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async delete(orderId: string, id: string): Promise<IResponse> {
        try {
            const res = await api.delete<IResponse>(`/sealur-pro/orders/${orderId}/positions/${id}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
