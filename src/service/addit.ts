import api from "./api"
import { IResponse } from "../types/response"

export default class AdditService {
    static async updateMat(id: string, mat: string): Promise<IResponse> {
        try {
            const res = await api.patch<IResponse>(`/sealur-pro/additionals/${id}/mat`, {
                materials: mat,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateMod(id: string, mod: string): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/mod`, { mod: mod })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateTemp(id: string, temp: string): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/temp`, { temperature: temp })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateMoun(id: string, moun: string): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/moun`, { mounting: moun })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateGrap(id: string, grap: string): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/grap`, { graphite: grap })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateFillers(id: string, fil: string): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/fil`, { fillers: fil })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
