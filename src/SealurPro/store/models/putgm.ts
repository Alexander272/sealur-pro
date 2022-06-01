import { createModel } from "@rematch/core"
import { toast } from "react-toastify"
import { ProModel } from "."
import ReadService from "../../service/read"
import { IDrawing } from "../../types/drawing"
import { IPUTGM, IBasis, IPutgmImage, IPutgmReq } from "../../types/putgm"
import { IDn, ISize, ISizeReq } from "../../types/size"

interface IPutgmState {
    loading: boolean
    fetching: boolean
    error: boolean

    putgmImage: IPutgmImage[]
    form: "Round" | "Oval" | "Rectangular"

    drawing: IDrawing | null

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

    constructions: IBasis[]

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

        putgmImage: [],
        form: "Round",

        drawing: null,
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

        setPutgmImage(state, payload: IPutgmImage[]) {
            state.putgmImage = payload
            return state
        },
        setForm(state, payload: "Round" | "Oval" | "Rectangular") {
            state.form = payload
            return state
        },

        setDrawing(state, payload: IDrawing | null) {
            state.drawing = payload
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

        setOnlyConstructions(state, payload: IBasis[]) {
            state.constructions = payload
            return state
        },
        setConstructions(state, payload: IBasis[]) {
            state.constructions = payload
            state.construction = payload[0]?.basis || ""
            state.obturator = payload[0]?.obturator[0]?.obturator || ""
            state.seal = payload[0]?.obturator[0]?.sealant[0].seal || ""
            state.imageUrl = payload[0]?.obturator[0]?.sealant[0].imageUrl || ""
            return state
        },
        setConstruction(state, payload: string) {
            state.construction = payload
            return state
        },
        setObturator(state, payload: string) {
            state.obturator = payload
            return state
        },
        setSeal(state, payload: string) {
            state.seal = payload
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

        setBasis(state, payload: string) {
            state.basis = payload
            return state
        },
        setObt(state, payload: string) {
            state.obt = payload
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

        changePutgm(state, payload: IPUTGM) {
            state.putgm = payload
            state.grap = payload.graphite[0]

            state.constructions = payload.construction[0].basis
            state.construction = payload.construction[0].basis[0].basis
            state.obturator = payload.construction[0].basis[0].obturator[0].obturator
            state.seal = payload.construction[0].basis[0].obturator[0].sealant[0].seal
            state.imageUrl = payload.construction[0].basis[0].obturator[0].sealant[0].imageUrl

            state.temp = payload.temperatures[0].temps[0].id
            state.mod = payload.temperatures[0].temps[0].mods[0]

            state.basis = payload.basis.default
            state.obt = payload.obturator.default

            if (payload.coating[0] !== "*") state.coating = payload.coating[0]

            return state
        },
        changeSize(state, payload: ISize) {
            state.size = payload
            state.dn = payload.dn
            state.h = payload.h.split(";")[0] || ""
            return state
        },
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

            const temp = state.putgm?.temperatures.find(t => t.grap === payload)
            if (temp) {
                state.temp = temp.temps[0].id
                state.mod = temp.temps[0].mods[0]
            }
        },

        changeConstruction(state, payload: string) {
            state.construction = payload
            const con = state.constructions.find(c => c.basis === payload)
            state.obturator = con?.obturator[0]?.obturator || ""
            state.seal = con?.obturator[0]?.sealant[0]?.seal || ""
            state.imageUrl = con?.obturator[0]?.sealant[0]?.imageUrl || ""
        },

        changeTemp(state, payload: string) {
            state.temp = payload
            const temps = state.putgm?.temperatures.find(t => t.grap === state.grap)
            const temp = temps?.temps.find(t => t.id === payload)
            if (!temp?.mods.includes(state.mod)) state.mod = temp?.mods[0] || ""

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

            return state
        },
    },

    effects: dispatch => {
        const { putgm, addit } = dispatch
        return {
            async getPutgmImage(form: string) {
                try {
                    const res = await ReadService.getPutgmImage(form)
                    putgm.setPutgmImage(res.data || [])
                } catch (error: any) {
                    toast.error("Не удалось загрузить чертежи")
                }
            },

            async getDefault() {
                putgm.setLoading(true)
                console.log("getDefault")
                try {
                    const res = await ReadService.getDefaultPutgm()
                    addit.setFl(res.fl)
                    addit.setAddit(res.addit)
                    addit.setTypeFl(res.typeFl)
                    putgm.setPutgms(res.putgm)
                    putgm.setSizes(res!.sizes.sizes)
                    putgm.setDns(res!.sizes.dn)
                    putgm.setPutgm(res.putgm[0])

                    putgm.setFlange(res.fl[0].id)

                    putgm.setConstructions(res.putgm[0].construction[0].basis)
                    putgm.setConstruction(res.putgm[0].construction[0].basis[0].basis)
                    putgm.setObturator(res.putgm[0].construction[0].basis[0].obturator[0].obturator)
                    putgm.setSeal(
                        res.putgm[0].construction[0].basis[0].obturator[0].sealant[0].seal
                    )
                    putgm.setImageUrl(
                        res.putgm[0].construction[0].basis[0].obturator[0].sealant[0].imageUrl
                    )

                    putgm.setGrap(res.putgm[0].construction[0].grap)
                    putgm.setTemp(res.putgm[0].temperatures[0].temps[0].id)
                    putgm.setMod(res.putgm[0].temperatures[0].temps[0].mods[0])
                    // TODO по хорошему это надо поправить (у нас может не использоваться первый элемент в addit)
                    putgm.setMoun(res.addit.mounting[0].title)
                    putgm.setCoating(res.addit.coating[0].id)

                    putgm.setBasis(res.putgm[0].basis.default)
                    putgm.setObt(res.putgm[0].obturator.default)
                } catch (error) {
                    putgm.setError(true)
                    toast.error("Не удалось загрузить данные", { autoClose: false })
                } finally {
                    putgm.setLoading(false)
                }
            },
            async getSizes(req: ISizeReq) {
                putgm.setFetching(true)
                try {
                    const res = await ReadService.getSize(req)

                    if (!res.data.sizes) {
                        putgm.setSizes([])
                        putgm.setDns([])
                        putgm.setSize(null)
                    } else {
                        putgm.setSizes(res.data.sizes)
                        putgm.setDns(res.data.dn)
                        putgm.setSize(res.data.sizes[0])
                        putgm.setDn(res.data.sizes[0].dn)
                        putgm.setPn(res.data.sizes[0].pn.split(";")[0])
                        putgm.setH(res.data.sizes[0].h.split(";")[0])
                    }
                } catch (error) {
                    toast.error("Не удалось загрузить размеры", { autoClose: false })
                } finally {
                    putgm.setFetching(false)
                }
            },
            async getAllSizes(req: ISizeReq) {
                putgm.setFetching(true)
                try {
                    const res = await ReadService.getAllSize(req)
                    putgm.setSizes(res.data.sizes || [])
                    putgm.setDns(res.data.dn)
                    putgm.setSize(res.data.sizes[0])
                } catch (error) {
                    toast.error("Не удалось загрузить размеры", { autoClose: false })
                } finally {
                    putgm.setFetching(false)
                }
            },
            async getPutgm({ flange, req }: { flange: string; req: IPutgmReq }, state) {
                putgm.setFetching(true)
                try {
                    const res = await ReadService.getPutgm(req)

                    if (res.data === null) {
                        putgm.setPutgms([])
                        putgm.setPutgm(null)
                        putgm.setConstructions([])
                        putgm.setForm(req.form)
                        if (state.putgm.flange === "") putgm.setFlange(flange)
                    } else {
                        putgm.setFlange(flange)
                        putgm.setPutgm(res.data[0])
                        putgm.setPutgms(res.data)
                        putgm.setForm(res.data[0].form)

                        putgm.setConstructions(res.data[0].construction[0].basis)
                        putgm.setConstruction(res.data[0].construction[0].basis[0].basis)
                        putgm.setObturator(
                            res.data[0].construction[0].basis[0].obturator[0].obturator
                        )
                        putgm.setSeal(
                            res.data[0].construction[0].basis[0].obturator[0].sealant[0].seal
                        )
                        putgm.setImageUrl(
                            res.data[0].construction[0].basis[0].obturator[0].sealant[0].imageUrl
                        )

                        putgm.setGrap(res.data[0].construction[0].grap)
                        putgm.setTemp(res.data[0].temperatures[0].temps[0].id)
                        putgm.setMod(res.data[0].temperatures[0].temps[0].mods[0])

                        putgm.setBasis(res.data[0].basis.default)
                        putgm.setObt(res.data[0].obturator.default)
                    }
                } catch (error) {
                    toast.error("Не удалось загрузить данные", { autoClose: false })
                } finally {
                    putgm.setFetching(false)
                }
            },
        }
    },
})
