import { ResultBlock } from "../../components/ResultBlock/ResultBlock"
import { Tabs } from "../../components/Tabs/Tabs"
import { Checkbox } from "../../components/UI/Checkbox/Checkbox"
import { Input } from "../../components/UI/Input/Input"
import { Select } from "../../components/UI/Select/Select"
import classes from "../Putg/putg.module.scss"

const initStan = [
    {
        id: "1",
        value: "gost12815",
        title: "ОСТ 26.260.454 / ГОСТ 12815 (трубопроводы)",
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
const chUrl = "/image/snp/SNP-A.webp"

const { Option } = Select

export default function Snp() {
    return (
        <>
            <div className={classes.container}>
                <div className={`${classes.block} ${classes.full}`}>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>
                            Стандарт на прокладку / стандарт на фланец
                        </p>
                        <Select value={"gost12815"} onChange={() => {}}>
                            {initStan.map(d => (
                                <Option key={d.id} value={d.value}>
                                    {d.title}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип фланца</p>
                        <Select value={"A"} onChange={() => {}}>
                            {initFl.map(d => (
                                <Option key={d.id} value={d.value}>
                                    {d.title}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип СНП</p>
                        <Tabs initWidth={39} onClick={() => {}}>
                            <p
                                className={[classes.variants, classes.active].join(" ")}
                                data-type='A'
                            >
                                А
                            </p>
                            <p className={[classes.variants].join(" ")} data-type='B'>
                                Б
                            </p>
                            <p className={[classes.variants].join(" ")} data-type='C'>
                                В
                            </p>
                            <p className={[classes.variants].join(" ")} data-type='D'>
                                Г
                            </p>
                            <p className={[classes.variants].join(" ")} data-type='E'>
                                Д
                            </p>
                        </Tabs>
                    </div>
                </div>
                <div className={`${classes.block} ${classes.snpDraw}`}>
                    <p className={classes.titleGroup}>Чертеж типа фланца</p>
                    <div className={classes.blockImage}>
                        <img
                            className={classes.image}
                            width={600}
                            height={319}
                            src={imgUrl}
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <div className={classes.container}>
                <div className={`${classes.block} ${classes.full}`}>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Условный проход, мм</p>
                        <Select value='10' onChange={() => {}}>
                            <Option value='10'>10</Option>
                            <Option value='15'>15</Option>
                            <Option value='20'>20</Option>
                        </Select>
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>D2 (для всех давлений)</p>
                        <Select value='10' onChange={() => {}}>
                            <Option value='10'>10</Option>
                            <Option value='15'>15</Option>
                            <Option value='20'>20</Option>
                        </Select>
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Давление Ру, МПа</p>
                        <Select value='10' onChange={() => {}}>
                            <Option value='10'>10</Option>
                            <Option value='15'>15</Option>
                            <Option value='20'>20</Option>
                        </Select>
                    </div>

                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Толщина прокладки</p>
                        <Select value='2,0' onChange={() => {}}>
                            <Option value='1,0'>1,0</Option>
                            <Option value='2,0'>2,0</Option>
                            <Option value='3,0'>3,0</Option>
                        </Select>
                    </div>
                </div>
                <div className={`${classes.block} ${classes.snpDrawFl}`}>
                    <p className={classes.titleGroup}>Чертеж типа фланца</p>
                    <div className={classes.blockImage}>
                        <img
                            className={classes.image}
                            width={800}
                            height={348}
                            src={chUrl}
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <div className={classes.sideContainer}>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Тип наполнителя</p>
                    <Select value='3' onChange={() => {}}>
                        <Option value='3'>3 F.G - ТРГ (агрессивные среды)</Option>
                        <Option value='4'>4 F.G - ТРГ (неагрессивные среды)</Option>
                        <Option value='5'>5 PTFE - фторопласт (сильные окислители)</Option>
                    </Select>
                </div>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Температура эксплуатации</p>
                    <Tabs initWidth={85} onClick={() => {}}>
                        <p className={[classes.variants, classes.active].join(" ")} data-type='500'>
                            До 500
                        </p>
                        <p className={[classes.variants].join(" ")} data-type='600'>
                            До 600 И(Н-14)
                        </p>
                        <p className={[classes.variants].join(" ")} data-type='m600'>
                            От 600 И(Н-18)
                        </p>
                    </Tabs>
                </div>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Модифицирующий элемент</p>
                    <Select value='0' onChange={() => {}}>
                        <Option value='0'>0 нет</Option>
                        <Option value='1'>1 слюда</Option>
                        <Option value='2'>2 фольга</Option>
                    </Select>
                </div>

                <p className={classes.title}>Конструктивные элементы</p>
                <div className={`${classes.group} ${classes.inline}`}>
                    <Checkbox
                        id='bridge'
                        name='bridge'
                        label='Перемычка'
                        checked={true}
                        onChange={() => {}}
                    />
                    {true && (
                        <div className={classes.box}>
                            <Select value='A' onChange={() => {}}>
                                <Option value='A'>A</Option>
                                <Option value='B'>B</Option>
                            </Select>
                            <Input name='parts' type='number' placeholder='ширина' suffix='мм' />
                        </div>
                    )}
                </div>
                <div className={classes.group}>
                    <Checkbox id='holes' name='holes' label='Отверстия' />
                </div>
                <div className={`${classes.group} ${classes.inline}`}>
                    <Checkbox
                        id='fastening'
                        name='fastening'
                        label='Крепление на вертикальном фланце'
                        checked={true}
                        onChange={() => {}}
                    />
                    {true && (
                        <div className={classes.box}>
                            <Select value='Ф1-20' onChange={() => {}}>
                                <Option value='Ф1-20'>Ф1-20</Option>
                                <Option value='Ф1-24'>Ф1-24</Option>
                            </Select>
                        </div>
                    )}
                </div>

                <p className={classes.title}>Материалы</p>
                <div className={`${classes.group} ${classes.inline} ${classes.mater}`}>
                    <p className={classes.titleGroup}>Армирующий элемент</p>
                    <Select value='1' onChange={() => {}}>
                        <Option value='1'>1 ANSI 304</Option>
                        <Option value='2'>2 ANSI 304L</Option>
                    </Select>
                </div>
                <div className={`${classes.group} ${classes.inline} ${classes.mater}`}>
                    <p className={classes.titleGroup}>Армирующий элемент</p>
                    <Select value='2' onChange={() => {}}>
                        <Option value='1'>1 ANSI 304</Option>
                        <Option value='2'>2 ANSI 304L</Option>
                    </Select>
                </div>
                <div className={`${classes.group} ${classes.inline} ${classes.mater}`}>
                    <p className={classes.titleGroup}>Армирующий элемент</p>
                    <Select value='1' onChange={() => {}}>
                        <Option value='1'>ANSI 304</Option>
                        <Option value='2'>ANSI 304L</Option>
                    </Select>
                </div>
            </div>
            <ResultBlock className={classes.resultContainer} description='' designation='' />
        </>
    )
}
