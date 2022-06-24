import { IResponse, IUserResponse } from "../types/response"
import { IUser, IUserDTO } from "../types/user"
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

    static async deleteUser(id: string): Promise<IResponse> {
        try {
            const res = await api.delete(`/users/${id}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getAllUsers(): Promise<{ data: IUser[] }> {
        try {
            const res = await api.get(`/users/all`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
    static async getNewUsers(): Promise<{ data: IResponse[] }> {
        try {
            const res = await api.get(`/users/new`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
