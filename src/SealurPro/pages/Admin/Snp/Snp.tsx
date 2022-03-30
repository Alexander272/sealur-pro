import { useCallback, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { toast } from "react-toastify"
import { AdminFiller } from "../components/AdminFiller/AdminFiller"
import { AdminGrap } from "../components/AdminGrap/AdminGrap"
import { AdminMat } from "../components/AdminMat/AdminMat"
import { AdminMod } from "../components/AdminMod/AdminMod"
import { AdminMoun } from "../components/AdminMoun/AdminMoun"
import { AdminTemp } from "../components/AdminTemp/AdminTemp"
import { AdminType } from "./components/Main/components/AdminType/AdminType"
import { Materials } from "../../../components/Materials/Materials"
import { SizeTable } from "../../../components/SizeTable/SizeTable"
import { Button } from "../../../../components/UI/Button/Button"
import { Loader } from "../../../../components/UI/Loader/Loader"
import { Select } from "../../../../components/UI/Select/Select"
import ReadService from "../../../service/read"
import SNPService from "../../../service/snp"
import { Dispatch, ProState } from "../../../store/store"
import { ISize, ISizeReq } from "../../../types/size"
import { ISNP, ISNPDTO, ISNPReq } from "../../../types/snp"
import classes from "../pages.module.scss"
import { MainSnp } from "./components/Main/MainSnp"
import { Filler } from "./components/Filler/Filler"

const { Option } = Select

export default function SNP() {
    // TODO исправить
    const loading = useSelector((state: ProState) => state.addit.loading)
    const addit = useSelector((state: ProState) => state.addit.addit)
    const stfl = useSelector((state: ProState) => state.addit.stfl)
    const typeFl = useSelector((state: ProState) => state.addit.typeFl)

    const sending = useSelector((state: ProState) => state.snp.loading)
    const snp = useSelector((state: ProState) => state.snp.snp)

    // const addit = useSelector((state: ProState) => state.addit.addit)
    // const [st, setSt] = useState(stfl[0]?.id || "")
    // const [snp, setSnp] = useState<ISNP[]>([])
    // const [curSnp, setCurSnp] = useState<ISNP | null>(null)
    // const [type, setType] = useState("Д")
    // const [filler, setFiller] = useState("")
    // const [tm, setTm] = useState("")
    // const [temp, setTemp] = useState("0")
    // const [isOpenTable, setIsOpenTable] = useState(false)
    // const [sizes, setSizes] = useState<ISize[]>([])
    // const [sending, setSending] = useState(false)
    const dispatch = useDispatch<Dispatch>()

    // запрос стандартов и типов фланцев
    useEffect(() => {
        if (!stfl.length) dispatch.addit.getStFl()
        if (!typeFl.length) dispatch.addit.getTypeFl()
    }, [stfl.length, typeFl.length, dispatch.addit])

    // const fetchSnp = useCallback(async (req: ISNPReq) => {
    //     console.log("fetchSnp")
    //     try {
    //         setSending(true)
    //         const res = await ReadService.getSnp(req)
    //         setSnp(res.data || [])
    //     } catch (error: any) {
    //         toast.error(`Возникла ошибка: ${error.message}`)
    //     } finally {
    //         setSending(false)
    //     }
    // }, [])

    // const fetchSize = useCallback(async (req: ISizeReq) => {
    //     console.log("fetchSize")
    //     try {
    //         const res = await ReadService.getSize(req)
    //         setSizes(res.data.sizes)
    //     } catch (error: any) {
    //         toast.error(`Возникла ошибка: ${error.message}`)
    //     }
    // }, [])
    // // Заполнение значений наполнителя, температуры и прокладки при изменении списка прокладок или типа фланца
    // useEffect(() => {
    //     if (!snp.length) {
    //         setFiller("")
    //         setTm("")
    //         setTemp("")
    //         setCurSnp(null)
    //         return
    //     }
    //     let tmp = snp.filter(s => s.typeFlId.includes(curSnp?.typeFlId || ""))
    //     let index = tmp.findIndex(s => s.typePr === type)
    //     if (index === -1) index = 0
    //     if (!tmp.length) tmp = snp
    //     if (index === 0) setType(tmp[index].typePr)
    //     const fil = tmp[index].fillers.split(";")[0] || ""
    //     setFiller(fil.split("&")[0] || "")
    //     setTm(fil.split("&")[1] || "")
    //     setTemp(fil.split("&")[1]?.split(">")[0] || "")
    //     setCurSnp(tmp[index])
    // }, [curSnp?.typeFlId, snp, type])
    // // Запрос на получение размеров при изменении типа прокладки или фланца или стандарта
    // useEffect(() => {
    //     if (!!curSnp?.typePr && !!stfl.length) {
    //         const sf = stfl.find(s => s.id === st)
    //         if (sf)
    //             fetchSize({
    //                 typePr: curSnp.typePr,
    //                 typeFlId: curSnp.typeFlId,
    //                 standId: sf.standId,
    //                 flShort: sf.short,
    //             })
    //     }
    // }, [curSnp?.typePr, curSnp?.typeFlId, stfl, st, fetchSize])
    // // Запрос прокладок при изменении стандарта и при загрузке страницы
    // useEffect(() => {
    //     const sf = stfl.find(s => s.id === st)
    //     if (sf) fetchSnp({ standId: sf.standId, flangeId: sf.flangeId })
    //     else if (stfl.length) {
    //         fetchSnp({ standId: stfl[0].standId, flangeId: stfl[0].flangeId })
    //         setSt(stfl[0].id)
    //     }
    // }, [addit, st, stfl, fetchSnp])
    // const sendHandler = () => setSending(prev => !prev)
    // const stHandler = (value: string) => {
    //     setSt(value)
    // }
    // // изменение типа прокадки и связанных значений
    // const changeTypeHandler = (type: string, snp: ISNP, isNew: boolean) => {
    //     if (isNew) {
    //         setSnp(prev => [...prev, snp])
    //         setCurSnp(snp)
    //         setType(type)
    //     } else {
    //         setSnp(prev => prev.filter(s => s.typePr !== type))
    //         if (curSnp?.typePr === type) setCurSnp(null)
    //     }
    // }
    // const typeHandler = (type: string, snp: ISNP, isNew: boolean | undefined) => {
    //     console.log(type, snp, isNew)
    //     if (isNew) setSnp(prev => [...prev, snp])
    //     setType(type)
    //     setCurSnp(snp)
    // }
    // const denyTypeHandler = () => {
    //     setSnp(prev => prev.filter(s => s.id !== "new"))
    // }
    // // измение наполнителя и связанных значений
    // const fillerHandler = (filler: string, fillers: string) => {
    //     setFiller(filler.split("&")[0])
    //     const tm = filler.split("&")[1]
    //     setTm(tm)
    //     setTemp(tm?.split(">")[0] || "")
    //     if (fillers !== "" && curSnp) {
    //         setCurSnp({ ...curSnp, fillers: fillers })
    //     }
    // }
    // const changeFillerHandler = (fillers: string, selected: boolean) => {
    //     if (selected) {
    //         setFiller("")
    //         setTm("")
    //         setTemp("")
    //     }
    //     if (curSnp) {
    //         setCurSnp({ ...curSnp, fillers: fillers })
    //     }
    // }
    // // измение температуры
    // const tempHandler = (temp: string, temps: string) => {
    //     setTemp(temp)
    //     if (temps && curSnp) {
    //         setTm(temps)
    //         setCurSnp({
    //             ...curSnp,
    //             fillers: curSnp.fillers.replace(`${filler}&${tm}`, `${filler}&${temps}`),
    //         })
    //     }
    // }
    // const changeTempHandler = (temps: string, selected: boolean) => {
    //     if (selected) {
    //         setTemp("")
    //     }
    //     if (curSnp) {
    //         setTm(temps)
    //         setCurSnp({
    //             ...curSnp,
    //             fillers: curSnp.fillers.replace(`${filler}&${tm}`, `${filler}&${temps}`),
    //         })
    //     }
    // }
    // // измениние модифицирующего элемента
    // const changeModHandler = (newTm: string) => {
    //     if (curSnp) {
    //         setTm(newTm)
    //         setCurSnp({
    //             ...curSnp,
    //             fillers: curSnp.fillers.replace(`${filler}&${tm}`, `${filler}&${newTm}`),
    //         })
    //     }
    // }
    // // измение крепления
    // const mounHandler = (value: string) => {
    //     let snp: ISNP = {} as ISNP
    //     if (curSnp) snp = Object.assign(snp, curSnp, { mounting: value })
    //     setCurSnp(snp)
    // }
    // // изменение графита
    // const grapHandler = (value: string) => {
    //     let snp: ISNP = {} as ISNP
    //     if (curSnp) snp = Object.assign(snp, curSnp, { graphite: value })
    //     setCurSnp(snp)
    // }
    // // измение материалов по умолчанию
    // const defMatHandler = (name: string) => (value: string) => {
    //     if (!curSnp) return
    //     let snp: ISNP = {} as ISNP
    //     let newValue = curSnp[name as "frame"]?.split("&")[0] + "&" + value
    //     snp = Object.assign(snp, curSnp, { [name]: newValue })
    //     setCurSnp(snp)
    // }
    // // измение материалов
    // const matHandler = (value: string, name: string) => {
    //     if (!curSnp) return
    //     let snp: ISNP = {} as ISNP
    //     let defValue = ""
    //     let newValue = ""
    //     if (value === "*") defValue = addit?.materials.split(";")[0].split("@")[0] || ""
    //     else {
    //         let tmp =
    //             addit?.materials.split(";").find(m => m.split("@")[0] === value.split(";")[0]) || ""
    //         defValue = tmp.split("@")[0]
    //     }
    //     let isInc = value.split(";").includes(curSnp[name as "frame"]?.split("&")[1] || "")
    //     if (value !== "")
    //         newValue = value + "&" + (isInc ? curSnp[name as "frame"]?.split("&")[1] : defValue)
    //     snp = Object.assign(snp, curSnp, { [name]: newValue })
    //     setCurSnp(snp)
    // }
    // // открытие таблицы с размерами
    // const openTableHandler = () => setIsOpenTable(prev => !prev)
    // // добавление сохраненной проклаки
    // const savedSnpHandler = (id: string, type: string, newSnp: ISNP | null) => {
    //     if (curSnp?.id === "new") {
    //         let tmp = [...snp]
    //         if (newSnp) tmp = [...snp, newSnp]
    //         const idx = tmp.findIndex(s => s.id === "new")
    //         tmp[idx] = { ...curSnp, id }
    //         setSnp(tmp)
    //     }
    //     setType(type)
    //     setCurSnp(newSnp)
    // }
    // // добавление сохраненных размеров
    // const savedSizeHandler = (size: ISize, isNew: boolean) => {
    //     if (isNew) setSizes(prev => [...prev, size])
    //     else {
    //         setSizes(prev =>
    //             prev.map(s => {
    //                 if (s.id === size.id) return size
    //                 return s
    //             })
    //         )
    //     }
    // }
    // const deleteSizeHandler = (id: string, isAll: boolean) => {
    //     if (isAll) setSizes([])
    //     else setSizes(prev => prev.filter(s => s.id !== id))
    // }
    // // сохрание прокладки
    // const saveHandler = async () => {
    //     if (!curSnp) {
    //         toast.error("Тип снп не добавлен")
    //         return
    //     }
    //     if (!curSnp.fillers) {
    //         toast.error("Наполнитель не выбран")
    //         return
    //     }
    //     const sf = stfl.find(s => s.id === st)
    //     if (!sf) return
    //     try {
    //         setSending(true)
    //         const data: ISNPDTO = {
    //             standId: sf.standId,
    //             flangeId: sf.flangeId,
    //             typeFlId: curSnp.typeFlId,
    //             typePr: curSnp.typePr,
    //             fillers: curSnp.fillers,
    //             frame: curSnp.frame || "",
    //             ir: curSnp.ir || "",
    //             or: curSnp.or || "",
    //             mounting: curSnp.mounting,
    //             graphite: curSnp.graphite,
    //         }
    //         if (curSnp.id === "new") {
    //             const res = await SNPService.create(data)
    //             const newSnp = [...snp]
    //             const idx = newSnp.findIndex(s => s.id === "new")
    //             newSnp[idx] = { ...curSnp, id: res.id || "" }
    //             setSnp(newSnp)
    //             toast.success("Успешно создано")
    //         } else {
    //             await SNPService.update(data, curSnp.id)
    //             toast.success("Успешно обновлено")
    //         }
    //     } catch (error: any) {
    //         toast.error("Не удалось выполнить запрос на сервер")
    //     } finally {
    //         setSending(false)
    //     }
    // }
    if (!addit || loading) {
        return <Loader />
    }

    return (
        <div className={classes.page}>
            {sending && (
                <div className={classes.loader}>
                    <Loader background='fill' />
                </div>
            )}

            <MainSnp />
            {snp && (
                <>
                    <Filler />
                </>
            )}
        </div>
    )

    // return (
    //     <div className={classes.page}>
    //         {sending && (
    //             <div className={classes.loader}>
    //                 <Loader background='fill' />
    //             </div>
    //         )}
    //         {/* <div className={classes.line}>
    //             <List title='Стандарт на прокладку'>
    //                 {stand.map(s => (
    //                     <Item key={s.id}>{s.title}</Item>
    //                 ))}
    //             </List>
    //             <List title='Стандарт на фланец'>
    //                 {fl.map(f => (
    //                     <Item key={f.id}>{f.title}</Item>
    //                 ))}
    //             </List>
    //         </div>*/}
    //         <div className={classes.line}>
    //             {stfl && (
    //                 <Select value={st} onChange={stHandler}>
    //                     {stfl.map(s => (
    //                         <Option key={s.id} value={s.id}>
    //                             {s.stand} / {s.flange}
    //                         </Option>
    //                     ))}
    //                 </Select>
    //             )}
    //             {/* <Button>Добавить</Button> */}
    //         </div>
    //         <div className={classes.group}>
    //             <p>Тип СНП</p>
    //             <div className={classes.line}>
    //                 <AdminType
    //                     type={type}
    //                     snp={snp}
    //                     st={st}
    //                     curSnp={curSnp}
    //                     clickHandler={typeHandler}
    //                     changeHandler={changeTypeHandler}
    //                     denyHandler={denyTypeHandler}
    //                     saveHandler={savedSnpHandler}
    //                     sendHandler={sendHandler}
    //                 />
    //             </div>
    //         </div>
    //         {curSnp ? (
    //             <>
    //                 <div className={classes.line}>
    //                     <div className={classes.fil}>
    //                         <p className={classes.titleGroup}>Тип наполнителя</p>
    //                         <AdminFiller
    //                             fillers={curSnp.fillers}
    //                             filler={filler}
    //                             sendHandler={sendHandler}
    //                             clickHandler={fillerHandler}
    //                             changeHandler={changeFillerHandler}
    //                         />
    //                     </div>
    //                     <div className={classes.fil}>
    //                         <p className={classes.titleGroup}>Температура эксплуатации</p>
    //                         <AdminTemp
    //                             tm={tm}
    //                             temp={temp}
    //                             filler={filler}
    //                             clickHandler={tempHandler}
    //                             changeHandler={changeTempHandler}
    //                         />
    //                     </div>
    //                     <div className={classes.fil}>
    //                         <p className={classes.titleGroup}>Модифицирующий элемент</p>
    //                         <AdminMod tm={tm} temp={temp} clickHandler={changeModHandler} />
    //                     </div>
    //                 </div>
    //                 <div className={classes.line}>
    //                     <div className={classes.fil}>
    //                         <p className={classes.titleGroup}>Внутреннее кольцо</p>
    //                         <Materials
    //                             className={classes.def}
    //                             classTitle={classes.defTitle}
    //                             value={curSnp?.ir?.split("&")[1] || "Значение не выбрано"}
    //                             mater={curSnp?.ir?.split("&")[0] || ""}
    //                             onChange={defMatHandler("ir")}
    //                             disabled={!curSnp?.ir}
    //                             title='Значение по умолчанию'
    //                         />
    //                         <p className={classes.defTitle}>Доступные значения</p>
    //                         {addit?.materials && (
    //                             <AdminMat
    //                                 className={classes.list}
    //                                 classItem={classes.listItem}
    //                                 name='ir'
    //                                 mat={curSnp?.ir?.split("&")[0] || ""}
    //                                 onChange={matHandler}
    //                             />
    //                         )}
    //                     </div>
    //                     <div className={classes.fil}>
    //                         <p className={classes.titleGroup}>Каркас</p>
    //                         <Materials
    //                             className={classes.def}
    //                             classTitle={classes.defTitle}
    //                             value={curSnp?.frame?.split("&")[1] || "Значение не выбрано"}
    //                             mater={curSnp?.frame?.split("&")[0] || ""}
    //                             onChange={defMatHandler("frame")}
    //                             disabled={!curSnp?.frame}
    //                             title='Значение по умолчанию'
    //                         />
    //                         <p className={classes.defTitle}>Доступные значения</p>
    //                         {addit?.materials && (
    //                             <AdminMat
    //                                 className={classes.list}
    //                                 classItem={classes.listItem}
    //                                 name='frame'
    //                                 mat={curSnp?.frame?.split("&")[0] || ""}
    //                                 onChange={matHandler}
    //                             />
    //                         )}
    //                     </div>
    //                     <div className={classes.fil}>
    //                         <p className={classes.titleGroup}>Наружное кольцо</p>
    //                         <Materials
    //                             className={classes.def}
    //                             classTitle={classes.defTitle}
    //                             value={curSnp?.or?.split("&")[1] || "Значение не выбрано"}
    //                             mater={curSnp?.or?.split("&")[0] || ""}
    //                             onChange={defMatHandler("or")}
    //                             disabled={!curSnp?.or}
    //                             title='Значение по умолчанию'
    //                         />
    //                         <p className={classes.defTitle}>Доступные значения</p>
    //                         {addit?.materials && (
    //                             <AdminMat
    //                                 className={classes.list}
    //                                 classItem={classes.listItem}
    //                                 name='or'
    //                                 mat={curSnp?.or?.split("&")[0] || ""}
    //                                 onChange={matHandler}
    //                             />
    //                         )}
    //                     </div>
    //                 </div>
    //                 <div className={classes.line}>
    //                     <div className={classes.fil}>
    //                         <p className={classes.titleGroup}>Крепление на вертикальном фланце</p>
    //                         {addit?.mounting && (
    //                             <AdminMoun
    //                                 className={classes.list}
    //                                 classItem={classes.listItem}
    //                                 moun={curSnp?.mounting || ""}
    //                                 onChange={mounHandler}
    //                             />
    //                         )}
    //                     </div>
    //                     <div className={classes.fil}>
    //                         <p className={classes.titleGroup}>
    //                             Степень чистоты графитовой составляющей
    //                         </p>
    //                         {addit?.graphite && (
    //                             <AdminGrap
    //                                 className={classes.list}
    //                                 classItem={classes.listItem}
    //                                 graphite={curSnp?.graphite || ""}
    //                                 onChange={grapHandler}
    //                             />
    //                         )}
    //                     </div>
    //                 </div>
    //                 <div className={classes.line}>
    //                     <Button rounded='round' variant='grayPrimary' onClick={openTableHandler}>
    //                         Размеры
    //                     </Button>
    //                     <span className={classes.full} />
    //                     <Button rounded='round' onClick={saveHandler}>
    //                         Сохранить
    //                     </Button>
    //                 </div>
    //             </>
    //         ) : null}
    //         {isOpenTable && (
    //             <div className={classes.table}>
    //                 <div className={classes.header}>
    //                     <h5>Размеры</h5>
    //                     <p onClick={openTableHandler}>&times;</p>
    //                 </div>
    //                 <SizeTable
    //                     data={sizes}
    //                     typePr={type}
    //                     stand={stfl.find(s => s.id === st) || null}
    //                     saveHandler={savedSizeHandler}
    //                     deleteHandler={deleteSizeHandler}
    //                 />
    //             </div>
    //         )}
    //     </div>
    // )
}
