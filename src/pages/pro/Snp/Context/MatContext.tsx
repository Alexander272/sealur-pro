import { createContext } from "react"

export const MatContext = createContext({
    isOpenIr: false,
    isOpenOr: false,
    isOpenFr: false,

    openIrHandler: (isOpen: boolean) => {},
    openOrHandler: (isOpen: boolean) => {},
    openFrHandler: (isOpen: boolean) => {},
})
