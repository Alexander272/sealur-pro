import { IResponse, IUserResponse } from "../types/response"
import { IUserDTO } from "../types/user"
import api from "./api"

export default class UserService {
    static async getUser(id: string): Promise<{ data: IUserResponse }> {
        try {
            const res = await api.get(`/users/${id}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateUser(id: string, data: IUserDTO): Promise<IResponse> {
        try {
            const res = await api.patch(`/users/${id}`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
