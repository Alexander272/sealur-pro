import { FC } from "react"
import { Tabs } from "../../../../../../../components/Tabs/Tabs"
import { Input } from "../../../../../../../components/UI/Input/Input"
import classes from "../../../../survey.module.scss"

type Props = {}

export const Def: FC<Props> = () => {
    return (
        <div className={classes.fb50}>
            <p className={classes.title}>Глубина и характер деффектов</p>
            <div className={classes.inline}>
                <div className={classes.fb50}>
                    <Input
                        label='вдоль'
                        id='prestest'
                        name='prestest'
                        type='number'
                        placeholder='0.00'
                        min={0}
                        step={0.01}
                    />
                </div>
                <div className={classes.fb50}>
                    <Input
                        label='поперек'
                        id='prestest'
                        name='prestest'
                        type='number'
                        placeholder='0.00'
                        min={0}
                        step={0.01}
                    />
                </div>
            </div>
            <div className={classes.inline}>
                <Input
                    label='Неплоскостность фланцев'
                    id='prestest'
                    name='prestest'
                    type='number'
                    placeholder='0.00'
                    min={0}
                    step={0.01}
                    orentation='horizontal'
                />
            </div>
            <div className={classes.inline}>
                <p>Необходимость крепления на фланце</p>
                <Tabs initWidth={53} onClick={() => {}}>
                    <p className={[classes.variants, classes.active].join(" ")} data-type='no'>
                        Нет
                    </p>
                    <p className={[classes.variants].join(" ")} data-type='yes'>
                        Да
                    </p>
                </Tabs>
            </div>
            {/* <div className={classes.inline}> */}
            <Input label='&#8470; чертежа' id='prestest' name='prestest' orentation='horizontal' />
            {/* </div> */}
        </div>
    )
}
