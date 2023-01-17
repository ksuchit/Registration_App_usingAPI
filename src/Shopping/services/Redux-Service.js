

export default function getCart(){
    return JSON.parse(localStorage.getItem('store')?.cartReducer?.cart) || []
}

export function getSelectedItem(){
    return JSON.parse(localStorage.getItem('store')?.CartSelectItemReducer?.selectedItem) || []
}

export function getFavorite(){
    return JSON.parse(localStorage.getItem('store')?.FavoriteReducer?.favorite) || []
}

export function getAllProducts(){
    return JSON.parse(localStorage.getItem('store')?.allProductsReducer?.allProducts) || []
}