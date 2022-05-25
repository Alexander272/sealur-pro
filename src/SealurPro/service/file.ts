import { IResponse } from "../types/response"
import api from "./api"

export default class FileService {
    static async create(data: FormData, url: string): Promise<IResponse> {
        try {
            const res = await api.post(url, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async delete(url: string): Promise<IResponse> {
        try {
            const res = await api.delete(url)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
