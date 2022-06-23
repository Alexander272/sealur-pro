import { useLayoutEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useModal } from "../../../../components/Modal/hooks/useModal"
import { Modal } from "../../../../components/Modal/Modal"
import { List } from "../../../../components/UI/List/List"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { Dispatch, ProState } from "../../../store/store"
import { IBoltMaterial, IMaterial } from "../../../types/survey"
import { BoltMaterialForm } from "./forms/BoltMaterialForm"
import { BoltsForm } from "./forms/BoltsForm"
import { MaterialForm } from "./forms/MaterialForm"
import classes from "../pages.module.scss"
import { Size } from "./Size/Size"

const { Item } = List

export default function Survey() {
    const materials = useSelector((state: ProState) => state.survey.materials)
    const boltBaterials = useSelector((state: ProState) => state.survey.boltMaterials)
    const bolts = useSelector((state: ProState) => state.survey.bolts)

    const [formType, setFormType] = useState("mat")
    const [data, setData] = useState<any | null>(null)
    const [sending, setSending] = useState(false)

    const { isOpen, toggle } = useModal()

    const { survey } = useDispatch<Dispatch>()

    useLayoutEffect(() => {
        survey.getDefault()
        survey.getBoltMaterials()
    }, [survey])

    const openFormHandler = (formType: string) => () => {
        setData(null)
        setFormType(formType)
        toggle()
    }

    const updateMaterialsHandler = (mat: IMaterial) => {
        setFormType("mat")
        setData({ id: mat.id, title: mat.title, typeMat: mat.typeMat })
        toggle()
    }

    const updateBoltMaterialsHandler = (mat: IMaterial) => {
        setFormType("boltMat")
        setData({ id: mat.id, title: mat.title, typeMat: mat.typeMat })
        toggle()
    }

    const updateBoltHandler = (bolt: IBoltMaterial) => {
        setFormType("bolt")
        setData({ id: bolt.id, title: bolt.title })
        toggle()
    }

    const sendHandler = () => setSending(prev => !prev)

    return (
        <div className={classes.wrapper}>
            {sending && (
                <div className={classes.loader}>
                    <Loader background='fill' />
                </div>
            )}
            <Modal isOpen={isOpen} toggle={toggle}>
                <Modal.Header title={!data ? "Добавить" : "Редактировать"} onClose={toggle} />
                {formType === "mat" && (
                    <MaterialForm closeHandler={toggle} data={data} sendHandler={sendHandler} />
                )}
                {formType === "boltMat" && (
                    <BoltMaterialForm closeHandler={toggle} data={data} sendHandler={sendHandler} />
                )}
                {formType === "bolt" && (
                    <BoltsForm closeHandler={toggle} data={data} sendHandler={sendHandler} />
                )}
            </Modal>
            <div className={classes.page}>
                <div className={classes.line}>
                    <div className={classes.fil}>
                        <List
                            title='Материалы фланца'
                            addHandler={openFormHandler("mat")}
                            updateHandler={updateMaterialsHandler}
                            isOpen
                        >
                            {materials.map(m => (
                                <Item key={m.id} value={m}>
                                    {m.title}
                                </Item>
                            ))}
                        </List>
                    </div>
                    <div className={classes.fil}>
                        <List
                            title='Материалы болтов/шпилек'
                            addHandler={openFormHandler("boltMat")}
                            updateHandler={updateBoltMaterialsHandler}
                            isOpen
                        >
                            {boltBaterials.map(m => (
                                <Item key={m.id} value={m}>
                                    {m.title}
                                </Item>
                            ))}
                        </List>
                    </div>
                    <div className={classes.fil}>
                        <List
                            title='Ø болтов/шпилек'
                            addHandler={openFormHandler("bolt")}
                            updateHandler={updateBoltHandler}
                            isOpen
                        >
                            {bolts.map(b => (
                                <Item key={b.id} value={b}>
                                    {b.title}
                                </Item>
                            ))}
                        </List>
                    </div>
                </div>
                <div className={classes.line}>
                    <Size />
                </div>
            </div>
        </div>
    )
}
