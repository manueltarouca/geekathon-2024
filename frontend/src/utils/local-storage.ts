export const setLocalStorage = (name: string, value: string) => {
    localStorage.setItem(name, value);
    return localStorage.getItem(name);
}

export const getLocalStorage = (name: string) => {
    return localStorage.getItem(name);
}

export const removeLocalStorage = (name: string) => {
    localStorage.removeItem(name);
}