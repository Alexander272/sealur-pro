import { IResponse } from "../types/response"
import { IRole, IRoleDTO } from "../types/user"
import api from "./api"

export default class RoleService {
    static async createRole(data: IRoleDTO): Promise<IResponse> {
        try {
            const res = await api.post(`/users/roles`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateRole(id: string, data: IRole): Promise<IResponse> {
        try {
            const res = await api.put(`/users/roles/${id}`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async deleteRole(id: string): Promise<IResponse> {
        try {
            const res = await api.delete(`/users/roles/${id}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
