import api from "../../service/api"
import { IResponse } from "../types/response"
import {
    IBasis,
    ICoating,
    IConstruction,
    IFiller,
    IGrap,
    IMat,
    IMod,
    IMoun,
    IObturator,
    ISealant,
    ITemp,
} from "../types/addit"

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

    static async updateCoating(
        id: string,
        coat: ICoating[],
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/coat`, {
                coating: coat,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateConstruction(
        id: string,
        constr: IConstruction[],
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/constr`, {
                constr: constr,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateObturators(
        id: string,
        obts: IObturator[],
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/obt`, {
                obturator: obts,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateBasis(
        id: string,
        constr: IBasis[],
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/basis`, {
                constr: constr,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updatePObturators(
        id: string,
        obts: IObturator[],
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/pobt`, {
                pobturator: obts,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }

    static async updateSealant(
        id: string,
        seal: ISealant[],
        type: string,
        change: string
    ): Promise<IResponse> {
        try {
            const res = await api.patch(`/sealur-pro/additionals/${id}/seal`, {
                sealant: seal,
                type,
                change,
            })
            return res.data
        } catch (error: any) {
            throw error.response.data
        }
    }
}
