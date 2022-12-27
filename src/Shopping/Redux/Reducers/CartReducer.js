
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
        default: 
            return state  
    }       
}    

export default cartReducer