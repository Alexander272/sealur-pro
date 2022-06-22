import { ISizeDTO } from "../types/size"
import { IResponse } from "../types/response"
import api from "../../service/api"

export default class SizeService {
    static async create(data: ISizeDTO): Promise<IResponse> {
        try {
            const res = await api.post("/sealur-pro/sizes", data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async update(id: string, data: ISizeDTO): Promise<IResponse> {
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

    static async deleteAll(flange: string, typePr: string): Promise<IResponse> {
        try {
            const res = await api.delete(`/sealur-pro/sizes/all?flange=${flange}&typePr=${typePr}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
