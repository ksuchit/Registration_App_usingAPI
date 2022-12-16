
export default function getToken() {
    return(JSON.parse(localStorage.getItem('customerToken')))
}

export function setToken(data) {
    return(localStorage.setItem('customerToken',JSON.stringify(data)))
}

export function removeToken() {
    return(localStorage.removeItem('customerToken'))
}

export function clearLocalStorage() {
    return(localStorage.clear())
}