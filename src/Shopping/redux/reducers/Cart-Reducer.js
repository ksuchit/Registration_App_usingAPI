
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
                    action.payload.subTotal=action.payload.quantity * action.payload.price
                    item = action.payload
                }
                    
                return item;
            })
                return {
                    cart :plusCartItem
                }
        /* Updating the cart item quantity and subTotal. */
        case "minus_item":
                const minusCartItem = state.cart.map((item) => {
                    if (item._id === action.payload._id) {
                        action.payload.quantity-=1
                        action.payload.subTotal=action.payload.quantity * action.payload.price
                        item = action.payload
                    }
                        
                    return item;
                })               
                return {
                    cart:minusCartItem
                }
        case "CLEAR_CART":
            /* Removing the selected item from the cart. */
            console.log('clear cart')
            console.log(state.cart.filter((item) => item._id !== (action.payload.find((data) => data?._id === item?._id))?._id))
            // console.log(state.cart.filter((item, i, itemarr) => action.payload.find((data)=> itemarr)))
            const removeSelectedOnly = state.cart.filter((item) => item._id !== (action.payload.find((data) => data._id === item._id))._id)
            return {
                cart:removeSelectedOnly
            }
        default: 
            return state  
    }       
}    

export default cartReducer