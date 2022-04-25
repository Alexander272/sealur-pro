import { FC } from "react"
import { useSelector } from "react-redux"
import { Checkbox } from "../../../../../../../components/UI/Checkbox/Checkbox"
import { ProState } from "../../../../../../store/store"
import classes from "./type.module.scss"

type Props = {}

export const Type: FC<Props> = () => {
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)
    const putgs = useSelector((state: ProState) => state.putg.putgs)
    const putg = useSelector((state: ProState) => state.putg.putg)

    // выбор прокладки (добавление если ее нет)
    const choseTypeHandler = (type: string) => () => {
        console.log(type)
    }

    // добавление (удаление) прокладки
    const changeTypeHandler = (curType: string) => () => {
        console.log(curType)
    }

    const renderTypes = () => {
        return typeFl.map(t => {
            let s = putgs.find(p => p.typePr.toLowerCase() === `ПУТГ-${t.short}`.toLowerCase())

            return (
                <div key={t.id} className={classes.types}>
                    <p
                        onClick={choseTypeHandler(t.id)}
                        className={`${classes.type} ${
                            putg?.typePr.toLowerCase() === `ПУТГ-${t.short}`.toLowerCase()
                                ? classes.active
                                : ""
                        }`}
                    >
                        {t.short} {t.title}
                    </p>
                    <Checkbox
                        id={t.id}
                        name={t.id}
                        onChange={changeTypeHandler(t.id)}
                        checked={!!s}
                        label={!s ? "Добавить" : "Удалить"}
                    />
                </div>
            )
        })
    }

    return (
        <>
            {/* <ConfirmModal
                title={
                    isModified.current && !isCurSnp.current
                        ? "Сохранить изменения?"
                        : "Удалить прокладку?"
                }
                isOpen={isOpen}
                isNo={isModified.current && !isCurSnp.current}
                toggle={cancelHandler}
                cancelHandler={cancelHandler}
                denyHandler={denyHandler}
                confirmHandler={
                    isModified.current && !isCurSnp.current ? saveHandler : deleteHandler
                }
            /> */}
            {renderTypes()}
        </>
    )
}
