

export const addAllProducts = (item) => {
    console.log(item)
    return {
        type: "ADD_ALL_PRODUCTS",
        payload:item
    }
}