import api from "./api"
import { IResponse } from "../types/response"
import { IFiller, IGrap, IMat, IMod, IMoun, ITemp } from "../types/addit"

export default class AdditService {
    static async updateMat(
        id: string,
        mat: IMat[],
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
        mod: IMod[],
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
        temp: ITemp[],
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
        moun: IMoun[],
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
        grap: IGrap[],
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
        fil: IFiller[],
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
