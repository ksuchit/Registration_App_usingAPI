
export default function getShopToken() {
    return(JSON.parse(localStorage.getItem('customerToken')))
}

export function setShopToken(data) {
    return(localStorage.setItem('customerToken',JSON.stringify(data)))
}

export function removeShopToken() {
    return(localStorage.removeItem('customerToken'))
}

export function clearShopLocalStorage() {
    return(localStorage.clear())
}