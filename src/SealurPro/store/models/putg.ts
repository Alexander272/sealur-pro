import { createModel } from "@rematch/core"
import { toast } from "react-toastify"
import { ProModel } from "."
import ReadService from "../../service/read"
import { IConstruction, IPUTG } from "../../types/putg"
import { IDn, ISize, ISizeReq } from "../../types/size"

interface IPutgState {
    loading: boolean
    fetching: boolean
    error: boolean

    putgs: IPUTG[]
    sizes: ISize[]
    dns: IDn[]
    dn: string
    pn: string
    h: string
    oh: string

    putg: IPUTG | null
    size: ISize | null

    constructions: IConstruction[]

    construction: string
    obturation: string

    flange: string
    coating: string
    grap: string
    temp: string
    mod: string

    isJumper: boolean
    jumper: string
    jumWidth: string
    isHole: boolean
    isDetachable: boolean
    parts: string
    isMoun: boolean
    moun: string

    rf: string
    ob: string
    il: string
    ol: string

    isOpenRf: boolean
    isOpenOb: boolean
    isOpenIl: boolean
    isOpenOl: boolean
}

const testPutg: IPUTG = {
    id: "1",
    typeFlId: "1",
    typePr: "ПУТГ-А",
    form: "Round",
    construction: [
        {
            grap: "2",
            temperatures: [
                {
                    temp: "1",
                    constructions: [
                        {
                            short: "200",
                            obturators: [
                                {
                                    short: "01",
                                    imageUrl: "/image/putg/construction/100-01.webp",
                                },
                            ],
                        },
                    ],
                },
            ],
        },
        {
            grap: "1",
            temperatures: [],
        },
    ],
    temperatures: [
        { grap: "2", temps: [{ id: "1", mods: ["0", "1", "2", "3"] }] },
        { grap: "1", temps: [] },
    ],
    reinforce: { values: ["*"], default: "1" },
    obturator: { values: ["*"], default: "2" },
    iLimiter: { values: ["*"], default: "2" },
    oLimiter: { values: ["*"], default: "2" },
    coating: ["*"],
    mounting: ["*"],
    graphite: ["2", "1"],
}

const testSize: ISize = {
    id: "1",
    dn: "10",
    pn: "0,1 (1,0);0,25 (2,5);0,6 (6,0)",
    typePr: "ПУТГ-А",
    typeFlId: "1",
    d3: "38",
    d2: "14",
    h: "2,0",
}

