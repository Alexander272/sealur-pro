import { useState } from "react"
import { ResultBlock } from "../../components/ResultBlock/ResultBlock"
import { Tabs } from "../../components/Tabs/Tabs"
import { Checkbox } from "../../components/UI/Checkbox/Checkbox"
import { Input } from "../../components/UI/Input/Input"
import { Select } from "../../components/UI/Select/Select"
import classes from "./putg.module.scss"

const { Option } = Select

export default function Putg() {
    const [procType, setProcType] = useState<string>("Round")

    const tabHandler = (event: React.MouseEvent<any>) => {
        const type = (event.target as HTMLParagraphElement).dataset.type
        if (type) setProcType(type)
    }

    const imgUrl = "/image/putg/PUTG-A.webp"
    const chUrl = "/image/putg/constraction/100-01.webp"

    return (
        <>
            <div className={classes.container}>
                <div className={`${classes.block} ${classes.full}`}>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Конфигурация прокладки</p>
                        <Tabs initWidth={85} onClick={tabHandler}>
                            <p
                                className={[
                                    classes.variants,
                                    procType === "Round" ? classes.active : null,
                                ].join(" ")}
                                data-type='Round'
                            >
                                Круглая
                            </p>
                            <p
                                className={[
                                    classes.variants,
                                    procType === "Oval" ? classes.active : null,
                                ].join(" ")}
                                data-type='Oval'
                            >
                                Овальная
                            </p>
                            <p
                                className={[
                                    classes.variants,
                                    procType === "Rectangular" ? classes.active : null,
                                ].join(" ")}
                                data-type='Rectangular'
                            >
                                Прямоугольная
                            </p>
                        </Tabs>
                    </div>

                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Стандарт на фланец</p>
                        <Select value='gost28759' onChange={() => {}}>
                            <Option value='gost12815'>ГОСТ 12815 (трубопроводы)</Option>
                            <Option value='gost28759'>ГОСТ 28759 (сосуды и аппараты)</Option>
                            <Option value='gost'>ГОСТ 12815 (трубопроводы)</Option>
                        </Select>
                    </div>

                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип фланца</p>
                        <Select value='A' onChange={() => {}}>
                            <Option value='A'>А соединительный выступ</Option>
                            <Option value='B'>Б выступ-впадина</Option>
                            <Option value='C'>В шип-паз</Option>
                        </Select>
                    </div>

                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип прокладки</p>
                        <Select value='100' onChange={() => {}}>
                            <Option value='100'>100</Option>
                            <Option value='211'>211</Option>
                            <Option value='212'>212</Option>
                        </Select>
                    </div>

                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Тип конструкции</p>
                        <Select value='01' onChange={() => {}}>
                            <Option value='01'>01 без обтюраторов</Option>
                            <Option value='02'>02 с внут обтюратором</Option>
                            <Option value='03'>03 с нар обтюратором</Option>
                        </Select>
                    </div>
                </div>
                <div className={`${classes.block} ${classes.putgDrawing}`}>
                    <p className={classes.titleGroup}>Чертеж типа фланца</p>
                    <div className={classes.blockImage}>
                        <img
                            className={classes.image}
                            width={500}
                            height={266}
                            src={imgUrl}
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <div className={classes.sideContainer}>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Степень чистоты графитовой составляющей</p>
                    <Select value='2' onChange={() => {}}>
                        <Option value='2'>2</Option>
                        <Option value='1'>1</Option>
                    </Select>
                </div>
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Температура эксплуатации</p>
                    <Tabs initWidth={85} onClick={tabHandler}>
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
                <div className={classes.group}>
                    <p className={classes.titleGroup}>Способ исполнения</p>
                    <Select value='0' onChange={() => {}}>
                        <Option value='0'>0 нет</Option>
                        <Option value='1'>1 с покрытием</Option>
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
                        id='detachable'
                        name='detachable'
                        label='Разъемная'
                        checked={true}
                        onChange={() => {}}
                    />
                    {true && (
                        <div className={classes.box}>
                            <Input name='parts' type='number' placeholder='кол-во частей' min={1} />
                        </div>
                    )}
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
                <div className={`${classes.group} ${classes.inline} ${classes.mater}`}>
                    <p className={classes.titleGroup}>Армирующий элемент</p>
                    <Select value='1' onChange={() => {}}>
                        <Option value='1'>ANSI 304</Option>
                        <Option value='2'>ANSI 304L</Option>
                    </Select>
                </div>
            </div>
            <div className={classes.container}>
                <div className={`${classes.block} ${classes.full}`}>
                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Проход, DN</p>
                        <Select value='10' onChange={() => {}}>
                            <Option value='10'>10</Option>
                            <Option value='15'>15</Option>
                            <Option value='20'>20</Option>
                        </Select>
                    </div>

                    <div className={classes.group}>
                        <p className={classes.titleGroup}>Давление, PN</p>
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
                <div className={`${classes.block} ${classes.putgDrawFl}`}>
                    <p className={classes.titleGroup}>Чертеж прокладки</p>
                    <div className={classes.blockImage}>
                        <img
                            className={classes.image}
                            width={800}
                            height={180}
                            src={chUrl}
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <ResultBlock
                className={classes.resultContainer}
                description='Lorem ipsum dolor sit, amet
                    consectetur adipisicing elit. Cumque non aperiam ea, earum accusamus harum,
                    repellendus dolorem delectus veniam itaque temporibus doloribus quia soluta
                    fugit sit eligendi mollitia consectetur. Impedit porro cum possimus quidem ut!'
                designation='Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti vero'
            />
        </>
    )
}
