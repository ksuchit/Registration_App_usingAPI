
const initialCartState = {    
    cart: []                              
}

const cartReducer = (state = initialCartState, action) => {
    switch (action.type) {
        case "ADD_ITEM_TO_CART": 
            return {
                cart : [
                    ...state.cart,
                    action.payload
                ]
            }
        case "DELETE_ITEM_FROM_CART":
            const updatedCart=state.cart.filter((item)=>item._id!==action.payload._id)                
            return {
                cart:updatedCart
            }
        case "plus_item": 
            const plusCartItem = state.cart.map((item) => {
                if (item._id === action.payload._id) {
                    action.payload.quantity+=1
                    item = action.payload
                }
                    
                return item;
            })
                return {
                    cart :plusCartItem
                }
        case "minus_item":
                const minusCartItem = state.cart.map((item) => {
                    if (item._id === action.payload._id) {
                        action.payload.quantity-=1
                        item = action.payload
                    }
                        
                    return item;
                })               
                return {
                    cart:minusCartItem
                }
        default: 
            return state  
    }       
}    

export default cartReducer