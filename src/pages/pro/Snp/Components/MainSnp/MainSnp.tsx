import { FC } from "react"
import {
    Control,
    Controller,
    ControllerRenderProps,
    UseFormSetValue,
    UseFormWatch,
} from "react-hook-form"
import { useSelector } from "react-redux"
import { Tabs } from "../../../../../components/Tabs/Tabs"
import { Select } from "../../../../../components/UI/Select/Select"
import { RootState } from "../../../../../store/store"
import { ISNP, ISnpForm } from "../../../../../types/snp"
import classes from "../../../style/pages.module.scss"

const { Option } = Select

const types = [
    {
        value: "А",
        width: 39,
    },
    {
        value: "Б",
        width: 38,
    },
    {
        value: "В",
        width: 37,
    },
    {
        value: "Г",
        width: 36,
    },
    {
        value: "Д",
        width: 41,
    },
]

const imgUrls = {
    1: "/image/snp/A.webp",
    2: "/image/snp/B.webp",
    3: "/image/snp/V.webp",
}

type Props = {
    // values: ISnpForm
    watch: UseFormWatch<ISnpForm>
    control: Control<ISnpForm, object>
    snp: ISNP[]
    changeCurSnp: (snp: ISNP) => void
    setValue: UseFormSetValue<ISnpForm>
}

export const MainSnp: FC<Props> = ({ watch, control, snp, changeCurSnp, setValue }) => {
    const stfl = useSelector((state: RootState) => state.addit.stfl)
    const typesFl = useSelector((state: RootState) => state.addit.typeFl)

    const values = watch(["typePr", "typeFl"])

    const renderStand = ({ field }: { field: ControllerRenderProps<ISnpForm, "st"> }) => {
        return (
            <Select value={field.value} onChange={field.onChange}>
                {stfl.map(d => (
                    <Option key={d.id} value={d.id}>
                        {d.stand} / {d.flange}
                    </Option>
                ))}
            </Select>
        )
    }

    // Синхронизация значений типа прокладки и типа фланца
    const changeTypeFl = (onChange: (...event: any[]) => void) => (typeFl: string) => {
        const tmp = snp.filter(s => s.typeFlId.includes(typeFl))
        if (tmp.length) {
            setValue("typePr", tmp[0].typePr)
            changeCurSnp(tmp[0])
        }
        onChange(typeFl)
    }
    const renderTypeFl = ({ field }: { field: ControllerRenderProps<ISnpForm, "typeFl"> }) => {
        return (
            <Select value={field.value} onChange={changeTypeFl(field.onChange)}>
                {typesFl
                    .filter(tfl => snp.some(s => s.typeFlId === tfl.id))
                    .map(tfl => (
                        <Option key={tfl.id} value={tfl.id}>
                            {tfl.short} {tfl.title} {tfl.descr}
                        </Option>
                    ))}
            </Select>
        )
    }

    // Синхронизация значений типа прокладки и типа фланца
    const changeTypePr = (onChange: (...event: any[]) => void) => (type: string) => {
        const tmp = snp.filter(s => s.typePr.includes(type))
        if (tmp.length) {
            setValue("typeFl", tmp[0].typeFlId)
            changeCurSnp(tmp[0])
        }
        onChange(type)
    }
    const renderTypePr = ({ field }: { field: ControllerRenderProps<ISnpForm, "typePr"> }) => {
        const usedTypes = types.filter(t => snp.some(s => s.typePr === t.value))
        const idx = types.findIndex(t => t.value === field.value)

        return (
            <Tabs
                initWidth={usedTypes[idx].width}
                initPos={usedTypes.reduce((ac, cur, index) => {
                    if (index >= idx) return ac
                    return ac + cur.width
                }, 0)}
                onClick={changeTypePr(field.onChange)}
            >
                {usedTypes.map((t, idx) => (
                    <p
                        key={t.value}
                        className={[
                            classes.variants,
                            field.value === t.value ? classes.active : "",
                        ].join(" ")}
                        data-type={t.value}
                        data-index={idx}
                    >
                        {t.value}
                    </p>
                ))}
            </Tabs>
        )
    }

    return (
        <div className={classes.container}>
            <div className={`${classes.block} ${classes.full}`}>
                {stfl.length ? (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>
                            Стандарт на прокладку / стандарт на фланец
                        </p>
                        <Controller name='st' control={control} render={renderStand} />
                    </div>
                ) : null}
                {typesFl.length > 0 && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип фланца</p>
                        <Controller name='typeFl' control={control} render={renderTypeFl} />
                    </div>
                )}
                {values[0] && (
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип СНП</p>
                        <Controller name='typePr' control={control} render={renderTypePr} />
                    </div>
                )}
            </div>
            <div className={`${classes.block} ${classes.snpDraw}`}>
                <p className={classes.titleGroup}>Чертеж типа фланца</p>
                <div className={classes.blockImage}>
                    <img
                        className={classes.image}
                        width={600}
                        height={319}
                        src={imgUrls[values[1] as "1"]}
                        alt='flange type drawing'
                    />
                </div>
            </div>
        </div>
    )
}
