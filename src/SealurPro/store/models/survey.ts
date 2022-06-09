import { createModel } from "@rematch/core"
import { toast } from "react-toastify"
import { ProModel } from "."
import { ISignUp } from "../../../types/user"
import ReadService from "../../service/read"
import {
    EquipFileds,
    HeatFileds,
    IEquipment,
    IHeat,
    ITemperature,
    TempFields,
    UserFields,
} from "../../types/survey"

interface ISurveyState {
    loading: boolean
    user: ISignUp
    equip: IEquipment
    temperature: ITemperature
    heat: IHeat
}

export const survey = createModel<ProModel>()({
    state: {
        loading: false,
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
    } as ISurveyState,

    reducers: {
        setLoading(state, payload: boolean) {
            state.loading = payload
            return state
        },

        setUserData(state, payload: { field: UserFields; value: string }) {
            state.user[payload.field] = payload.value
            return state
        },
        setEqipData(state, payload: { field: EquipFileds; value: string }) {
            state.equip[payload.field] = payload.value
            return state
        },
        setTempData(state, payload: { field: TempFields; value: string }) {
            state.temperature[payload.field] = payload.value
            return state
        },
        setHeatData(state, payload: { field: HeatFileds; value: string }) {
            state.heat[payload.field] = payload.value
            return state
        },
    },

    effects: dispatch => {
        return {}
    },
})
