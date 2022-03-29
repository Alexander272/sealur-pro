import { FC } from "react"
import { useSelector } from "react-redux"
import { ResultBlock } from "../../../../components/ResultBlock/ResultBlock"
import { ProState } from "../../../../store/store"
import classes from "../../../style/pages.module.scss"

type Props = {}

export const ResultSnp: FC<Props> = () => {
    const stfl = useSelector((state: ProState) => state.addit.stfl)
    const materials = useSelector((state: ProState) => state.addit.addit?.materials) || []
    const fillers = useSelector((state: ProState) => state.addit.addit?.fillers) || []
    const graphite = useSelector((state: ProState) => state.addit.addit?.graphite) || []
    const mods = useSelector((state: ProState) => state.addit.addit?.mod) || []
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const snp = useSelector((state: ProState) => state.snp.snp)
    const size = useSelector((state: ProState) => state.snp.size)
    const st = useSelector((state: ProState) => state.snp.st)

    const grap = useSelector((state: ProState) => state.snp.grap)
    const filler = useSelector((state: ProState) => state.snp.filler)
    const mod = useSelector((state: ProState) => state.snp.mod)

    const pn = useSelector((state: ProState) => state.snp.pn)

    const h = useSelector((state: ProState) => state.snp.h)
    const oh = useSelector((state: ProState) => state.snp.oh)

    const fr = useSelector((state: ProState) => state.snp.fr)
    const ir = useSelector((state: ProState) => state.snp.ir)
    const or = useSelector((state: ProState) => state.snp.or)

    const isMoun = useSelector((state: ProState) => state.snp.isMoun)
    const moun = useSelector((state: ProState) => state.snp.moun)
    const isJumper = useSelector((state: ProState) => state.snp.isJumper)
    const jumper = useSelector((state: ProState) => state.snp.jumper)
    const jumWidth = useSelector((state: ProState) => state.snp.jumWidth)
    const isHole = useSelector((state: ProState) => state.snp.isHole)

    const changeCountHandler = (event: React.ChangeEvent<HTMLInputElement>) => {}

    const createDescr = (): string => {
        const s = stfl.find(s => s.id === st)

        let matFr = ""
        let matIr = ""
        let matOr = ""
        materials.forEach(m => {
            if (m.short === fr) matFr = m.title
            if (m.short === ir) matIr = m.title
            if (m.short === or) matOr = m.title
        })

        let rings
        switch (snp?.typePr) {
            case "Д":
                rings = `(с наружным ${matOr} и внутренним ${matIr} ограничительными кольцами), с металлическим каркасом из ленты ${matFr}`
                break
            case "Г":
                rings = `(с наружным ограничительным кольцом ${matOr}), с металлическим каркасом из ленты ${matFr}`
                break
            case "В":
                rings = `(с внутренним ограничительным кольцом ${matIr}), с металлическим каркасом из ленты ${matFr}`
                break
            case "Б":
                rings = `(без ограничительных колец), с металлическим каркасом из ленты ${matFr}`
                break
            case "А":
                rings = `(без ограничительных колец), с металлическим каркасом из ленты ${matFr}`
                break
        }
        const fil = fillers.find(f => f.short === filler)?.description

        const gr = graphite.find(g => g.short === grap)?.description

        const tfl = typeFl.find(t => t.id === snp?.typeFlId)

        let sizes = ""
        if (size?.d4 && snp?.typePr !== "Г") sizes += size.d4 + "*"
        sizes += `${size!.d3}*${size!.d2}`
        if (size?.d1) sizes += "*" + size.d1

        let thick = h
        if (h === "др.") thick = oh

        let modif = ""
        if (mod !== "0") {
            let m = mods.find(m => m.id === mod)?.description
            if (m) modif = `, с добавлением ${m}`
        }
        let mount = ""
        if (isMoun) mount = `, с фиксатором ${moun}`

        let hole = ""
        if (isHole) hole = `, с отверстиями (по чертежу)`

        let jum = ""
        if (isJumper) {
            let width = ""
            if (jumWidth !== "") width = ` шириной ${jumWidth}мм`
            jum = `, с перемычкой типа ${jumper}${width}`
        }
        let res = `Спирально-навитая прокладка (СНП) по ${s?.stand} типа ${snp?.typePr} ${rings} и наполнителем из ${fil} ${gr}, для применения на фланце "${tfl?.title}" по ${s?.flange} с размерами ${sizes}, толщиной ${thick}мм${modif}${mount}${hole}${jum}`
        return res
    }

    const createDesig = (): string => {
        let res: string = ""
        const s = stfl.find(s => s.id === st)

        const py = pn.split(" ")[0]

        let thick = h
        if (h === "др.") thick = oh

        let mater = ""
        let isDef = true
        if (ir) {
            if (ir !== snp?.ir.default) isDef = false
        }
        if (or) {
            if (or !== snp?.or.default) isDef = false
        }
        if (fr) {
            if (fr !== snp?.frame.default) isDef = false
        }

        if (!isDef) {
            mater = ` ${ir || "0"}${fr}${or || "0"}`
        }

        let modif = ""
        if (mod !== "0") {
            let m = mods.find(m => m.id === mod)?.title
            if (m) modif = `-${m}`
        }

        let mount = ""
        if (isMoun) mount = ` (${moun})`
        if (isHole) mount = ` (черт.)`
        if (isMoun && isHole) mount = ` (${moun}, черт.)`

        let sizes = ""
        if (size?.d4 && snp?.typePr !== "Г") sizes += size.d4 + "x"
        sizes += `${size?.d3}x${size?.d2}`
        if (size?.d1) sizes += "x" + size.d1

        switch (s?.standId) {
            case "1":
                res = `СНП-${snp?.typePr}-${filler}-${size?.d2}-${py}-${thick}${mater}${modif}${mount} ${s.stand} [${sizes}]`
                break
        }
        return res
    }

    return (
        <ResultBlock
            className={classes.resultContainer}
            value={"10"}
            changeCount={changeCountHandler}
            description={createDescr()}
            designation={createDesig()}
        />
    )
}
