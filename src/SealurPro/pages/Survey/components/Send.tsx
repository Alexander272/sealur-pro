import { FC } from "react"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"
import { Button } from "../../../../components/UI/Button/Button"
import SurveyService from "../../../service/survey"
import { ProState } from "../../../store/store"
import { IPadSize, ISizeInt, ISurveyDTO } from "../../../types/survey"

type Props = {}

export const Send: FC<Props> = () => {
    const fl = useSelector((state: ProState) => state.addit.fl)
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)
    const bolts = useSelector((state: ProState) => state.survey.bolts)
    const materials = useSelector((state: ProState) => state.survey.materials)
    const boltMaterials = useSelector((state: ProState) => state.survey.boltMaterials)

    const user = useSelector((state: ProState) => state.survey.user)
    const equip = useSelector((state: ProState) => state.survey.equip)
    const temp = useSelector((state: ProState) => state.survey.temperature)
    const heat = useSelector((state: ProState) => state.survey.heat)
    const medium = useSelector((state: ProState) => state.survey.medium)
    const type = useSelector((state: ProState) => state.survey.type)
    const mater = useSelector((state: ProState) => state.survey.mater)
    const defects = useSelector((state: ProState) => state.survey.defects)

    const size = useSelector((state: ProState) => state.survey.size)
    const anSize = useSelector((state: ProState) => state.survey.anotherSize)
    const bolt = useSelector((state: ProState) => state.survey.bolt)
    const py = useSelector((state: ProState) => state.survey.py)

    const drawing = useSelector((state: ProState) => state.survey.drawing)
    const info = useSelector((state: ProState) => state.survey.info)

    const sendHandler = async () => {
        if (!user.organization || !user.name || !user.email) {
            toast.error("Заполните обязательные поля")
            return
        }

        let s: ISizeInt | (IPadSize & ISizeInt)
        if (type.type === "stand") {
            s = { ...size! }
            s.py = py
        } else {
            s = { ...anSize }
            s.bolt = bolts.find(b => b.id === bolt)?.title || ""
        }

        let t = { ...type }
        t.flange = fl.find(f => f.id === type.flange)?.title || ""
        t.typeFl = typeFl.find(f => f.id === type.typeFl)?.title || ""

        let m = { ...mater }
        m.material = materials.find(m => m.id === mater.material)?.title || ""
        m.boltMaterial = boltMaterials.find(m => m.id === mater.boltMaterial)?.title || ""

        try {
            const data: ISurveyDTO = {
                ...user,
                ...equip,
                ...temp,
                ...heat,
                ...medium,
                ...t,
                ...m,
                ...defects,

                drawing,
                info,
                size: s,
            }

            await SurveyService.send(data)
            toast.success("Заявка успешно отправлена")
        } catch (error: any) {
            toast.error("Произошла ошибка. Повторите попытку позднее.")
        }
    }
    return (
        <Button rounded='round' onClick={sendHandler}>
            Отправить заявку
        </Button>
    )
}
