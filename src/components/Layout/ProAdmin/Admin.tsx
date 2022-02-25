import { Suspense, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import { Dispatch, RootState } from "../../../store/store"
import { List } from "../../UI/List/List"
import { Loader } from "../../UI/Loader/Loader"
import classes from "./admin.module.scss"

const { Item } = List

export default function AdminLayout() {
    const addit = useSelector((state: RootState) => state.addit.addit)
    const materials = useSelector((state: RootState) => state.addit.addit?.materials)
    const mod = useSelector((state: RootState) => state.addit.addit?.mod)
    const temp = useSelector((state: RootState) => state.addit.addit?.temperature)

    const dispatch = useDispatch<Dispatch>()

    useEffect(() => {
        if (!addit) dispatch.addit.getAddit()
    }, [addit, dispatch.addit])

    return (
        <div className={classes.wrapper}>
            <div className={classes.main}>
                <Suspense fallback={<Loader />}>
                    <Outlet />
                </Suspense>
            </div>

            <div className={classes.side}>
                <List title='Материалы' isOpen>
                    {materials?.split(";").map(mat => {
                        const parts = mat.split("@")
                        return (
                            <Item key={parts[0]}>
                                {parts[0]} {parts[1]}
                            </Item>
                        )
                    })}
                </List>
                <List title='Температура эксплуатации'>
                    {temp?.split(";").map(temp => {
                        const parts = temp.split("@")
                        return <Item key={parts[0]}>{parts[1]}</Item>
                    })}
                </List>
                <List title='Тип модифицирующего элемента'>
                    {mod?.split(";").map(mod => {
                        const parts = mod.split("@")
                        return <Item key={parts[0]}>{parts[1]}</Item>
                    })}
                </List>
            </div>
        </div>
    )
}
