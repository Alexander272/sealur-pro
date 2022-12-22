import { IPutgDTO } from "../types/putg"
import { IResponse } from "../types/response"
import api from "../../service/api"

export default class PutgService {
    static async create(data: IPutgDTO): Promise<IResponse> {
        try {
            const res = await api.post<IResponse>("/sealur-pro/putg/", data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async update(data: IPutgDTO, id: string): Promise<IResponse> {
        try {
            const res = await api.put<IResponse>(`/sealur-pro/putg/${id}`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async delete(id: string): Promise<IResponse> {
        try {
            const res = await api.delete<IResponse>(`/sealur-pro/putg/${id}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
