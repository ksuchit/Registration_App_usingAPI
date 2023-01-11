

export const addItemToCart = (item) => {
    return {
        type: "ADD_ITEM_TO_CART",
        payload:item
    }
}

export const deleteItemFromCart = (item) => {
    return {
        type: "DELETE_ITEM_FROM_CART",
        payload:item
    }
}

export const clearCart = () => {
    return {
        type: "CLEAR_CART"
    }
}