export const putg = createModel<ProModel>()({
    state: {
        loading: true,
        fetching: false,
        error: false,

        putgs: [testPutg],
        sizes: [testSize],
        dns: [],
        dn: "",
        pn: "",
        h: "",
        oh: "",

        putg: testPutg,
        size: testSize,

        constructions: [
            {
                short: "200",
                obturators: [
                    {
                        short: "01",
                        imageUrl: "/image/putg/construction/100-01.webp",
                    },
                ],
            },
        ],

        construction: "200",
        obturation: "01",

        // test value
        flange: "1",
        coating: "0",
        grap: "2",
        temp: "1",
        mod: "0",

        // flange: "",
        // coating: "",
        // grap: "",
        // temp: "",
        // mod: "",

        isJumper: false,
        jumper: "A",
        jumWidth: "",
        isHole: false,
        isDetachable: false,
        parts: "2",
        isMoun: false,
        moun: "",

        rf: "",
        ob: "",
        il: "",
        ol: "",

        isOpenRf: false,
        isOpenOb: false,
        isOpenIl: false,
        isOpenOl: false,
    } as IPutgState,

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

        setPutgs(state, payload: IPUTG[]) {
            state.putgs = payload
            return state
        },
        setSizes(state, payload: ISize[]) {
            state.sizes = payload
            return state
        },
        setDns(state, payload: IDn[]) {
            state.dns = payload
            return state
        },
        setDn(state, payload: string) {
            state.dn = payload
            return state
        },
        setPn(state, payload: string) {
            state.pn = payload
            return state
        },
        setH(state, payload: string) {
            state.h = payload
            return state
        },
        setOH(state, payload: string) {
            state.oh = payload
            return state
        },

        setPutg(state, payload: IPUTG | null) {
            state.putg = payload
            return state
        },
        setSize(state, payload: ISize | null) {
            state.size = payload
            return state
        },

        setConstructions(state, payload: IConstruction[]) {
            state.constructions = payload
            return state
        },
        setConstruction(state, payload: string) {
            state.construction = payload
            return state
        },
        setObturation(state, payload: string) {
            state.obturation = payload
            return state
        },
        setFlange(state, payload: string) {
            state.flange = payload
            return state
        },
        setGrap(state, payload: string) {
            state.grap = payload
            return state
        },
        setCoating(state, payload: string) {
            state.coating = payload
            return state
        },
        setTemp(state, payload: string) {
            state.temp = payload
            return state
        },
        setMod(state, payload: string) {
            state.mod = payload
            return state
        },

        setRf(state, payload: string) {
            state.rf = payload
            return state
        },
        setOb(state, payload: string) {
            state.ob = payload
            return state
        },
        setIl(state, payload: string) {
            state.il = payload
            return state
        },
        setOl(state, payload: string) {
            state.ol = payload
            return state
        },

        setIsJumper(state, payload: boolean) {
            state.isJumper = payload
            return state
        },
        setJumper(state, payload: string) {
            state.jumper = payload
            return state
        },
        setJumperWidth(state, payload: string) {
            state.jumWidth = payload
            return state
        },
        setIsHole(state, payload: boolean) {
            state.isHole = payload
            return state
        },
        setIsDetachable(state, payload: boolean) {
            state.isDetachable = payload
            return state
        },
        setParts(state, payload: string) {
            state.parts = payload
            return state
        },
        setIsMoun(state, payload: boolean) {
            state.isMoun = payload
            return state
        },
        setMoun(state, payload: string) {
            state.moun = payload
            return state
        },

        // setIsOpenFrame(state, payload: boolean) {
        //     state.isOpenFr = payload
        //     return state
        // },
        // setIsOpenIr(state, payload: boolean) {
        //     state.isOpenIr = payload
        //     return state
        // },
        // setIsOpenOr(state, payload: boolean) {
        //     state.isOpenOr = payload
        //     return state
        // },

        // changeSnp(state, payload: ISNP) {
        //     state.snp = payload
        //     if (payload.graphite[0] !== "*") {
        //         state.grap = payload.graphite[0]
        //     }

        //     const fil = payload.fillers[0].id
        //     const temp = payload.fillers[0].temps[0].id
        //     const mod = payload.fillers[0].temps[0].mods[0]
        //     state.filler = fil
        //     state.temp = temp
        //     state.mod = mod

        //     state.ir = payload.ir.default || ""
        //     state.or = payload.or.default || ""
        //     state.fr = payload.frame.default || ""
        //     return state
        // },
        // changeSize(state, payload: ISize) {
        //     state.size = payload
        //     state.dn = payload.dn
        //     state.h = payload.h.split(";")[0] || ""
        //     state.s2 = payload.s2?.split(";")[0] || ""
        //     state.s3 = payload.s3?.split(";")[0] || ""
        //     return state
        // },
        // changePn(state, payload: string) {
        //     state.pn = payload
        //     return state
        // },
        // changeH(state, payload: number) {
        //     if (payload === -1) {
        //         state.h = "др."
        //         state.s2 = ""
        //         state.s3 = ""
        //     } else {
        //         state.h = state.size?.h.split(";")[payload] || ""
        //         state.s2 = state.size?.s2?.split(";")[payload] || ""
        //         state.s3 = state.size?.s3?.split(";")[payload] || ""
        //     }

        //     return state
        // },
        // changeOH(state, payload: string) {
        //     state.oh = payload
        //     return state
        // },

        // changeFiller(state, payload: string) {
        //     state.filler = payload
        //     const fil = state.snp?.fillers.find(f => f.id === payload)
        //     state.temp = fil?.temps[0].id || ""
        //     state.mod = fil?.temps[0].mods[0] || ""
        // },
        changeTemp(state, payload: string) {
            state.temp = payload
            const temps = state.putg?.temperatures.find(t => t.grap === state.grap)
            const temp = temps?.temps.find(t => t.id === payload)
            if (!temp?.mods.includes(state.mod)) state.mod = temp?.mods[0] || ""
            return state
        },
        changeMod(state, payload: string) {
            state.mod = payload
            const temp = state.putg?.temperatures.find(t => t.grap === state.grap)
            temp?.temps.forEach(t => {
                if (t.mods.includes(payload)) {
                    if (t.id !== state.temp) state.temp = t.id
                }
            })
            return state
        },
    },

    effects: dispatch => {
        const { putg, addit } = dispatch
        return {
            async getDefault() {
                putg.setLoading(true)
                console.log("getDefault")
                try {
                    const res = await ReadService.getDefaultPutg()
                    addit.setFl(res.fl)
                    addit.setAddit(res.addit)
                    addit.setTypeFl(res.typeFl)
                    //     snp.setSnps(res!.snp)
                    //     snp.setSizes(res!.sizes.sizes)
                    //     snp.setDns(res!.sizes.dn)
                    //     snp.setSnp(res!.snp[0])
                    //     snp.setSize(res!.sizes.sizes[0])
                    //     snp.setDn(res!.sizes.sizes[0].dn)
                    //     snp.setPn(res!.sizes.sizes[0].pn.split(";")[0])
                    //     snp.setH(res!.sizes.sizes[0].h.split(";")[0])
                    //     snp.setS2(res!.sizes.sizes[0].s2?.split(";")[0] || "")
                    //     snp.setS3(res!.sizes.sizes[0].s3?.split(";")[0] || "")
                    //     const grap =
                    //         res!.snp[0].graphite[0] === "*"
                    //             ? res!.addit?.graphite[0].short
                    //             : res!.snp[0].graphite[0]
                    putg.setConstruction("100")
                    putg.setObturation("01")
                    //     const fil = res!.snp[0].fillers[0].id
                    //     const temp = res!.snp[0].fillers[0].temps[0].id
                    //     const mod = res!.snp[0].fillers[0].temps[0].mods[0]
                    //     snp.setGrap(grap || "")
                    //     snp.setFil(fil)
                    //     snp.setTemp(temp)
                    //     snp.setMod(mod)
                    putg.setMoun(res.addit.mounting[0].title)
                    //     snp.setIr(res!.snp[0].ir.default)
                    //     snp.setOr(res!.snp[0].or?.default)
                    //     snp.setFr(res!.snp[0].frame?.default)
                    putg.setRf("1")
                    putg.setOb("1")
                    putg.setIl("1")
                    putg.setOl("1")
                    //     snp.setSt(res!.stfl[0].id)
                } catch (error) {
                    putg.setError(true)
                    toast.error("Не удалось загрузить данные", { autoClose: false })
                } finally {
                    putg.setLoading(false)
                }
            },
            async getSizes(req: ISizeReq) {
                putg.setFetching(true)
                try {
                    const res = await ReadService.getSize(req)
                    putg.setSizes(res.data.sizes)
                    putg.setDns(res.data.dn)
                    putg.setSize(res.data.sizes[0])
                    putg.setDn(res.data.sizes[0].dn)
                    putg.setPn(res.data.sizes[0].pn.split(";")[0])
                    putg.setH(res.data.sizes[0].h.split(";")[0])
                } catch (error) {
                    toast.error("Не удалось загрузить размеры", { autoClose: false })
                } finally {
                    putg.setFetching(false)
                }
            },
            async getPutg({ flange, req }: { flange: string; req: any }) {
                putg.setLoading(true)
                try {
                    //         const res = await ReadService.getSnp(req)
                    putg.setFlange(flange)
                    //         snp.setSt(st)
                    //         snp.setSnp(res.data[0])
                    //         snp.setSnps(res.data)

                    //         if (res.data[0].graphite[0] !== "*") {
                    //             snp.setGrap(res.data[0].graphite[0])
                    //         }

                    //         const fil = res.data[0].fillers[0].id
                    //         const temp = res.data[0].fillers[0].temps[0].id
                    //         const mod = res.data[0].fillers[0].temps[0].mods[0]
                    //         snp.setFil(fil)
                    //         snp.setTemp(temp)
                    //         snp.setMod(mod)

                    //         snp.setIr(res.data[0].ir.default || "")
                    //         snp.setOr(res.data[0].or.default || "")
                    //         snp.setFr(res.data[0].frame.default || "")
                } catch (error) {
                    //         toast.error("Не удалось загрузить данные", { autoClose: false })
                } finally {
                    putg.setLoading(false)
                }
            },
        }
    },
})
