import { IPutgmDTO } from "../types/putgm"
import { IResponse } from "../types/response"
import api from "./api"

export default class PutgmService {
    static async create(data: IPutgmDTO): Promise<IResponse> {
        try {
            const res = await api.post<IResponse>("/sealur-pro/putgm/", data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async update(data: IPutgmDTO, id: string): Promise<IResponse> {
        try {
            const res = await api.put<IResponse>(`/sealur-pro/putgm/${id}`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async delete(id: string): Promise<IResponse> {
        try {
            const res = await api.delete<IResponse>(`/sealur-pro/putgm/${id}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
