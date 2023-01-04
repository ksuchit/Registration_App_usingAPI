
export const selectItem = (item) => {
    return {
        type: 'SELECT-ITEM',
        payload:item
    }
}

export const diSelectItem = (item) => {
    return {
        type: 'DISELECT-ITEM',
        payload:item
    }
}

export const selectAllItems=(item)=>{
    return{
        type:'SELECT-ALL-ITEMS',
        payload:item
    }
}

export const diSelectAllItems=()=>{
    return{
        type:'DISELECT-ALL-ITEMS',
    }
}