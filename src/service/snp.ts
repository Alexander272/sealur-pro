import { IResponse } from "../types/response"
import { ISNPDTO } from "../types/snp"
import api from "./api"

export default class SNPService {
    static async create(data: ISNPDTO): Promise<IResponse> {
        try {
            const res = await api.post<IResponse>("/sealur-pro/snp", data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async update(data: ISNPDTO, id: string): Promise<IResponse> {
        try {
            const res = await api.put<IResponse>(`/sealur-pro/snp/${id}`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async delete(id: string): Promise<IResponse> {
        try {
            const res = await api.delete<IResponse>(`/sealur-pro/snp/${id}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
