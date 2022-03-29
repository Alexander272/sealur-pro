import { FC } from "react"
import { Control, Controller, ControllerRenderProps, UseFormSetValue } from "react-hook-form"
import { useSelector } from "react-redux"
import { Graphite } from "../../../../../../components/Graphite/Graphite"
import { Select } from "../../../../../../../components/UI/Select/Select"
import { ProState } from "../../../../../../store/store"
import { ISNP, ISnpForm } from "../../../../../../types/snp"
import classes from "../../../../../style/pages.module.scss"

type Props = {
    values: ISnpForm
    snp: ISNP | null
    control: Control<ISnpForm, object>
    setValue: UseFormSetValue<ISnpForm>
}

const { Option } = Select

export const Fillers: FC<Props> = ({ values, snp, control, setValue }) => {
    // const addit = useSelector((state: ProState) => state.addit.addit)

    // const renderGrap = ({ field }: { field: ControllerRenderProps<ISnpForm, "grap"> }) => {
    //     return (
    //         <Graphite
    //             className={classes.group}
    //             classTitle={classes.titleGroup}
    //             onChange={field.onChange}
    //             value={field.value}
    //             grap={snp?.graphite || ""}
    //         />
    //     )
    // }

    // // синхронизация температуры с модифицирующим элементом и  наполнителя
    // const changeFiller = (onChange: (...event: any[]) => void) => (value: string) => {
    //     let tm = snp?.fillers.split(";").find(f => f.split("&")[0] === value) || ""
    //     tm = tm.replace(`${value}&`, "")
    //     console.log(tm)

    //     setValue("temp", tm.split(">")[0])
    //     setValue("mod", tm.split(">")[1].split(",")[0])
    //     onChange(value)
    // }
    // const renderFiller = ({ field }: { field: ControllerRenderProps<ISnpForm, "filler"> }) => {
    //     const fil = snp?.fillers.split(";")
    //     const fillers =
    //         addit?.fillers
    //             .split(";")
    //             .filter(f => fil?.findIndex(fil => fil.split("&")[0] === f.split("@")[0]) !== -1) ||
    //         []

    //     return (
    //         <Select value={field.value} onChange={changeFiller(field.onChange)}>
    //             {fillers.map(fil => {
    //                 const parts = fil.split("@")
    //                 return (
    //                     <Option key={parts[0]} value={parts[0]}>
    //                         {parts[0]} {parts[1]}
    //                     </Option>
    //                 )
    //             })}
    //         </Select>
    //     )
    // }

    // // синхронизация температуры и модифицирующего элемента
    // const changeTemp = (onChange: (...event: any[]) => void) => (value: string) => {
    //     let tm = snp?.fillers.split(";").find(f => f.includes(`${values.filler}&`)) || ""
    //     tm = tm.replace(`${values.filler}&`, "")
    //     tm.split("@").forEach(tm => {
    //         if (tm.split(">")[0] === value && !tm.split(">")[1].includes(values.mod)) {
    //             setValue("mod", tm.split(">")[1].split(",")[0])
    //         }
    //     })
    //     onChange(value)
    // }
    // const renderTemp = ({ field }: { field: ControllerRenderProps<ISnpForm, "temp"> }) => {
    //     let tm = snp?.fillers.split(";").find(f => f.split("&")[0] === values.filler) || ""
    //     tm = tm.replace(`${values.filler}&`, "")

    //     const fil = addit?.temperature.split(";") || []
    //     return (
    //         <Select value={field.value} onChange={changeTemp(field.onChange)}>
    //             {tm.split("@").map(t => {
    //                 const id = t.split(">")[0]
    //                 const parts = fil.find(f => f.split("@")[0] === id)?.split("@") || []
    //                 return (
    //                     <Option key={parts[0]} value={parts[0]}>
    //                         {parts[1]}
    //                     </Option>
    //                 )
    //             })}
    //         </Select>
    //     )
    // }

    // // синхронизация температуры и модифицирующего элемента
    // const changeMod = (onChange: (...event: any[]) => void) => (value: string) => {
    //     let tm = snp?.fillers.split(";").find(f => f.includes(`${values.filler}&`)) || ""
    //     tm = tm.replace(`${values.filler}&`, "")
    //     console.log(tm)

    //     tm.split("@").forEach(tm => {
    //         if (tm.split(">")[0] !== values.temp && tm.split(">")[1].includes(value)) {
    //             setValue("temp", tm.split(">")[0])
    //         }
    //     })
    //     onChange(value)
    // }
    // const renderMod = ({ field }: { field: ControllerRenderProps<ISnpForm, "mod"> }) => {
    //     let tm = snp?.fillers.split(";").find(f => f.split("&")[0] === values.filler) || ""
    //     tm = tm.replace(`${values.filler}&`, "")
    //     let mod: string[] = []

    //     tm.split("@").forEach(t => {
    //         const ids = t.split(">")[1].split(",")
    //         return ids.forEach(id => {
    //             mod.push(id)
    //         })
    //     })
    //     const m = addit?.mod.split(";") || []
    //     return (
    //         <Select value={field.value} onChange={changeMod(field.onChange)}>
    //             {mod.map(id => {
    //                 const parts = m.find(m => m.split("@")[0] === id)?.split("@") || []
    //                 return (
    //                     <Option key={parts[0]} value={parts[0]}>
    //                         {parts[1]}
    //                     </Option>
    //                 )
    //             })}
    //         </Select>
    //     )
    // }

    return (
        <>
            {/* <Controller name='grap' control={control} render={renderGrap} />
            <div className={classes.group}>
                <p className={classes.titleGroup}>Тип наполнителя</p>
                <Controller name='filler' control={control} render={renderFiller} />
            </div>
            <div className={classes.group}>
                <p className={classes.titleGroup}>Температура эксплуатации</p>
                <Controller name='temp' control={control} render={renderTemp} />
            </div>
            <div className={classes.group}>
                <p className={classes.titleGroup}>Модифицирующий элемент</p>
                <Controller name='mod' control={control} render={renderMod} />
            </div> */}
        </>
    )
}
