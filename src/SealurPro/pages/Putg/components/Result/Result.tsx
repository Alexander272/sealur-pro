import { FC } from "react"
import { useSelector } from "react-redux"
import { ResultBlock } from "../../../../components/ResultBlock/ResultBlock"
import { ProState } from "../../../../store/store"
import classes from "../../../style/pages.module.scss"

type Props = {}

export const Result: FC<Props> = () => {
    const graphite = useSelector((state: ProState) => state.addit.addit?.graphite) || []
    const constructions = useSelector((state: ProState) => state.addit.addit?.construction) || []
    const obturators = useSelector((state: ProState) => state.addit.addit?.obturator) || []
    const materials = useSelector((state: ProState) => state.addit.addit?.materials) || []
    const mods = useSelector((state: ProState) => state.addit.addit?.mod) || []
    const coatings = useSelector((state: ProState) => state.addit.addit?.coating) || []
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const putg = useSelector((state: ProState) => state.putg.putg)
    const form = useSelector((state: ProState) => state.putg.form)
    const grap = useSelector((state: ProState) => state.putg.grap)
    const construction = useSelector((state: ProState) => state.putg.construction)
    const obturator = useSelector((state: ProState) => state.putg.obturator)
    const mod = useSelector((state: ProState) => state.putg.mod)
    const coating = useSelector((state: ProState) => state.putg.coating)

    const size = useSelector((state: ProState) => state.putg.size)
    const h = useSelector((state: ProState) => state.putg.h)
    const oh = useSelector((state: ProState) => state.putg.oh)

    const fr = useSelector((state: ProState) => state.putg.rf)
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

    const resultHandler = (count: string, designation: string, description: string) => {
        // let sizes = designation.split("[")[1].split("]")[0]
        // //TODO после сохранения нужно заменить id и чертеж
        // const result: IResult = {
        //     id: "new",
        //     designation,
        //     sizes,
        //     count,
        //     description,
        // }
        // //TODO надо сохранять это все в бд (и куда-то сохранять чертеж)
        // dispatch.list.addResult(result)
        // toast.success("Прокладка добавлена")
    }

    const createDescr = (): string => {
        let f = ""
        if (form !== "Round") {
            form === "Oval" ? (f = "овальной формы ") : (f = "прямоугольной формы ")
        }

        const gr = graphite.find(g => g.short === grap)?.description

        const constr = constructions.find(c => c.short === construction)
        let c = ""
        let reinforce = ""
        let obt = ""
        let iLimiter = ""
        let oLimiter = ""
        materials.forEach(m => {
            if (m.short === fr) reinforce = m.title
            if (m.short === ob) obt = m.title
            if (m.short === il) iLimiter = m.title
            if (m.short === ol) oLimiter = m.title
        })

        if (constr?.isHaveMaterial) {
            c = `${constr.title} марки ${reinforce}`
        } else c = constr?.title || ""

        let mat = obturators.find(o => o.short === obturator)?.forDescr || ""
        let i = 0
        while (mat.includes("&")) {
            switch (i) {
                case 0:
                    mat = mat.replace("&", reinforce)
                    break
                case 1:
                    mat = mat.replace("&", obt)
                    break
                case 2:
                    mat = mat.replace("&", iLimiter)
                    break
                case 3:
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

        let modif = ""
        let m = mods.find(m => m.id === mod)?.description
        if (m) modif = `, с добавлением ${m}`

        let mount = isMoun ? `, с фиксатором ${moun}` : ""

        let hole = isHole ? `, с отверстиями (по чертежу)` : ""

        let jum = ""
        if (isJumper) {
            let width = ""
            if (jumWidth !== "") width = ` шириной ${jumWidth}мм`
            jum = `, с перемычкой типа ${jumper}${width}`
        }

        let det = isDetachable ? `, разъемная (количество частей - ${parts})` : ""

        let res = `Прокладка ${f}из терморасширенного графита (ТРГ ${gr}), ${c}, ${mat}, для уплотнения фланцевой поверхности исполнения "${tfl?.title}"${coat}${modif}${mount}${hole}${jum}${det}, с размерами ${sizes}`
        return res
    }

    const createDesig = (): string => {
        const tfl = typeFl.find(t => t.id === putg?.typeFlId)

        let sizes = ""
        if (size?.d4) sizes += size.d4 + "x"
        sizes += `${size?.d3}x${size?.d2}`
        if (size?.d1) sizes += "x" + size.d1
        let thick = h
        if (h === "др.") thick = oh
        sizes += "-" + thick

        let res = `ПУТГ-${tfl?.short}-${construction}-${obturator}-${sizes}`

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
