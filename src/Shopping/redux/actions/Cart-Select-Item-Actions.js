
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