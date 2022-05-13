import { ProUrl } from "../../../components/routes"
import { Tabs } from "../../../components/Tabs/Tabs"
import { Button } from "../../../components/UI/Button/Button"
import { Checkbox } from "../../../components/UI/Checkbox/Checkbox"
import { Input } from "../../../components/UI/Input/Input"
import { Textarea } from "../../../components/UI/Input/Textarea"
import { Select } from "../../../components/UI/Select/Select"
import classes from "./survey.module.scss"

const imgUrl = "/image/survey/1.webp"
const { Option } = Select

export default function Survey() {
    return (
        <div className={classes.gridContainer}>
            <div className={`${classes.container} ${classes.block1}`}>
                <p className={classes.title}>Контактное лицо</p>
                <div className={classes.field}>
                    <Input
                        label='Наименование предприятия *'
                        id='organization'
                        name='organization'
                        orentation='horizontal'
                    />
                </div>
                <div className={classes.field}>
                    <Input label='Ф.И.О. *' id='name' name='name' orentation='horizontal' />
                </div>
                <div className={classes.field}>
                    <Input
                        label='Email *'
                        type='email'
                        id='email'
                        name='email'
                        orentation='horizontal'
                    />
                </div>
                <div className={classes.field}>
                    <Input label='Город' id='city' name='city' orentation='horizontal' />
                </div>
                <div className={classes.field}>
                    <Input
                        label='Должность'
                        id='position'
                        name='position'
                        orentation='horizontal'
                    />
                </div>
                <div className={classes.field}>
                    <Input label='Телефон' id='phone' name='phone' orentation='horizontal' />
                </div>

                <p className={classes.title}>Описание оборудования</p>
                <div className={classes.field}>
                    <Input
                        label='Установка/название тех. процесса'
                        id='techprocess'
                        name='techprocess'
                        orentation='horizontal'
                    />
                </div>
                <div className={classes.field}>
                    <Input
                        label='Оборудование (агрегат)'
                        id='equipment'
                        name='equipment'
                        orentation='horizontal'
                    />
                </div>
                <div className={classes.field}>
                    <Input
                        label='Применяемое уплотнение/проблемы'
                        id='seal'
                        name='seal'
                        orentation='horizontal'
                    />
                </div>
                <div className={classes.field}>
                    <Input
                        label='Предприятие - Потребитель'
                        id='consumer'
                        name='consumer'
                        orentation='horizontal'
                    />
                </div>
                <div className={classes.field}>
                    <Input
                        label='Завод изготовитель оборудования'
                        id='factory'
                        name='factory'
                        orentation='horizontal'
                    />
                </div>
                <div className={classes.field}>
                    <Input
                        label='Разработчик документации'
                        id='dev'
                        name='dev'
                        orentation='horizontal'
                    />
                </div>
            </div>
            <div className={`${classes.container} ${classes.block2}`}>
                <p className={classes.title}>Конструкция узла</p>
                <div className={`${classes.inline} ${classes.node}`}>
                    <p className={classes.nodeTitle}>Тип фланцевого соединения</p>
                    <Select value='ledge' onChange={() => {}}>
                        <Option value='ledge'>Соединительный выступ</Option>
                        <Option value='ledge_trough'>Выступ-впадина</Option>
                        <Option value='tenon'>Шип-паз</Option>
                        <Option value='groove'>Паз - гладкая поверхность</Option>
                        <Option value='lock_melt'>Замок (под плав головку теплообменника)</Option>
                        <Option value='lock'>Замок</Option>
                        <Option value='plug'>Под резьбую пробку</Option>
                        <Option value='another'>Другой</Option>
                    </Select>
                    <p className={classes.flange}>1-1/ RF/ В1/ В2</p>
                </div>
                <div className={`${classes.inline} ${classes.stand}`}>
                    <Tabs initWidth={124} initPos={142}>
                        <p className={[classes.variants].join(" ")} data-type='unstand'>
                            Нестандартный
                            <br />
                            фланец
                        </p>
                        <p
                            className={[classes.variants, classes.active].join(" ")}
                            data-type='stand'
                        >
                            Стандартный
                            <br />
                            фланец
                        </p>
                    </Tabs>
                    <Select value='gost12815' onChange={() => {}}>
                        <Option value='gost12815'>ГОСТ 12815 (трубопроводы)</Option>
                        <Option value='gost28759'>ГОСТ 28759 (сосуды и аппараты)</Option>
                        <Option value='asmeb165'>ASME B 16.5</Option>
                        <Option value='asmeb1647a'>ASME B 16.47A</Option>
                        <Option value='asmeb1647b'>ASME B 16.47B</Option>
                        <Option value='din'>DIN/EN 1092</Option>
                    </Select>
                </div>
                <div className={classes.inline}>
                    <div className={classes.param}>
                        <div className={classes.field}>
                            <p className={classes.titleGroup}>Dy, мм</p>
                            <Select value='10' onChange={() => {}}>
                                <Option value='10'>10</Option>
                                <Option value='15'>15</Option>
                                <Option value='20'>20</Option>
                            </Select>
                        </div>
                        <div className={classes.field}>
                            <p className={classes.titleGroup}>
                                Py, Мпа (кгc/см<sup>2</sup>)
                            </p>
                            <Select value='10' onChange={() => {}}>
                                <Option value='10'>10</Option>
                                <Option value='15'>15</Option>
                                <Option value='20'>20</Option>
                            </Select>
                        </div>
                    </div>
                    <div className={classes.imageContainer}>
                        <img
                            className={classes.image}
                            width={559}
                            height={440}
                            src={imgUrl}
                            alt=''
                        />
                    </div>
                </div>
            </div>
            <div className={`${classes.container} ${classes.block3}`}>
                <p className={classes.title}>Условия эксплуатации</p>
                <div className={classes.inline}>
                    <div className={classes.fb60}>
                        <div className={`${classes.inline} ${classes.tem}`}>
                            <p className={classes.nodeTitle}>Рабочая температура, &#8451;</p>
                            <Input
                                label='от'
                                id='difffrom'
                                name='difffrom'
                                type='number'
                                orentation='horizontal'
                                placeholder='0'
                            />
                            <Input
                                label='до'
                                id='diffto'
                                name='diffto'
                                type='number'
                                orentation='horizontal'
                                placeholder='0'
                            />
                        </div>
                        <div className={`${classes.inline} ${classes.tem}`}>
                            <p className={classes.nodeTitle}>Давление рабочее/испытаний</p>
                            <Input
                                id='preswork'
                                name='preswork'
                                type='number'
                                min={0}
                                step={0.1}
                                placeholder='0.0'
                            />
                            <p>/</p>
                            <Input
                                id='prestest'
                                name='prestest'
                                type='number'
                                placeholder='0.0'
                                min={0}
                                step={0.1}
                            />
                            <Select value='mpa' onChange={() => {}}>
                                <Option value='mpa'>Мпа</Option>
                                <Option value='kgs'>
                                    кгс/см<sup>2</sup>
                                </Option>
                                <Option value='class'>класс давления</Option>
                            </Select>
                        </div>
                        <div className={`${classes.inline} `}>
                            <p className={classes.nodeTitle}>Среда, состав/концентрация</p>
                            <Input name='environ' />
                        </div>
                    </div>
                    <div className={classes.fb40}>
                        <p className={classes.title}>Для теплообменника</p>
                        <div className={classes.inline}>
                            <div className={classes.fb50}>
                                <p className={classes.titleGroup}>трубное</p>
                                <Input
                                    id='difffrom'
                                    name='difffrom'
                                    type='number'
                                    orentation='horizontal'
                                    placeholder='0'
                                />
                                <Input
                                    id='preswork'
                                    name='preswork'
                                    type='number'
                                    min={0}
                                    step={0.1}
                                    placeholder='0.0'
                                />
                                <Input name='environ' />
                            </div>
                            <div className={classes.fb50}>
                                <p className={classes.titleGroup}>межтрубное</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={`${classes.inline} `}>
                    <p className={classes.nodeTitle}>Особенности среды</p>
                    <div className={classes.checkboxes}>
                        <Checkbox
                            id='abrasive'
                            name='abrasive'
                            label='абразивная'
                            // checked={false}
                            // onChange={() => {}}
                        />
                        <Checkbox
                            id='crystallized'
                            name='crystallized'
                            label='кристализуемая'
                            // checked={false}
                            // onChange={() => {}}
                        />
                        <Checkbox
                            id='penetrating'
                            name='penetrating'
                            label='с высокой проникающей способностью'
                            // checked={false}
                            // onChange={() => {}}
                        />
                    </div>
                </div>
                <div className={`${classes.inline}`}>
                    <p className={classes.nodeTitle}>Прочие условия (вибрация, Мизг, и т.п.)</p>
                    <Input name='other' />
                </div>
                <div className={`${classes.inline}`}>
                    <p className={classes.nodeTitle}>Срок эксплуатации/межремонтный период</p>
                    <Input name='period' />
                </div>
            </div>
            <div className={`${classes.container} ${classes.block4}`}>
                <p className={classes.title}>Дополнительные сведения</p>
                <div className={classes.inline}>
                    <div className={classes.fb50}>
                        <div className={classes.inline}>
                            <p>Материал фланца</p>
                            <Select value='mpa' onChange={() => {}}>
                                <Option value='mpa'>Мпа</Option>
                                <Option value='kgs'>
                                    кгс/см<sup>2</sup>
                                </Option>
                                <Option value='class'>класс давления</Option>
                            </Select>
                        </div>
                        <div className={classes.inline}>
                            <p>Материал болтов/шпилек</p>
                            <Select value='mpa' onChange={() => {}}>
                                <Option value='mpa'>Мпа</Option>
                                <Option value='kgs'>
                                    кгс/см<sup>2</sup>
                                </Option>
                                <Option value='class'>класс давления</Option>
                            </Select>
                        </div>
                        <div className={classes.inline}>
                            <p>&Oslash; болтов/шпилек</p>
                            <Select value='mpa' disabled onChange={() => {}}>
                                <Option value='mpa'>Мпа</Option>
                                <Option value='kgs'>
                                    кгс/см<sup>2</sup>
                                </Option>
                                <Option value='class'>класс давления</Option>
                            </Select>
                        </div>
                        <div className={classes.inline}>
                            <p>Количествово болтов/шпилек, шт</p>
                            <Input
                                name='diffto'
                                type='number'
                                orentation='horizontal'
                                placeholder='0'
                                disabled
                            />
                        </div>
                        <div className={classes.inline}>
                            <p>Наличие смазки на крепеже</p>
                            <Tabs initWidth={53} onClick={() => {}}>
                                <p
                                    className={[classes.variants, classes.active].join(" ")}
                                    data-type='no'
                                >
                                    Нет
                                </p>
                                <p className={[classes.variants].join(" ")} data-type='yes'>
                                    Да
                                </p>
                            </Tabs>
                        </div>
                    </div>
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
                                <p
                                    className={[classes.variants, classes.active].join(" ")}
                                    data-type='no'
                                >
                                    Нет
                                </p>
                                <p className={[classes.variants].join(" ")} data-type='yes'>
                                    Да
                                </p>
                            </Tabs>
                        </div>
                        {/* <div className={classes.inline}> */}
                        <Input
                            label='&#8470; чертежа'
                            id='prestest'
                            name='prestest'
                            orentation='horizontal'
                        />
                        {/* </div> */}
                    </div>
                </div>
                <div className={classes.inline}>
                    <p className={classes.fb50}>Дополнительная информация</p>
                    <Button>Прикрепить чертеж</Button>
                </div>
                <Textarea name='info' rows={4} />
            </div>
            <div className={classes.buttons}>
                <Button.Link to={`${ProUrl}/`} variant='grayPrimary' rounded='round'>
                    Отмена
                </Button.Link>
                <Button rounded='round'>Отправить заявку</Button>
            </div>
        </div>
    )
}
