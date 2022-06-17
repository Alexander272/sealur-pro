import { ChangeEvent, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Tabs } from "../../../../../../../components/Tabs/Tabs"
import { Input } from "../../../../../../../components/UI/Input/Input"
import { Dispatch, ProState } from "../../../../../../store/store"
import { DefFields } from "../../../../../../types/survey"
import classes from "../../../../survey.module.scss"

type Props = {}

export const Def: FC<Props> = () => {
    const defects = useSelector((state: ProState) => state.survey.defects)

    const { survey } = useDispatch<Dispatch>()

    const changeDefectsDataHandler =
        (field: DefFields) => (event: ChangeEvent<HTMLInputElement>) => {
            survey.setDefectsData({ field, value: event.target.value })
        }

    const changeMountingHandler = (type: string) => {
        if (type === "yes") survey.setMounting(true)
        else survey.setMounting(false)
    }

    return (
        <div className={classes.fb50}>
            <p className={classes.title}>Глубина и характер дефектов</p>
            <div className={classes.inline}>
                <div className={classes.fb50}>
                    <Input
                        label='вдоль'
                        id='along'
                        name='along'
                        type='number'
                        placeholder='0,00'
                        min={0}
                        step={0.05}
                        value={defects.along}
                        onChange={changeDefectsDataHandler("along")}
                    />
                </div>
                <div className={classes.fb50}>
                    <Input
                        label='поперек'
                        id='across'
                        name='across'
                        type='number'
                        placeholder='0,00'
                        min={0}
                        step={0.05}
                        value={defects.across}
                        onChange={changeDefectsDataHandler("across")}
                    />
                </div>
            </div>
            <div className={classes.inline}>
                <Input
                    label='Неплоскостность фланцев'
                    id='nonFlatness'
                    name='nonFlatness'
                    type='number'
                    placeholder='0,00'
                    min={0}
                    step={0.05}
                    orentation='horizontal'
                    value={defects.nonFlatness}
                    onChange={changeDefectsDataHandler("nonFlatness")}
                />
            </div>
            <div className={classes.inline}>
                <p>Необходимость крепления на фланце</p>
                <Tabs initWidth={53} onClick={changeMountingHandler}>
                    <p
                        className={[classes.variants, !defects.mounting && classes.active].join(
                            " "
                        )}
                        data-type='no'
                    >
                        Нет
                    </p>
                    <p
                        className={[classes.variants, defects.mounting && classes.active].join(" ")}
                        data-type='yes'
                    >
                        Да
                    </p>
                </Tabs>
            </div>
            {/* <div className={classes.inline}> */}
            <Input
                label='&#8470; чертежа'
                id='prestest'
                name='prestest'
                orentation='horizontal'
                value={defects.drawingNumber}
                onChange={changeDefectsDataHandler("drawingNumber")}
            />
            {/* </div> */}
        </div>
    )
}
