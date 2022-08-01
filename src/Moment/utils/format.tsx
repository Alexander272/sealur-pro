export const formatNumber = (num: number): string | JSX.Element => {
    if (num < 0.001) {
        let tmp = num.toLocaleString("ru-RU", { notation: "scientific" })
        tmp = tmp.replaceAll(/E|e/g, "*10^")
        let parts = tmp.split("^")

        return (
            <>
                {parts[0]}
                <sup>{parts[1]}</sup>
            </>
        )
    } else {
        return num.toLocaleString("ru-Ru")
    }
}
