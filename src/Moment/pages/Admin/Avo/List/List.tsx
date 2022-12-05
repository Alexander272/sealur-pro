import React, { FC } from "react"
import { NavLink } from "react-router-dom"
import classes from "../avo.module.scss"

type Props = {}

export const List: FC<Props> = () => {
    return (
        <div className={classes.list}>
            <NavLink
                to='device-mod'
                className={({ isActive }) =>
                    isActive ? [classes.link, classes.active].join(" ") : classes.link
                }
            >
                Модификация аппарата
            </NavLink>
            <NavLink
                to='pressure'
                className={({ isActive }) =>
                    isActive ? [classes.link, classes.active].join(" ") : classes.link
                }
            >
                Условное давление
            </NavLink>
            <NavLink
                to='tube-count'
                className={({ isActive }) =>
                    isActive ? [classes.link, classes.active].join(" ") : classes.link
                }
            >
                Число рядов труб в секции
            </NavLink>
            <NavLink
                to='finning-factor'
                className={({ isActive }) =>
                    isActive ? [classes.link, classes.active].join(" ") : classes.link
                }
            >
                Коэффициент оребрения
            </NavLink>
            <NavLink
                to='section-execution'
                className={({ isActive }) =>
                    isActive ? [classes.link, classes.active].join(" ") : classes.link
                }
            >
                Материальное исполнение секции
            </NavLink>
            <NavLink
                to='tube-length'
                className={({ isActive }) =>
                    isActive ? [classes.link, classes.active].join(" ") : classes.link
                }
            >
                Длина оребренных труб в секции
            </NavLink>
            <NavLink
                to='number-of-moves'
                className={({ isActive }) =>
                    isActive ? [classes.link, classes.active].join(" ") : classes.link
                }
            >
                Число ходов по трубному пространству
            </NavLink>
            <NavLink
                to='name-gasket'
                className={({ isActive }) =>
                    isActive ? [classes.link, classes.active].join(" ") : classes.link
                }
            >
                Тип прокладки
            </NavLink>
        </div>
    )
}
