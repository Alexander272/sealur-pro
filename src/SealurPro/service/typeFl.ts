import api from "../../service/api"
import { ITypeFlCreate } from "../types/typeFl"
import { IResponse } from "../types/response"

export default class TypeFlService {
    static async create(data: ITypeFlCreate): Promise<IResponse> {
        try {
            const res = await api.post("/sealur-pro/flange-types", data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async update(id: string, data: ITypeFlCreate): Promise<IResponse> {
        try {
            const res = await api.put(`/sealur-pro/flange-types/${id}`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async delete(id: string): Promise<IResponse> {
        try {
            const res = await api.delete(`/sealur-pro/flange-types/${id}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
