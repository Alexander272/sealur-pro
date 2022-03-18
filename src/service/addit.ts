import api from "./api"
import { IResponse } from "../types/response"

export default class AdditService {
    static async updateMat(
        id: string,
        mat: string,
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch<IResponse>(`/sealur-pro/additionals/${id}/mat`, {
                materials: mat,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateMod(
        id: string,
        mod: string,
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/mod`, {
                mod: mod,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateTemp(
        id: string,
        temp: string,
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/temp`, {
                temperature: temp,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateMoun(
        id: string,
        moun: string,
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/moun`, {
                mounting: moun,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateGrap(
        id: string,
        grap: string,
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/grap`, {
                graphite: grap,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateFillers(
        id: string,
        fil: string,
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/fil`, {
                fillers: fil,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
