import { ChangeEvent, FC } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Checkbox } from "../../../../../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../../../../../components/UI/Input/Input"
import { Dispatch, ProState } from "../../../../../../store/store"
import { MediumBoolFields, MediumFields } from "../../../../../../types/survey"
import classes from "../../../../survey.module.scss"

type Props = {}

export const Medium: FC<Props> = () => {
    const medium = useSelector((state: ProState) => state.survey.medium)

    const { survey } = useDispatch<Dispatch>()

    const changeMediumBoolDataHandler =
        (field: MediumBoolFields) => (event: ChangeEvent<HTMLInputElement>) => {
            survey.setMediumBoolData({ field, value: event.target.checked })
        }
    const changeMediumDataHandler =
        (field: MediumFields) => (event: ChangeEvent<HTMLInputElement>) => {
            survey.setMeduimData({ field, value: event.target.value })
        }

    return (
        <>
            <div className={`${classes.inline} `}>
                <p className={classes.nodeTitle}>Особенности среды</p>
                <div className={classes.checkboxes}>
                    <Checkbox
                        id='abrasive'
                        name='abrasive'
                        label='абразивная'
                        checked={medium.abrasive}
                        onChange={changeMediumBoolDataHandler("abrasive")}
                    />
                    <Checkbox
                        id='crystallized'
                        name='crystallized'
                        label='кристализуемая'
                        checked={medium.crystallized}
                        onChange={changeMediumBoolDataHandler("crystallized")}
                    />
                    <Checkbox
                        id='penetrating'
                        name='penetrating'
                        label='с высокой проникающей способностью'
                        checked={medium.penetrating}
                        onChange={changeMediumBoolDataHandler("penetrating")}
                    />
                </div>
            </div>
            <div className={`${classes.inline}`}>
                <p className={classes.nodeTitle}>Прочие условия (вибрация, Мизг, и т.п.)</p>
                <Input
                    name='condition'
                    id='condition'
                    value={medium.condition}
                    onChange={changeMediumDataHandler("condition")}
                />
            </div>
            <div className={`${classes.inline}`}>
                <p className={classes.nodeTitle}>Срок эксплуатации/межремонтный период</p>
                <Input
                    name='period'
                    id='period'
                    value={medium.period}
                    onChange={changeMediumDataHandler("period")}
                />
            </div>
        </>
    )
}
