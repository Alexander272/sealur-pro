import { createModel } from "@rematch/core"
import { toast } from "react-toastify"
import { ProModel } from "."
import ReadService from "../../service/read"
import { IConstruction, IObturator, IPutgImage, IPutgReq } from "../../types/putg"
import { IPUTGM } from "../../types/putgm"
import { IDn, ISize, ISizeReq } from "../../types/size"

interface IPutgmState {
    loading: boolean
    fetching: boolean
    error: boolean

    putgImage: IPutgImage[]
    form: "Round" | "Oval" | "Rectangular"

    putgms: IPUTGM[]
    sizes: ISize[]
    dns: IDn[]
    dn: string
    pn: string
    h: string
    oh: string

    putgm: IPUTGM | null
    size: ISize | null

    notStand: boolean

    // constructions: IConstruction[]

    construction: string
    obturator: string
    imageUrl: string

    flange: string
    coating: string
    grap: string
    temp: string
    mod: string

    isJumper: boolean
    jumper: string
    jumWidth: string
    isHole: boolean
    parts: string
    isMoun: boolean
    moun: string

    seal: string
    obt: string
    basis: string
}

export const putgm = createModel<ProModel>()({
    state: {
        loading: false,
        fetching: false,
        error: false,

        putgImage: [],
        form: "Round",

        putgms: [],
        sizes: [],
        dns: [],
        dn: "",
        pn: "",
        h: "",
        oh: "",

        putgm: null,
        size: null,

        notStand: false,

        constructions: [],

        construction: "",
        obturator: "",
        imageUrl: "",

        flange: "",
        coating: "",
        grap: "",
        temp: "",
        mod: "",

        isJumper: false,
        jumper: "A",
        jumWidth: "",
        isHole: false,
        isDetachable: false,
        parts: "2",
        isMoun: false,
        moun: "",

        seal: "",
        obt: "",
        basis: "",
    } as IPutgmState,

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

        setPutgImage(state, payload: IPutgImage[]) {
            state.putgImage = payload
            return state
        },
        setForm(state, payload: "Round" | "Oval" | "Rectangular") {
            state.form = payload
            return state
        },

        setPutgms(state, payload: IPUTGM[]) {
            state.putgms = payload
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

        setPutgm(state, payload: IPUTGM | null) {
            state.putgm = payload
            return state
        },
        setSize(state, payload: ISize | null) {
            state.size = payload
            return state
        },

        setNotStand(state, payload: boolean) {
            state.notStand = payload
            return state
        },

        // setOnlyConstructions(state, payload: IConstruction[]) {
        //     state.constructions = payload
        //     return state
        // },
        // setConstructions(state, payload: IConstruction[]) {
        //     state.constructions = payload
        //     state.construction = payload[0]?.short || ""
        //     state.obturator = payload[0]?.obturators[0]?.short || ""
        //     state.imageUrl = payload[0]?.obturators[0]?.imageUrl || ""
        //     return state
        // },
        setConstruction(state, payload: string) {
            state.construction = payload
            return state
        },
        setObturator(state, payload: string) {
            state.obturator = payload
            return state
        },
        setImageUrl(state, payload: string) {
            state.imageUrl = payload
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

        // setRf(state, payload: string) {
        //     state.rf = payload
        //     return state
        // },
        // setOb(state, payload: string) {
        //     state.ob = payload
        //     return state
        // },
        // setIl(state, payload: string) {
        //     state.il = payload
        //     return state
        // },
        // setOl(state, payload: string) {
        //     state.ol = payload
        //     return state
        // },

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
        // setIsDetachable(state, payload: boolean) {
        //     state.isDetachable = payload
        //     return state
        // },
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

        changePutg(state, payload: IPUTGM) {
            state.putgm = payload
            state.grap = payload.graphite[0]

            // state.constructions = payload.construction[0].temperatures[0].constructions
            // state.construction = payload.construction[0].temperatures[0].constructions[0].short
            // state.obturator =
            //     payload.construction[0].temperatures[0].constructions[0].obturators[0].short
            // state.imageUrl =
            //     payload.construction[0].temperatures[0].constructions[0].obturators[0].imageUrl

            // state.temp = payload.temperatures[0].temps[0].id
            // state.mod = payload.temperatures[0].temps[0].mods[0]

            // state.rf = payload.reinforce.default
            // state.ob = payload.obturator.default
            // state.il = payload.iLimiter.default
            // state.ol = payload.oLimiter.default

            if (payload.coating[0] !== "*") state.coating = payload.coating[0]

            return state
        },
        changeSize(state, payload: ISize) {
            state.size = payload
            state.dn = payload.dn
            state.h = payload.h.split(";")[0] || ""
            return state
        },
        // changePn(state, payload: string) {
        //     state.pn = payload
        //     return state
        // },
        changeH(state, payload: number) {
            if (payload === -1) {
                state.h = "др."
            } else {
                state.h = state.size?.h.split(";")[payload] || ""
            }

            return state
        },
        changeOH(state, payload: string) {
            state.oh = payload
            return state
        },

        changeGrap(state, payload: string) {
            state.grap = payload

            // const constr = state.putgm?.construction.find(c => c.grap === payload)
            // if (constr) {
            //     state.constructions = constr.temperatures[0].constructions
            //     state.construction = constr.temperatures[0].constructions[0].short
            //     state.obturator = constr.temperatures[0].constructions[0].obturators[0].short
            //     state.imageUrl = constr.temperatures[0].constructions[0].obturators[0].imageUrl
            // }

            const temp = state.putgm?.temperatures.find(t => t.grap === payload)
            if (temp) {
                state.temp = temp.temps[0].id
                state.mod = temp.temps[0].mods[0]
            }
        },

        changeConstruction(state, payload: string) {
            state.construction = payload
            // const con = state.constructions.find(c => c.short === payload)
            // state.obturator = con?.obturators[0].short || ""
            // state.imageUrl = con?.obturators[0].imageUrl || ""
        },
        changeObturatoe(state, payload: IObturator) {
            state.obturator = payload.short
            state.imageUrl = payload.imageUrl
        },

        changeTemp(state, payload: string) {
            state.temp = payload
            const temps = state.putgm?.temperatures.find(t => t.grap === state.grap)
            const temp = temps?.temps.find(t => t.id === payload)
            if (!temp?.mods.includes(state.mod)) state.mod = temp?.mods[0] || ""

            // const constr = state.putgm?.construction.find(c => c.grap === state.grap)
            // const con = constr?.temperatures.find(t => t.temp === payload)

            // if (con) {
            //     state.constructions = con.constructions
            //     state.construction = con.constructions[0].short
            //     state.obturator = con.constructions[0].obturators[0].short
            //     state.imageUrl = con.constructions[0].obturators[0].imageUrl
            // }

            return state
        },
        changeMod(state, payload: string) {
            state.mod = payload
            const temp = state.putgm?.temperatures.find(t => t.grap === state.grap)
            let newTemp = ""
            temp?.temps.forEach(t => {
                if (t.mods.includes(payload)) {
                    if (t.id !== state.temp) newTemp = t.id
                }
            })
            if (newTemp) state.temp = newTemp

            // const constr = state.putgm?.construction.find(c => c.grap === state.grap)
            // const con = constr?.temperatures.find(t => t.temp === (newTemp || state.temp))

            // if (con) {
            //     state.constructions = con.constructions
            //     state.construction = con.constructions[0].short
            //     state.obturator = con.constructions[0].obturators[0].short
            //     state.imageUrl = con.constructions[0].obturators[0].imageUrl
            // }
            return state
        },
    },

    effects: dispatch => {
        const { putg, addit } = dispatch
        return {
            async getPutgImage(form: string) {
                try {
                    const res = await ReadService.getPutgImage(form)
                    putg.setPutgImage(res.data || [])
                } catch (error: any) {
                    toast.error("Не удалось загрузить чертежи")
                }
            },

            async getDefault() {
                putg.setLoading(true)
                console.log("getDefault")
                try {
                    const res = await ReadService.getDefaultPutg()
                    addit.setFl(res.fl)
                    addit.setAddit(res.addit)
                    addit.setTypeFl(res.typeFl)
                    putg.setPutgs(res.putg)
                    putg.setSizes(res!.sizes.sizes)
                    putg.setDns(res!.sizes.dn)
                    putg.setPutg(res.putg[0])
                    putg.setSize(res!.sizes.sizes[0])
                    putg.setDn(res!.sizes.sizes[0].dn)
                    putg.setPn(res!.sizes.sizes[0].pn.split(";")[0])
                    putg.setH(res!.sizes.sizes[0].h.split(";")[0])

                    putg.setFlange(res.fl[0].id)

                    putg.setConstructions(res.putg[0].construction[0].temperatures[0].constructions)
                    putg.setConstruction(
                        res.putg[0].construction[0].temperatures[0].constructions[0].short
                    )
                    putg.setObturator(
                        res.putg[0].construction[0].temperatures[0].constructions[0].obturators[0]
                            .short
                    )
                    putg.setImageUrl(
                        res.putg[0].construction[0].temperatures[0].constructions[0].obturators[0]
                            .imageUrl
                    )

                    putg.setGrap(res.putg[0].construction[0].grap)
                    putg.setTemp(res.putg[0].temperatures[0].temps[0].id)
                    putg.setMod(res.putg[0].temperatures[0].temps[0].mods[0])
                    // TODO по хорошему это надо поправить (у нас может не использоваться первый элемент в addit)
                    putg.setMoun(res.addit.mounting[0].title)
                    putg.setCoating(res.addit.coating[0].id)

                    putg.setRf(res.putg[0].reinforce.default)
                    putg.setOb(res.putg[0].obturator.default)
                    putg.setIl(res.putg[0].iLimiter.default)
                    putg.setOl(res.putg[0].oLimiter.default)
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
            async getAllSizes(req: ISizeReq) {
                putg.setFetching(true)
                try {
                    const res = await ReadService.getAllSize(req)
                    putg.setSizes(res.data.sizes || [])
                    putg.setDns(res.data.dn)
                    putg.setSize(res.data.sizes[0])
                } catch (error) {
                    toast.error("Не удалось загрузить размеры", { autoClose: false })
                } finally {
                    putg.setFetching(false)
                }
            },
            async getPutg({ flange, req }: { flange: string; req: IPutgReq }) {
                putg.setFetching(true)
                try {
                    const res = await ReadService.getPutg(req)

                    if (res.data === null) {
                        putg.setPutgs([])
                        putg.setPutg(null)
                        putg.setConstructions([])
                        putg.setForm(req.form)
                    } else {
                        putg.setFlange(flange)
                        putg.setPutg(res.data[0])
                        putg.setPutgs(res.data)
                        putg.setForm(res.data[0].form)

                        putg.setConstructions(
                            res.data[0].construction[0].temperatures[0].constructions
                        )
                        putg.setConstruction(
                            res.data[0].construction[0].temperatures[0].constructions[0].short
                        )
                        putg.setObturator(
                            res.data[0].construction[0].temperatures[0].constructions[0]
                                .obturators[0].short
                        )
                        putg.setImageUrl(
                            res.data[0].construction[0].temperatures[0].constructions[0]
                                .obturators[0].imageUrl
                        )

                        putg.setGrap(res.data[0].construction[0].grap)
                        putg.setTemp(res.data[0].temperatures[0].temps[0].id)
                        putg.setMod(res.data[0].temperatures[0].temps[0].mods[0])

                        putg.setRf(res.data[0].reinforce.default || "")
                        putg.setOb(res.data[0].obturator.default || "")
                        putg.setIl(res.data[0].iLimiter.default || "")
                        putg.setOl(res.data[0].oLimiter.default || "")
                    }
                } catch (error) {
                    toast.error("Не удалось загрузить данные", { autoClose: false })
                } finally {
                    putg.setFetching(false)
                }
            },
        }
    },
})
