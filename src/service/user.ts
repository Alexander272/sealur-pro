import { IResponse, IUserResponse } from "../types/response"
import { ConfirmUser, IUser, IUserDTO } from "../types/user"
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

    static async confirmUser(data: ConfirmUser): Promise<IResponse> {
        try {
            const res = await api.post(`/users/confirm`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async rejectUser(id: string): Promise<IResponse> {
        try {
            const res = await api.delete(`/users/reject/${id}`)
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
    static async getNewUsers(): Promise<{ data: IUser[] }> {
        try {
            const res = await api.get(`/users/new`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getUsers(
        url: string,
        page: number,
        search: {
            value: string
            fields: string[]
        }
    ): Promise<{ data: IUser[]; count: number }> {
        let params = undefined
        if (search.value) {
            params = new URLSearchParams(search.fields.map(f => ["search_field", f]))
            params.append("search", search.value)
        }

        try {
            const res = await api.get(`${url}/${page}`, { params: params })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
