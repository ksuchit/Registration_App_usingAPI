

export const plusItem = (item) => {
    return {
        type: 'plus_item',
        payload:item
    }
}

export const minusItem = (item) => {
    return {
        type: 'minus_item',
        payload:item
    }
}