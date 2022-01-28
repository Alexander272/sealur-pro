import React, { ChangeEvent, useState } from "react"
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
        title: "А соединительный выступ (1-1/RF/B1/B2)",
    },
    {
        id: "2",
        value: "B",
        title: "Б выступ-впадина (2-3/LMF/E-F)",
    },
    {
        id: "3",
        value: "C",
        title: "В шип-паз (4-5/LTG/C-D)",
    },
]

const flangeDraw: any = {
    A: "/image/snp/A.webp",
    B: "/image/snp/B.webp",
    C: "/image/snp/V.webp",
}
const typeDraw: any = {
    A: "/image/snp/SNP-P-AB.webp",
    B: "/image/snp/SNP-P-AB.webp",
    C: "/image/snp/SNP-P-C.webp",
    D: "/image/snp/SNP-P-D.webp",
    E: "/image/snp/SNP-P-E.webp",
}

const initType: any = {
    A: {
        width: 39,
        position: 0,
    },
    B: {
        width: 38,
        position: 39,
    },
    C: {
        width: 37,
        position: 77,
    },
    D: {
        width: 36,
        position: 114,
    },
    E: {
        width: 41,
        position: 150,
    },
}

const { Option } = Select

export default function Snp() {
    const [stand, setStand] = useState("gost12815")
    const [flange, setFlange] = useState("A")
    const [type, setType] = useState("E")
    const [pass, setPass] = useState("10")
    const [D2, setD2] = useState("10")
    const [pressure, setPressure] = useState("10")
    const [thickness, setThickness] = useState("2,0")

    const [bridge, setBridge] = useState(false)

    const flangeHandler = (value: string) => {
        setFlange(value)
        switch (value) {
            case "A":
                setType("E")
                break
            case "B":
                setType("C")
                break
            case "C":
                setType("A")
                break
        }
    }
    const typeHandler = (event: React.MouseEvent<any>) => {
        const type = (event.target as HTMLParagraphElement).dataset.type
        if (type) {
            setType(type)
            if (type === "E" || type === "D") {
                setFlange("A")
            } else if (type === "C" || type === "B") {
                setFlange("B")
            } else {
                setFlange("C")
            }
        }
    }

    const bridgeHandler = (event: ChangeEvent<HTMLInputElement>) => setBridge(event.target.checked)

    return (
        <>
            <div className={classes.container}>
                <div className={`${classes.block} ${classes.full}`}>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>
                            Стандарт на прокладку / стандарт на фланец
                        </p>
                        <Select value={stand} onChange={() => {}}>
                            {initStan.map(d => (
                                <Option key={d.id} value={d.value}>
                                    {d.title}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип фланца</p>
                        <Select value={flange} onChange={flangeHandler}>
                            {initFl.map(d => (
                                <Option key={d.id} value={d.value}>
                                    {d.title}
                                </Option>
                            ))}
                        </Select>
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип СНП</p>
                        <Tabs
                            initWidth={initType[type].width}
                            initPos={initType[type].position}
                            onClick={typeHandler}
                        >
                            <p
                                className={[classes.variants, type === "A" && classes.active].join(
                                    " "
                                )}
                                data-type='A'
                            >
                                А
                            </p>
                            <p
                                className={[classes.variants, type === "B" && classes.active].join(
                                    " "
                                )}
                                data-type='B'
                            >
                                Б
                            </p>
                            <p
                                className={[classes.variants, type === "C" && classes.active].join(
                                    " "
                                )}
                                data-type='C'
                            >
                                В
                            </p>
                            <p
                                className={[classes.variants, type === "D" && classes.active].join(
                                    " "
                                )}
                                data-type='D'
                            >
                                Г
                            </p>
                            <p
                                className={[classes.variants, type === "E" && classes.active].join(
                                    " "
                                )}
                                data-type='E'
                            >
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
                            src={flangeDraw[flange]}
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <div className={classes.container}>
                <div className={`${classes.block} ${classes.full}`}>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Условный проход, мм</p>
                        <Select value={pass} onChange={() => {}}>
                            <Option value='10'>10</Option>
                            <Option value='15'>15</Option>
                            <Option value='20'>20</Option>
                        </Select>
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>D2 (для всех давлений)</p>
                        <Select value={D2} onChange={() => {}}>
                            <Option value='10'>10</Option>
                            <Option value='15'>15</Option>
                            <Option value='20'>20</Option>
                        </Select>
                    </div>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Давление Ру, МПа</p>
                        <Select value={pressure} onChange={() => {}}>
                            <Option value='10'>10</Option>
                            <Option value='15'>15</Option>
                            <Option value='20'>20</Option>
                        </Select>
                    </div>

                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Толщина прокладки</p>
                        <Select value={thickness} onChange={() => {}}>
                            <Option value='1,0'>1,0</Option>
                            <Option value='2,0'>2,0</Option>
                            <Option value='3,0'>3,0</Option>
                        </Select>
                    </div>
                </div>
                <div className={`${classes.block} ${classes.snpDrawFl}`}>
                    <p className={classes.titleGroup}>Чертеж типа фланца</p>
                    <div className={`${classes.blockImage} ${classes.typeDraw}`}>
                        <img
                            className={classes.image}
                            width={800}
                            height={348}
                            src={typeDraw[type]}
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
                        checked={bridge}
                        onChange={bridgeHandler}
                    />
                    {bridge && (
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
