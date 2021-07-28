export function getTwoRandomNumber(len) {
    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }
    const num1 = getRandomInt(len)
    const num2 = getRandomInt(len)
    if (num1 >= num2) {
        return [num2, num1]
    } else {
        return [num1, num2]
    }
}

export function getNumberHavingDifferenceSix(start, end) {
    const diff = end - start
    if (diff > 6) {
        const diffFromEnd = diff - 6
        const newEnd = end - diffFromEnd
        return [start, newEnd]
    } else if (diff === 0) {
        return [0, 6]
    }
    return [start, end]
}