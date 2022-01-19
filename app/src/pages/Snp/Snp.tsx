import { BlockSelect } from "../../components/BlockSelect/BlockSelect"
import { ResultBlock } from "../../components/ResultBlock/ResultBlock"
import classes from "../Putg/putg.module.scss"

const initStan = [
    {
        id: "1",
        value: "gost12815",
        title: "ГОСТ 12815 (трубопроводы)",
    },
    {
        id: "2",
        value: "gost28759",
        title: "ГОСТ 28759 (сосуды и аппараты)",
    },
    {
        id: "3",
        value: "gost",
        title: "ГОСТ 12815 (трубопроводы)",
    },
]
const initFl = [
    {
        id: "1",
        value: "A",
        title: "А соединительный выступ",
    },
    {
        id: "2",
        value: "B",
        title: "Б выступ-впадина",
    },
    {
        id: "3",
        value: "C",
        title: "В шип-паз",
    },
]

const imgUrl = "/image/snp/A.webp"

export default function Snp() {
    return (
        <>
            <div className={classes.container}>
                <div className={`${classes.block} ${classes.full}`}>
                    <BlockSelect
                        title='Стандарт на прокладку / стандарт на фланец'
                        value='gost28759'
                        data={initStan}
                        changeValue={() => {}}
                    />
                    <BlockSelect
                        title='Тип фланца'
                        value='A'
                        data={initFl}
                        changeValue={() => {}}
                    />
                </div>
                <div className={`${classes.block} ${classes.fb50}`}>
                    <p className={classes.titleGroup}>Чертеж типа фланца</p>
                    <div className={classes.blockImage}>
                        <img className={classes.image} loading='lazy' src={imgUrl} alt='' />
                    </div>
                </div>
            </div>
            <div className={classes.container}></div>
            <div className={classes.sideContainer}></div>
            <ResultBlock className={classes.resultContainer} description='' designation='' />
        </>
    )
}
