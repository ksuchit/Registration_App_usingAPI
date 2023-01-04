

export default function setLoader(data){
    return(localStorage.setItem('loader',data))
}

export function getLoader() {
    return(localStorage.getItem('loader'))
}