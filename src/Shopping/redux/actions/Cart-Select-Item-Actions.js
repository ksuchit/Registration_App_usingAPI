
export const selectItem = (item) => {
    return {
        type: 'SELECT-ITEM',
        payload:item
    }
}

export const deSelectItem = (item) => {
    return {
        type: 'DESELECT-ITEM',
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

export const selectBuyOneItem = (item) => {
    return {
        type: 'SELECT-BUY-ONE-ITEM',
        payload:item
    }
}