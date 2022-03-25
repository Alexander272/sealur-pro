import { useState } from "react"

export const useMat = () => {
    const [isOpenIr, setIsOpenIr] = useState(false)
    const [isOpenOr, setIsOpenOr] = useState(false)
    const [isOpenFr, setIsOpenFr] = useState(false)

    const openIrHandler = (isOpen: boolean) => setIsOpenIr(isOpen)
    const openOrHandler = (isOpen: boolean) => setIsOpenOr(isOpen)
    const openFrHandler = (isOpen: boolean) => setIsOpenFr(isOpen)

    return { isOpenIr, openIrHandler, isOpenOr, openOrHandler, isOpenFr, openFrHandler }
}
