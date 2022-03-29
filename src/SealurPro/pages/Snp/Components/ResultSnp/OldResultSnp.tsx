import { FC } from "react"
import { UseFormRegister } from "react-hook-form"
import { ResultBlock } from "../../../../components/ResultBlock/ResultBlock"
import { ISnpForm } from "../../../../types/snp"
import classes from "../../../style/pages.module.scss"

type Props = {
    values: ISnpForm
    register: UseFormRegister<ISnpForm>
}

export const ResultSnp: FC<Props> = ({ values, register }) => {
    const createDescr = (): string => {
        // const s = stfl.find(s => s.id === st)
        // let matname = ["", "", ""]
        // addit?.materials.split(";").forEach(m => {
        //     mat.forEach((mat, idx) => {
        //         if (m.split("@")[0] === mat) {
        //             matname[idx] = m.split("@")[1]
        //         }
        //     })
        // })
        // let rings
        // switch (type.value) {
        //     case "Д":
        //         rings = `(с наружным ${matname[2]} и внутренним ${matname[0]} ограничительными кольцами), с металлическим каркасом из ленты ${matname[1]}`
        //         break
        //     case "Г":
        //         rings = `(с наружным ограничительным кольцом ${matname[1]}), с металлическим каркасом из ленты ${matname[0]}`
        //         break
        //     case "В":
        //         rings = `(с внутренним ограничительным кольцом ${matname[0]}), с металлическим каркасом из ленты ${matname[1]}`
        //         break
        //     case "Б":
        //         rings = `(без ограничительных колец), с металлическим каркасом из ленты ${matname[0]}`
        //         break
        //     case "А":
        //         rings = `(без ограничительных колец), с металлическим каркасом из ленты ${matname[0]}`
        //         break
        // }
        // const fil = addit?.fillers.split(";")[+filler].split("@")[2]
        // let gr = ""
        // addit?.graphite.split(";").forEach(g => {
        //     if (g.split("@")[0] === grap) gr = g.split("@")[2]
        // })
        // const tfl = typeFl.find(typefl => typefl.id === curSnp?.typeFlId)
        // let sizes = ""
        // if (d4 !== "" && curSnp?.typePr !== "Г") sizes += d4 + "*"
        // sizes += `${d3}*${d2}`
        // if (d1 !== "") sizes += "*" + d1
        // let thick = thickness
        // if (thickness === "др.") thick = athic
        // let modif = ""
        // if (mod !== "0") {
        //     console.log(mod, addit?.mod.split(";"))
        //     let m = addit?.mod.split(";")[+mod].split("@")
        //     if (m) modif = `, с добавлением ${m[3]}`
        // }
        // let mount = ""
        // if (isMoun) mount = `, с фиксатором ${moun}`
        // let h = ""
        // if (holes) h = `, с отверстиями (по чертежу)`
        // let jum = ""
        // if (isJumper) {
        //     let width = ""
        //     if (jumpWidth !== "") width = ` шириной ${jumpWidth}мм`
        //     jum = `, с перемычкой типа ${jumper}${width}`
        // }
        // let res = `Спирально-навитая прокладка (СНП) по ${s?.stand} типа ${type.value} ${rings} и наполнителем из ${fil} ${gr}, для применения на фланце "${tfl?.title}" по ${s?.flange} с размерами ${sizes}, толщиной ${thick}мм${modif}${mount}${h}${jum}`
        // return res
        return ""
    }

    const createDesig = (): string => {
        let res: string = ""
        // const s = stfl.find(s => s.id === st)
        // const fil = addit?.fillers.split(";")[+filler].split("@")[0]
        // const py = pressure.split(" ")[0]
        // let thick = thickness
        // if (thickness === "др.") thick = athic
        // let mater = mat.join("")
        // if (mater === curSnp?.defMat?.replaceAll("&", "")) mater = ""
        // if (mater !== "") {
        //     if (type.value === "Г") mater = 0 + mater
        //     if (type.value === "В") mater += 0
        //     if (type.value === "Б" || type.value === "А") mater = 0 + mater + 0
        //     mater = "-" + mater
        // }
        // let modif = ""
        // let m = addit?.mod.split(";")[+mod].split("@")[2]
        // if (m) modif = `-${m}`
        // let mount = ""
        // if (isMoun) mount = `(${moun})`
        // if (holes) mount = `(черт.)`
        // if (isMoun && holes) mount = `(${moun}, черт.)`
        // let sizes = ""
        // if (d4 !== "" && curSnp?.typePr !== "Г") sizes += d4 + " x "
        // sizes += `${d3} x ${d2}`
        // if (d1 !== "") sizes += " x " + d1
        // switch (s?.standId) {
        //     case "1":
        //         res = `СНП-${type.value}-${fil}-${d2}-${py}-${thick}${mater}${modif}${mount} ${s.stand} [${sizes}]`
        //         break
        // }
        return res
    }

    return (
        <></>
        // <ResultBlock
        //     className={classes.resultContainer}
        //     description={createDescr()}
        //     designation={createDesig()}
        //     // register={register}
        // />
    )
}
