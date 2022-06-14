import { createModel } from "@rematch/core"
import { toast } from "react-toastify"
import { ProModel } from "."
import { ISignUp } from "../../../types/user"
import ReadService from "../../service/read"
import { IDrawing } from "../../types/drawing"
import { IDn } from "../../types/size"
import {
    DefFields,
    EquipFields,
    HeatFields,
    IBoltMaterial,
    IDefects,
    IEquipment,
    IHeat,
    IMater,
    IMaterial,
    IMedium,
    IPadSize,
    ISizeInt,
    ISizeIntReq,
    ITemperature,
    IType,
    MaterFields,
    MediumBoolFields,
    MediumFields,
    TempFields,
    TypeFields,
    UserFields,
} from "../../types/survey"

interface ISurveyState {
    error: boolean
    loading: boolean
    fetching: boolean

    materials: IMaterial[]
    boltMaterials: IMaterial[]
    sizes: ISizeInt[]
    dns: IDn[]
    row: 1 | 2
    bolts: IBoltMaterial[]

    user: ISignUp
    equip: IEquipment
    temperature: ITemperature
    heat: IHeat
    medium: IMedium
    type: IType
    py: string
    dy: string
    size: null | ISizeInt
    anotherSize: IPadSize & ISizeInt
    mater: IMater
    bolt: string
    defects: IDefects
    drawing: IDrawing | null
    info: string
}

