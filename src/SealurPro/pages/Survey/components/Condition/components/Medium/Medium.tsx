import { FC } from "react"
import { Checkbox } from "../../../../../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../../../../../components/UI/Input/Input"
import classes from "../../../../survey.module.scss"

type Props = {}

export const Medium: FC<Props> = () => {
    return (
        <>
            <div className={`${classes.inline} `}>
                <p className={classes.nodeTitle}>Особенности среды</p>
                <div className={classes.checkboxes}>
                    <Checkbox
                        id='abrasive'
                        name='abrasive'
                        label='абразивная'
                        // checked={false}
                        // onChange={() => {}}
                    />
                    <Checkbox
                        id='crystallized'
                        name='crystallized'
                        label='кристализуемая'
                        // checked={false}
                        // onChange={() => {}}
                    />
                    <Checkbox
                        id='penetrating'
                        name='penetrating'
                        label='с высокой проникающей способностью'
                        // checked={false}
                        // onChange={() => {}}
                    />
                </div>
            </div>
            <div className={`${classes.inline}`}>
                <p className={classes.nodeTitle}>Прочие условия (вибрация, Мизг, и т.п.)</p>
                <Input name='other' />
            </div>
            <div className={`${classes.inline}`}>
                <p className={classes.nodeTitle}>Срок эксплуатации/межремонтный период</p>
                <Input name='period' />
            </div>
        </>
    )
}
