
export default function getToken() {
    return(JSON.parse(localStorage.getItem('token')))
}

export function setToken(data) {
    return(localStorage.setItem('token',JSON.stringify(data)))
}

export function removeToken() {
    return(localStorage.removeItem('token'))
}

export function clearLocalStorage() {
    return(localStorage.clear())
}