export const survey = createModel<ProModel>()({
    state: {
        error: false,
        loading: true,
        fetching: false,
        materials: [],
        boltMaterials: [],
        sizes: [],
        dns: [],
        row: 1,
        bolts: [],

        user: {
            organization: "",
            name: "",
            email: "",
            city: "",
            position: "",
            phone: "",
        },
        equip: {
            techprocess: "",
            equipment: "",
            seal: "",
            consumer: "",
            factory: "",
            developer: "",
        },
        temperature: {
            diffFrom: "",
            diffTo: "",
            presWork: "",
            presTest: "",
            pressure: "mpa",
            environ: "",
        },
        heat: {
            tempWorkPipe: "",
            presWorkPipe: "",
            environPipe: "",
            tempWork: "",
            presWork: "",
            environ: "",
        },
        medium: {
            abrasive: false,
            crystallized: false,
            penetrating: false,
            condition: "",
            period: "",
        },
        type: {
            flange: "",
            typeFl: "",
            type: "stand",
        },
        py: "",
        dy: "",
        size: null,
        anotherSize: {
            id: "not_stand",
            dIn: "",
            dOut: "",
            h: "",
            dy: "",
            py: "",
            dUp: "",
            d1: "",
            d2: "",
            d: "",
            h1: "",
            h2: "",
            bolt: "",
            countBolt: 4,
        },
        mater: {
            material: "",
            boltMaterial: "",
            lubricant: false,
        },
        bolt: "",
        defects: {
            along: "",
            across: "",
            nonFlatness: "",
            mounting: false,
            drawingNumber: "",
        },
        drawing: null,
        info: "",
    } as ISurveyState,

    reducers: {
        setLoading(state, payload: boolean) {
            state.loading = payload
            return state
        },
        setFetching(state, payload: boolean) {
            state.fetching = payload
            return state
        },
        setError(state, payload: boolean) {
            state.error = payload
            return state
        },

        setMaterials(state, payload: IMaterial[]) {
            state.materials = payload
            return state
        },
        setBoltMaterials(state, payload: IMaterial[]) {
            state.boltMaterials = payload
            return state
        },
        setRow(state, payload: 1 | 2) {
            state.row = payload
            return state
        },
        setSizes(state, payload: ISizeInt[]) {
            state.sizes = payload
            return state
        },
        setDns(state, payload: IDn[]) {
            state.dns = payload
            return state
        },
        setBolts(state, payload: IBoltMaterial[]) {
            state.bolts = payload
            return state
        },

        setUserData(state, payload: { field: UserFields; value: string }) {
            state.user[payload.field] = payload.value
            return state
        },
        setEqipData(state, payload: { field: EquipFields; value: string }) {
            state.equip[payload.field] = payload.value
            return state
        },
        setTempData(state, payload: { field: TempFields; value: string }) {
            state.temperature[payload.field] = payload.value
            return state
        },
        setHeatData(state, payload: { field: HeatFields; value: string }) {
            state.heat[payload.field] = payload.value
            return state
        },
        setMediumBoolData(state, payoad: { field: MediumBoolFields; value: boolean }) {
            state.medium[payoad.field] = payoad.value
            return state
        },
        setMeduimData(state, payload: { field: MediumFields; value: string }) {
            state.medium[payload.field] = payload.value
            return state
        },
        setTypeData(state, payload: { field: TypeFields; value: string }) {
            state.type[payload.field] = payload.value
            return state
        },
        setPy(state, payload: string) {
            state.py = payload
            return state
        },
        setDy(state, payload: string) {
            state.dy = payload
            return state
        },
        setSize(state, payload: null | ISizeInt) {
            state.size = payload
            return state
        },
        setAnotherSize(state, payload: IPadSize & ISizeInt) {
            state.anotherSize = payload
            return state
        },
        setMaterData(state, payload: { field: MaterFields; value: string }) {
            state.mater[payload.field] = payload.value
            return state
        },
        setLubricant(state, payload: boolean) {
            state.mater.lubricant = payload
            return state
        },
        setBolt(state, payload: string) {
            state.bolt = payload
            return state
        },
        setDefectsData(state, payload: { field: DefFields; value: string }) {
            state.defects[payload.field] = payload.value
            return state
        },
        setMounting(state, payload: boolean) {
            state.defects.mounting = payload
            return state
        },
        setDrawing(state, payload: IDrawing | null) {
            state.drawing = payload
            return state
        },
        setInfo(state, payload: string) {
            state.info = payload
            return state
        },
    },

    effects: dispatch => {
        const { survey, addit } = dispatch
        return {
            async getDefault() {
                survey.setLoading(true)
                try {
                    const res = await ReadService.getSurveyData()
                    addit.setFl(res.fl)
                    addit.setTypeFl(res.typeFl)
                    const materials: IMaterial[] = []
                    const boltMaterials: IMaterial[] = []
                    res.materials.forEach(m => {
                        if (m.typeMat === "flange") materials.push(m)
                        else boltMaterials.push(m)
                    })
                    survey.setMaterials(materials)
                    survey.setBoltMaterials(boltMaterials)
                    survey.setTypeData({ field: "flange", value: res.fl[0].id })
                    survey.setTypeData({ field: "typeFl", value: res.typeFl[0].id })
                    survey.setTypeData({ field: "type", value: "stand" })
                    survey.setMaterData({ field: "material", value: materials[0].id })
                    survey.setMaterData({ field: "boltMaterial", value: boltMaterials[0].id })
                } catch (error: any) {
                    survey.setError(true)
                    toast.error(error.message)
                } finally {
                    survey.setLoading(false)
                }
            },
            async getSizes(req: ISizeIntReq) {
                try {
                    survey.setFetching(true)
                    const res = await ReadService.getSurveySize(req)
                    if (res.data.sizes) {
                        survey.setSizes(res.data.sizes)
                        survey.setDns(res.data.dn)
                        survey.setDy(res.data.dn[0].dn)
                        survey.setPy(res.data.sizes[0].py.split(";")[0])
                        survey.setSize(res.data.sizes[0])
                    }
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    survey.setFetching(false)
                }
            },
            async getBoltMaterials() {
                try {
                    survey.setFetching(true)
                    const res = await ReadService.getBolt()
                    survey.setBolts(res.data)
                    survey.setBolt(res.data[0].id)
                } catch (error: any) {
                    toast.error(error.message)
                } finally {
                    survey.setFetching(false)
                }
            },
        }
    },
})
