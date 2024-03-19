const setLocalStorage = (key, value) => {
    return localStorage.setItem(key, JSON.stringify(value))
}

const getLocalStorage = (key) => {
    return JSON.parse(localStorage.getItem(key))
}

const clearLocalStorage = (key) => {
    return localStorage.removeItem(key)
}

export { setLocalStorage, getLocalStorage, clearLocalStorage }
