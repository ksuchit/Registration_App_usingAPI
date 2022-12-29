

export const addToFavorite=(item)=>{
    return({
        type:'ADD_TO_FAVORITE',
        payload:item
    })
}

export const removeFromFavorite=(item)=>{
    return({
        type:'REMOVE_FROM_FAVORITE',
        payload:item
    })
}