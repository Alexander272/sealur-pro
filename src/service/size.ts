import { ISize, ISizeCreate } from "../types/size"
import s from "../mock/size_12815.json"
import { IResponse } from "../types/response"
import api from "./api"

export default class SizeService {
    static async create(data: ISizeCreate): Promise<IResponse> {
        try {
            const res = await api.post("/sealur-pro/sizes", data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async update(id: string, data: ISizeCreate): Promise<IResponse> {
        try {
            const res = await api.put(`/sealur-pro/sizes/${id}`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async delete(id: string, flange: string): Promise<IResponse> {
        try {
            const res = await api.delete(`/sealur-pro/sizes/${id}?flange=${flange}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
