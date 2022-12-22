import api from "../../service/api"
import { IResponse } from "../types/response"
import { IDn } from "../types/size"
import { IBoltMaterial, IMaterial, ISizeInt, ISizeIntDTO } from "../types/survey"

type SizesIntResponse = { data: { sizes: ISizeInt[]; dn: IDn[] } }

export default class SurveyAdminService {
    static async createMaterials(data: IMaterial): Promise<IResponse> {
        try {
            const res = await api.post<IResponse>(`/sealur-pro/materials/`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateMaterials(data: IMaterial): Promise<IResponse> {
        try {
            const res = await api.put<IResponse>(`/sealur-pro/materials/${data.id}`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async deleteMaterials(id: string): Promise<IResponse> {
        try {
            const res = await api.delete<IResponse>(`/sealur-pro/materials/${id}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async createBolts(data: IBoltMaterial & { flangeId: string }): Promise<IResponse> {
        try {
            const res = await api.post<IResponse>(`/sealur-pro/bolt-materials/`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateBolts(data: IBoltMaterial & { flangeId: string }): Promise<IResponse> {
        try {
            const res = await api.put<IResponse>(`/sealur-pro/bolt-materials/${data.id}`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async deleteBolts(id: string): Promise<IResponse> {
        try {
            const res = await api.delete<IResponse>(`/sealur-pro/bolt-materials/${id}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async getAllSizes(flange: string, typeFl: string): Promise<SizesIntResponse> {
        try {
            const res = await api.get<SizesIntResponse>(
                `/sealur-pro/size-interview/all?flange=${flange}&typeFlId=${typeFl}`
            )
            return res.data
        } catch (error: any) {
            if (error.response.status !== 401) throw error.response.data
            return { data: { sizes: [], dn: [] } }
        }
    }

    static async createSize(data: ISizeIntDTO): Promise<IResponse> {
        try {
            const res = await api.post("/sealur-pro/sizes-interview", data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateSize(id: string, data: ISizeIntDTO): Promise<IResponse> {
        try {
            const res = await api.put(`/sealur-pro/sizes-interview/${id}`, data)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async deleteSize(id: string): Promise<IResponse> {
        try {
            const res = await api.delete(`/sealur-pro/sizes-interview/${id}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async deleteAllSize(flange: string): Promise<IResponse> {
        try {
            const res = await api.delete(`/sealur-pro/sizes-interview/all?flange=${flange}`)
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
