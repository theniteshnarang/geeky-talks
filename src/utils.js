export const shortNumber = (number) => {
    let rounded
    if (number >= 1000000) {
        const temp = number / 1000000
        rounded = Math.round(temp * 10) / 10 + 'M'
    } else if (number >= 1000) {
        const temp = number / 1000
        rounded = Math.round(temp * 10) / 10 + 'K'
    }
    return rounded || number
}

export const backroundUnscrollable = (isModelOpen) => {
    if (isModelOpen) {
        document.body.style.overflow = 'hidden'
    } else {
        document.body.style.overflow = 'visible'
    }
}
