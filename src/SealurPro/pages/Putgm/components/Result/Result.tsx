import { FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { ResultBlock } from "../../../../components/ResultBlock/ResultBlock"
import { Dispatch, ProState } from "../../../../store/store"
import { IResult } from "../../../../types/list"
import classes from "../../../style/pages.module.scss"

type Props = {}

export const Result: FC<Props> = () => {
    const graphite = useSelector((state: ProState) => state.addit.addit?.graphite) || []
    const flanges = useSelector((state: ProState) => state.addit.fl) || []
    // const constructions = useSelector((state: ProState) => state.addit.addit?.basis) || []
    const obturators = useSelector((state: ProState) => state.addit.addit?.pObturator) || []
    const materials = useSelector((state: ProState) => state.addit.addit?.materials) || []
    const sealant = useSelector((state: ProState) => state.addit.addit?.sealant) || []
    const mods = useSelector((state: ProState) => state.addit.addit?.mod) || []
    const coatings = useSelector((state: ProState) => state.addit.addit?.coating) || []
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const fl = useSelector((state: ProState) => state.putgm.flange)

    const putgm = useSelector((state: ProState) => state.putgm.putgm)
    const form = useSelector((state: ProState) => state.putgm.form)
    const grap = useSelector((state: ProState) => state.putgm.grap)
    const constructions = useSelector((state: ProState) => state.putgm.constructions)
    const construction = useSelector((state: ProState) => state.putgm.construction)
    const obturator = useSelector((state: ProState) => state.putgm.obturator)
    const mod = useSelector((state: ProState) => state.putgm.mod)
    const coating = useSelector((state: ProState) => state.putgm.coating)

    const notStand = useSelector((state: ProState) => state.putgm.notStand)

    const size = useSelector((state: ProState) => state.putgm.size)
    const h = useSelector((state: ProState) => state.putgm.h)
    const oh = useSelector((state: ProState) => state.putgm.oh)
    const dn = useSelector((state: ProState) => state.putgm.dn)
    const pn = useSelector((state: ProState) => state.putgm.pn)

    // const fr = useSelector((state: ProState) => state.putgm.rf)
    const basis = useSelector((state: ProState) => state.putgm.basis)
    const obt = useSelector((state: ProState) => state.putgm.obt)
    const seal = useSelector((state: ProState) => state.putgm.seal)

    const isMoun = useSelector((state: ProState) => state.putgm.isMoun)
    const moun = useSelector((state: ProState) => state.putgm.moun)
    const isJumper = useSelector((state: ProState) => state.putgm.isJumper)
    const jumper = useSelector((state: ProState) => state.putgm.jumper)
    const jumWidth = useSelector((state: ProState) => state.putgm.jumWidth)
    const isHole = useSelector((state: ProState) => state.putgm.isHole)
    // const isDetachable = useSelector((state: ProState) => state.putgm.isDetachable)
    const parts = useSelector((state: ProState) => state.putgm.parts)

    const drawing = useSelector((state: ProState) => state.putgm.drawing)

    const dispatch = useDispatch<Dispatch>()

    const resultHandler = (count: string, designation: string, description: string) => {
        let sizes = ""
        if (size?.d4) sizes += size.d4 + "x"
        sizes += `${size?.d3}x${size?.d2}`
        if (size?.d1) sizes += "x" + size.d1
        //TODO после сохранения нужно заменить id и чертеж
        const result: IResult = {
            id: "new",
            designation,
            sizes,
            count,
            drawing: drawing,
            description,
        }
        //TODO надо сохранять это все в бд (и куда-то сохранять чертеж)
        dispatch.list.addResult(result)
        toast.success("Прокладка добавлена")
        dispatch.putgm.setDrawing(null)
    }

    const createDescr = (): string => {
        let f = ""
        if (form !== "Round") {
            form === "Oval" ? (f = "овальной формы ") : (f = "прямоугольной формы ")
        }

        // const gr = graphite.find(g => g.short === grap)?.description

        // const constr = constructions.find(c => c.short === construction)
        // let c = ""
        let bas = ""
        let ob = ""
        materials.forEach(m => {
            if (m.short === basis) bas = m.title
            if (m.short === obt) ob = m.title
        })

        // c = constr?.title || ""

        let mn = ""
        if (construction.includes("&")) {
            mn = `многослойном (${parts} слоя) `
        }

        let mat = obturators.find(o => o.short === obturator)?.forDescr || ""
        mat = mat.replace("&", ob)

        let s = sealant.find(s => s.id === seal)?.forDescr || ""

        const tfl = typeFl.find(t => t.id === putgm?.typeFlId)
        let sizes = ""
        if (size?.d4) sizes += size.d4 + "x"
        sizes += `${size?.d3}x${size?.d2}`
        if (size?.d1) sizes += "x" + size.d1
        let thick = h
        if (h === "др.") thick = oh

        let findCoat = coatings.find(c => c.id === coating)?.description
        let coat = findCoat ? `, ${findCoat}` : ""
        let m = mods.find(m => m.id === mod)?.description
        let modif = m ? `, с добавлением ${m}` : ""
        let mount = isMoun ? `, с фиксатором ${moun}` : ""
        let hole = isHole ? `, с отверстиями (по чертежу)` : ""
        let width = jumWidth !== "" ? ` шириной ${jumWidth}мм` : ""
        let jum = isJumper ? `, с перемычкой типа ${jumper}${width}` : ""
        let ns = notStand ? " нестандартными" : ""

        let res = `Прокладка ${f}на ${mn}металлическом волновом основании из стали ${bas}, ${mat}, ${s}, для применения на фланцах с уплотнительной поверхностью "${
            tfl?.title
        }", DN = ${dn}, PN = ${
            pn.split(" ")[0]
        }${coat}${modif}${mount}${hole}${jum}, с${ns} размерами ${sizes} и толщиной ${thick}`
        return res
    }

    const createDesig = (): string => {
        const tfl = typeFl.find(t => t.id === putgm?.typeFlId)
        let isDef = true
        let b = ""
        let ob = ""
        let s = ""
        if (obt && putgm?.obturator.obturators.includes(obturator)) {
            if (obt !== putgm?.obturator.default) isDef = false
            ob = obt
        } else ob = "0"
        if (basis && putgm?.basis.obturators.includes(obturator)) {
            if (basis !== putgm?.basis.default) isDef = false
            b = basis
        } else b = "0"

        let con = constructions.find(c => c.basis === construction)
        let obts = con?.obturator.find(o => o.obturator === obturator)
        if (obts?.sealant[0].seal !== seal || !isDef) {
            isDef = false
            s = sealant.find(s => s.id === seal)?.short || ""
        }

        let mat = !isDef ? `-${b}${ob}${s}` : ""

        let sizes = ""
        if (size?.d4) sizes += size.d4 + "x"
        sizes += `${size?.d3}x${size?.d2}`
        if (size?.d1) sizes += "x" + size.d1

        let thick = h
        if (h === "др.") thick = oh

        const py = pn.split(" ")[0]

        let jum = isJumper ? (jumWidth ? `(${jumper}/${jumWidth})` : `(${jumper})`) : ""
        let m = mods.find(m => m.id === mod)?.short
        let modif = m ? `-${m}` : ""

        let elems = []
        if (isMoun) elems.push(moun)
        if (isHole) elems.push("черт.")
        let findCoat = coatings.find(c => c.id === coating)?.short
        if (findCoat) elems.push(findCoat)
        let elem = elems.length ? ` (${elems.join(", ")})` : ""

        let mn = construction
        if (construction.includes("&")) {
            mn = mn.replace("&", parts)
        }

        let res = `ПУТГм-${tfl?.short}-${mn}-${obturator}-${dn}-${py}-${thick}${jum}${mat}${modif}${elem} [${sizes}]`
        if (["3", "4", "5"].includes(fl)) {
            const st = flanges.find(f => f.id === fl)
            res = `ПУТГм-${
                tfl?.short
            }-${mn}-${obturator}-${dn}"-${pn}#-${thick}${jum}${mat}${modif}${elem} ${
                st?.title === "ASME B 16.5" ? "ASME B 16.21" : st?.title
            } [${sizes}]`
        }
        if (form !== "Round" || notStand) {
            let ns = notStand ? " [нестанд.]" : ""
            res = `ПУТГм-${tfl?.short}-${mn}-${obturator}-${sizes}-${thick}${jum}${mat}${modif}${elem}${ns}`
        }
        return res
    }

    return (
        <ResultBlock
            className={classes.resultContainer}
            description={createDescr()}
            designation={createDesig()}
            addDesignation={resultHandler}
        />
    )
}
