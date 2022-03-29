import { createModel } from "@rematch/core"
import { toast } from "react-toastify"
import { ProModel } from "."
import ReadService from "../../service/read"
import { IDn, ISize, ISizeReq } from "../../types/size"
import { ISNP, ISNPReq } from "../../types/snp"

interface ISnpState {
    loading: boolean
    fetching: boolean

    snps: ISNP[]
    sizes: ISize[]
    dns: IDn[]
    dn: string
    pn: string
    h: string
    oh: string
    s2: string
    s3: string

    snp: ISNP | null
    size: ISize | null

    st: string
    grap: string
    filler: string
    temp: string
    mod: string

    isJumper: boolean
    jumper: string
    jumWidth: string
    isHole: boolean
    isMoun: boolean
    moun: string

    ir: string
    or: string
    fr: string

    isOpenFr: boolean
    isOpenIr: boolean
    isOpenOr: boolean
}

export const snp = createModel<ProModel>()({
    state: {
        loading: true,
        fetching: false,

        snps: [],
        sizes: [],
        dns: [],
        dn: "",
        pn: "",
        h: "",
        oh: "",
        s2: "",
        s3: "",

        snp: null,
        size: null,

        st: "",
        grap: "",
        filler: "",
        temp: "",
        mod: "",

        isJumper: false,
        jumper: "A",
        jumWidth: "",
        isHole: false,
        isMoun: false,
        moun: "",

        ir: "",
        or: "",
        fr: "",

        isOpenFr: false,
        isOpenIr: false,
        isOpenOr: false,
    } as ISnpState,

    reducers: {
        setLoading(state, payload: boolean) {
            state.loading = payload
            return state
        },
        setFetching(state, payload: boolean) {
            state.fetching = payload
            return state
        },

        setSnps(state, payload: ISNP[]) {
            state.snps = payload
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
        setS2(state, payload: string) {
            state.s2 = payload
            return state
        },
        setS3(state, payload: string) {
            state.s3 = payload
            return state
        },

        setSnp(state, payload: ISNP | null) {
            state.snp = payload
            return state
        },
        setSize(state, payload: ISize | null) {
            state.size = payload
            return state
        },

        setSt(state, payload: string) {
            state.st = payload
            return state
        },
        setGrap(state, payload: string) {
            state.grap = payload
            return state
        },
        setFil(state, payload: string) {
            state.filler = payload
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

        setFr(state, payload: string) {
            state.fr = payload
            return state
        },
        setIr(state, payload: string) {
            state.ir = payload
            return state
        },
        setOr(state, payload: string) {
            state.or = payload
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
        setIsMoun(state, payload: boolean) {
            state.isMoun = payload
            return state
        },
        setMoun(state, payload: string) {
            state.moun = payload
            return state
        },

        setIsOpenFrame(state, payload: boolean) {
            state.isOpenFr = payload
            return state
        },
        setIsOpenIr(state, payload: boolean) {
            state.isOpenIr = payload
            return state
        },
        setIsOpenOr(state, payload: boolean) {
            state.isOpenOr = payload
            return state
        },

        changeSnp(state, payload: ISNP) {
            state.snp = payload
            if (payload.graphite[0] !== "*") {
                state.grap = payload.graphite[0]
            }

            const fil = payload.fillers[0].id
            const temp = payload.fillers[0].temps[0].id
            const mod = payload.fillers[0].temps[0].mods[0]
            state.filler = fil
            state.temp = temp
            state.mod = mod

            state.ir = payload.ir.default || ""
            state.or = payload.or.default || ""
            state.fr = payload.frame.default || ""
            return state
        },
        changeSize(state, payload: ISize) {
            state.size = payload
            state.dn = payload.dn
            state.h = payload.h.split(";")[0] || ""
            state.s2 = payload.s2?.split(";")[0] || ""
            state.s3 = payload.s3?.split(";")[0] || ""
            return state
        },
        changePn(state, payload: string) {
            state.pn = payload
            return state
        },
        changeH(state, payload: number) {
            if (payload === -1) {
                state.h = "др."
                state.s2 = ""
                state.s3 = ""
            } else {
                state.h = state.size?.h.split(";")[payload] || ""
                state.s2 = state.size?.s2?.split(";")[payload] || ""
                state.s3 = state.size?.s3?.split(";")[payload] || ""
            }

            return state
        },
        changeOH(state, payload: string) {
            state.oh = payload
            return state
        },

        changeFiller(state, payload: string) {
            state.filler = payload
            const fil = state.snp?.fillers.find(f => f.id === payload)
            state.temp = fil?.temps[0].id || ""
            state.mod = fil?.temps[0].mods[0] || ""
        },
        changeTemp(state, payload: string) {
            state.temp = payload
            const fil = state.snp?.fillers.find(f => f.id === state.filler)
            const temp = fil?.temps.find(t => t.id === payload)
            if (!temp?.mods.includes(state.mod)) state.mod = temp?.mods[0] || ""
        },
        changeMod(state, payload: string) {
            state.mod = payload
            const fil = state.snp?.fillers.find(f => f.id === state.filler)
            fil?.temps.forEach(t => {
                if (t.mods.includes(payload)) {
                    if (t.id !== state.temp) state.temp = t.id
                }
            })
        },
    },

    effects: dispatch => {
        const { snp, addit } = dispatch
        return {
            async getDefault() {
                snp.setLoading(true)
                console.log("getDefault")

                try {
                    const res = await ReadService.getDefault("snp")
                    addit.setStFl(res!.stfl)
                    addit.setAddit(res!.addit)
                    addit.setTypeFl(res!.typeFl)
                    snp.setSnps(res!.snp)
                    snp.setSizes(res!.sizes.sizes)
                    snp.setDns(res!.sizes.dn)

                    snp.setSnp(res!.snp[0])
                    snp.setSize(res!.sizes.sizes[0])
                    snp.setDn(res!.sizes.sizes[0].dn)
                    snp.setPn(res!.sizes.sizes[0].pn.split(";")[0])
                    snp.setH(res!.sizes.sizes[0].h.split(";")[0])
                    snp.setS2(res!.sizes.sizes[0].s2?.split(";")[0] || "")
                    snp.setS3(res!.sizes.sizes[0].s3?.split(";")[0] || "")

                    const grap =
                        res!.snp[0].graphite[0] === "*"
                            ? res!.addit?.graphite[0].short
                            : res!.snp[0].graphite[0]
                    const fil = res!.snp[0].fillers[0].id
                    const temp = res!.snp[0].fillers[0].temps[0].id
                    const mod = res!.snp[0].fillers[0].temps[0].mods[0]
                    snp.setGrap(grap || "")
                    snp.setFil(fil)
                    snp.setTemp(temp)
                    snp.setMod(mod)

                    snp.setMoun(res!.addit.mounting[0].title)

                    snp.setIr(res!.snp[0].ir.default)
                    snp.setOr(res!.snp[0].or?.default)
                    snp.setFr(res!.snp[0].frame?.default)

                    snp.setSt(res!.stfl[0].id)
                } catch (error) {
                    toast.error("Не удалось загрузить данные", { autoClose: false })
                } finally {
                    snp.setLoading(false)
                }
            },
            async getSizes(req: ISizeReq) {
                snp.setFetching(true)
                try {
                    const res = await ReadService.getSize(req)
                    snp.setSizes(res.data.sizes)
                    snp.setDns(res.data.dn)
                    snp.setSize(res.data.sizes[0])
                    snp.setDn(res.data.sizes[0].dn)
                    snp.setPn(res.data.sizes[0].pn.split(";")[0])
                    snp.setH(res.data.sizes[0].h.split(";")[0])
                    snp.setS2(res.data.sizes[0].s2?.split(";")[0] || "")
                    snp.setS3(res.data.sizes[0].s3?.split(";")[0] || "")
                } catch (error) {
                    toast.error("Не удалось загрузить размеры", { autoClose: false })
                } finally {
                    snp.setFetching(false)
                }
            },
            async getSnp({ st, req }: { st: string; req: ISNPReq }) {
                console.log(st, req)
                snp.setLoading(true)
                try {
                    const res = await ReadService.getSnp(req)
                    snp.setSt(st)
                    snp.setSnp(res.data[0])
                    snp.setSnps(res.data)

                    if (res.data[0].graphite[0] !== "*") {
                        snp.setGrap(res.data[0].graphite[0])
                    }

                    const fil = res.data[0].fillers[0].id
                    const temp = res.data[0].fillers[0].temps[0].id
                    const mod = res.data[0].fillers[0].temps[0].mods[0]
                    snp.setFil(fil)
                    snp.setTemp(temp)
                    snp.setMod(mod)

                    snp.setIr(res.data[0].ir.default || "")
                    snp.setOr(res.data[0].or.default || "")
                    snp.setFr(res.data[0].frame.default || "")
                } catch (error) {
                    toast.error("Не удалось загрузить данные", { autoClose: false })
                } finally {
                    snp.setLoading(false)
                }
            },
        }
    },
})
