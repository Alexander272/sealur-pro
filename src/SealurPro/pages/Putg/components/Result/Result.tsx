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
    const constructions = useSelector((state: ProState) => state.addit.addit?.construction) || []
    const obturators = useSelector((state: ProState) => state.addit.addit?.obturator) || []
    const materials = useSelector((state: ProState) => state.addit.addit?.materials) || []
    const mods = useSelector((state: ProState) => state.addit.addit?.mod) || []
    const coatings = useSelector((state: ProState) => state.addit.addit?.coating) || []
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const fl = useSelector((state: ProState) => state.putg.flange)

    const putg = useSelector((state: ProState) => state.putg.putg)
    const form = useSelector((state: ProState) => state.putg.form)
    const grap = useSelector((state: ProState) => state.putg.grap)
    const construction = useSelector((state: ProState) => state.putg.construction)
    const obturator = useSelector((state: ProState) => state.putg.obturator)
    const mod = useSelector((state: ProState) => state.putg.mod)
    const coating = useSelector((state: ProState) => state.putg.coating)

    const notStand = useSelector((state: ProState) => state.putg.notStand)

    const size = useSelector((state: ProState) => state.putg.size)
    const h = useSelector((state: ProState) => state.putg.h)
    const oh = useSelector((state: ProState) => state.putg.oh)
    const dn = useSelector((state: ProState) => state.putg.dn)
    const pn = useSelector((state: ProState) => state.putg.pn)

    // const fr = useSelector((state: ProState) => state.putg.rf)
    const ob = useSelector((state: ProState) => state.putg.ob)
    const il = useSelector((state: ProState) => state.putg.il)
    const ol = useSelector((state: ProState) => state.putg.ol)

    const isMoun = useSelector((state: ProState) => state.putg.isMoun)
    const moun = useSelector((state: ProState) => state.putg.moun)
    const isJumper = useSelector((state: ProState) => state.putg.isJumper)
    const jumper = useSelector((state: ProState) => state.putg.jumper)
    const jumWidth = useSelector((state: ProState) => state.putg.jumWidth)
    const isHole = useSelector((state: ProState) => state.putg.isHole)
    const isDetachable = useSelector((state: ProState) => state.putg.isDetachable)
    const parts = useSelector((state: ProState) => state.putg.parts)

    const drawing = useSelector((state: ProState) => state.putg.drawing)

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
            drawing,
            description,
        }
        //TODO надо сохранять это все в бд (и куда-то сохранять чертеж)
        dispatch.list.addResult(result)
        toast.success("Прокладка добавлена")

        //TODO надо как минимум чистить чертеж
    }

    const createDescr = (): string => {
        let f = ""
        if (form !== "Round") {
            form === "Oval" ? (f = "овальной формы ") : (f = "прямоугольной формы ")
        }

        const gr = graphite.find(g => g.short === grap)?.description

        const constr = constructions.find(c => c.short === construction)
        let c = ""
        // let reinforce = ""
        let obt = ""
        let iLimiter = ""
        let oLimiter = ""
        materials.forEach(m => {
            // if (m.short === fr) reinforce = m.title
            if (m.short === ob) obt = m.title
            if (m.short === il) iLimiter = m.title
            if (m.short === ol) oLimiter = m.title
        })

        // if (constr?.isHaveMaterial) {
        //     c = `${constr.title} марки ${reinforce}`
        // } else
        c = constr?.title || ""

        let mat = obturators.find(o => o.short === obturator)?.forDescr || ""
        let i = 0
        while (mat.includes("&")) {
            switch (i) {
                case 0:
                    mat = mat.replace("&", obt)
                    break
                case 1:
                    mat = mat.replace("&", iLimiter)
                    break
                case 2:
                    mat = mat.replace("&", oLimiter)
                    break
            }
            i++
        }

        const tfl = typeFl.find(t => t.id === putg?.typeFlId)

        let sizes = ""
        if (size?.d4) sizes += size.d4 + "x"
        sizes += `${size?.d3}x${size?.d2}`
        if (size?.d1) sizes += "x" + size.d1
        let thick = h
        if (h === "др.") thick = oh
        sizes += "x" + thick

        let findCoat = coatings.find(c => c.id === coating)?.description
        let coat = findCoat ? `, ${findCoat}` : ""

        let m = mods.find(m => m.id === mod)?.description
        let modif = m ? `, с добавлением ${m}` : ""

        let mount = isMoun ? `, с фиксатором ${moun}` : ""

        let hole = isHole ? `, с отверстиями (по чертежу)` : ""

        let width = jumWidth !== "" ? ` шириной ${jumWidth}мм` : ""
        let jum = isJumper ? `, с перемычкой типа ${jumper}${width}` : ""

        let det = isDetachable ? `, разъемная (количество частей - ${parts})` : ""

        let ns = notStand ? " нестандартными" : ""

        let res = `Прокладка ${f}из терморасширенного графита (ТРГ ${gr}), ${c}, ${mat}, для уплотнения фланцевой поверхности исполнения "${tfl?.title}"${coat}${modif}${mount}${hole}${jum}${det}, с${ns} размерами ${sizes}`
        return res
    }

    const createDesig = (): string => {
        const tfl = typeFl.find(t => t.id === putg?.typeFlId)

        let isDef = true
        let obt = ""
        let ilim = ""
        let olim = ""
        if (ob && putg?.obturator.obturators.includes(obturator)) {
            if (ob !== putg?.obturator.default) isDef = false
            obt = ob
        } else obt = "0"
        if (il && putg?.iLimiter.obturators.includes(obturator)) {
            if (il !== putg?.iLimiter.default) isDef = false
            ilim = il
        } else ilim = "0"
        if (ol && putg?.oLimiter.obturators.includes(obturator)) {
            if (ol !== putg?.oLimiter.default) isDef = false
            olim = ol
        } else olim = "0"

        let mat = !isDef ? `-${ilim}${obt}${olim}` : ""

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
        if (isDetachable) elems.push(`${parts} сегм.`)
        if (isHole) elems.push("черт.")
        let findCoat = coatings.find(c => c.id === coating)?.short
        if (findCoat) elems.push(findCoat)

        let elem = elems.length ? ` (${elems.join(", ")})` : ""

        let res = `ПУТГ-${tfl?.short}-${construction}-${obturator}-${dn}-${py}-${thick}${jum}${mat}${modif}${elem} [${sizes}]`
        if (["3", "4", "5"].includes(fl)) {
            const st = flanges.find(f => f.id === fl)
            res = `ПУТГ-${
                tfl?.short
            }-${construction}-${obturator}-${dn}"-${pn}#-${thick}${jum}${mat}${modif}${elem} ${
                st?.title === "ASME B 16.5" ? "ASME B 16.21" : st?.title
            } [${sizes}]`
        }

        if (form !== "Round" || notStand) {
            let ns = notStand ? " [нестанд.]" : ""
            res = `ПУТГ-${tfl?.short}-${construction}-${obturator}-${sizes}-${thick}${jum}${mat}${modif}${elem}${ns}`
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
