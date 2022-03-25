import { FC, useEffect, useState } from "react"
import {
    Control,
    Controller,
    ControllerRenderProps,
    UseFormRegister,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form"
import { Input } from "../../../../../components/UI/Input/Input"
import { Select } from "../../../../../components/UI/Select/Select"
import { IDn, ISize } from "../../../../../types/size"
import { ISnpForm } from "../../../../../types/snp"
import { Excretion } from "./components/Excretion/Excretion"
import { Sizes } from "./components/Sizes/Sizes"
import classes from "../../../style/pages.module.scss"

const { Option } = Select

type Props = {
    sizes: ISize[]
    dn: IDn[]
    // values: ISnpForm
    watch: UseFormWatch<ISnpForm>
    control: Control<ISnpForm, object>
    setValue: UseFormSetValue<ISnpForm>
    register: UseFormRegister<ISnpForm>
}

const imgUrls = {
    Д: "/image/snp/SNP-P-E.webp",
    Г: "/image/snp/SNP-P-D.webp",
    В: "/image/snp/SNP-P-C.webp",
    Б: "/image/snp/SNP-P-AB.webp",
    А: "/image/snp/SNP-P-AB.webp",
}

export const SizeSnp: FC<Props> = ({ sizes, dn, watch, control, setValue, register }) => {
    const [d2, setD2] = useState<number[]>([])

    const values = watch(["st", "dn", "pn", "h", "typePr"])

    // заполнение D2 для стандартов где он используется
    useEffect(() => {
        if (values[0] === "1" || values[0] === "2") {
            const d2 = new Set<number>()
            for (let i = 0; i < sizes.length; i++) {
                d2.add(sizes[i].d2)
            }
            setD2(Array.from(d2))
        }
    }, [values[0], sizes])

    // синзронизация значений D2 и Dn, а также соотвествующих размеров
    const changeDn = (onChange: (...event: any[]) => void) => (value: string) => {
        const size = sizes.filter(s => s.dn === value)
        if (!size) return

        let idx = size.findIndex(s => s.pn.includes(values[2]))
        if (idx === -1) {
            idx = 0
            setValue("pn", size[idx].pn.split(";")[0])
        }

        setValue("d4", size[idx].d4 || 0)
        setValue("d3", size[idx].d3)
        setValue("d2", size[idx].d2)
        setValue("d1", size[idx].d1 || 0)
        setValue("h", size[idx].h.split(";")[0])
        setValue("s2", size[idx].s2?.split(";")[0] || "")
        setValue("s3", size[idx].s3?.split(";")[0] || "")
        onChange(value)
    }
    const renderDn = ({ field }: { field: ControllerRenderProps<ISnpForm, "dn"> }) => {
        return (
            <Select value={field.value} onChange={changeDn(field.onChange)}>
                {dn.map(dn => (
                    <Option key={dn.dn} value={dn.dn}>
                        {dn.dn}
                    </Option>
                ))}
            </Select>
        )
    }

    // синзронизация значений D2 и Dn, а также соотвествующих размеров
    const changeD2 = (onChange: (...event: any[]) => void) => (value: string) => {
        const size = sizes.filter(s => s.d2.toString() === value)
        if (!size) return

        let idx = size.findIndex(s => s.pn.includes(values[2]))
        if (idx === -1) {
            idx = 0
            setValue("pn", size[idx].pn.split(";")[0])
        }

        setValue("dn", size[idx].dn)
        setValue("d4", size[idx].d4 || 0)
        setValue("d3", size[idx].d3)
        setValue("d1", size[idx].d1 || 0)
        setValue("h", size[idx].h.split(";")[0])
        setValue("s2", size[idx].s2?.split(";")[0] || "")
        setValue("s3", size[idx].s3?.split(";")[0] || "")
        onChange(value)
    }
    const renderD2 = ({ field }: { field: ControllerRenderProps<ISnpForm, "d2"> }) => {
        return (
            <Select value={field.value?.toString() || ""} onChange={changeD2(field.onChange)}>
                {d2.map(d => (
                    <Option key={d} value={d.toString()}>
                        {d}
                    </Option>
                ))}
            </Select>
        )
    }

    const renderPn = ({ field }: { field: ControllerRenderProps<ISnpForm, "pn"> }) => {
        return (
            <Select value={field.value} onChange={field.onChange}>
                {sizes
                    .filter(s => s.dn === values[1])
                    .map(s => {
                        if (s.pn.includes(";")) {
                            return s.pn.split(";").map(pn => (
                                <Option key={pn} value={pn}>
                                    {pn}
                                </Option>
                            ))
                        }
                        return (
                            <Option key={s.pn} value={s.pn}>
                                {s.pn}
                            </Option>
                        )
                    })}
            </Select>
        )
    }

    // синхронизация значений s2, s3 и h
    const changeH = (onChange: (...event: any[]) => void) => (value: string) => {
        const size = sizes.find(s => s.dn === values[1])
        if (size) {
            let idx = size.h.split(";").findIndex(h => h === value)
            setValue("s2", size.s2?.split(";")[idx] || "")
            setValue("s3", size.s3?.split(";")[idx] || "")
        }
        onChange(value)
    }
    const renderH = ({ field }: { field: ControllerRenderProps<ISnpForm, "h"> }) => {
        const size = sizes.find(s => s.dn === values[1])
        return (
            <Select value={field.value} onChange={changeH(field.onChange)}>
                {size?.h.split(";").map(h => (
                    <Option key={h} value={h}>
                        {h}
                    </Option>
                ))}
                <Option value='др.'>др.</Option>
            </Select>
        )
    }

    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.full}`}>
                {dn.length && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Условный проход, мм</p>
                        <Controller name='dn' control={control} render={renderDn} />
                    </div>
                )}
                {d2.length && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>D2</p>
                        <Controller name='d2' control={control} render={renderD2} />
                    </div>
                )}
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Давление Ру, МПа</p>
                    <Controller name='pn' control={control} render={renderPn} />
                </div>

                <div className={classes.group}>
                    <p className={classes.titleGroup}>Толщина прокладки</p>
                    <div className={classes.thic}>
                        <Controller name='h' control={control} render={renderH} />
                        {values[3] === "др." && (
                            <Input
                                placeholder='толщина'
                                min={0.1}
                                step={0.1}
                                type='number'
                                name='oh'
                                register={register}
                            />
                        )}
                    </div>
                </div>
            </div>
            <div className={`${classes.block} ${classes.snpDrawFl}`}>
                <p className={classes.titleGroup}>Чертеж прокладки</p>
                <div className={`${classes.blockImage}`}>
                    <div className={classes.imageContainer}>
                        <img
                            className={classes.image}
                            width={800}
                            height={348}
                            src={imgUrls[values[4] as "Д"]}
                            alt='gasket drawing'
                        />
                        {/* Элементы отвечающие за подкраску участков прокладки */}
                        {/* <Excretion values={values} /> */}

                        {/* Вывод размеров */}
                        {/* <Sizes values={values} /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
