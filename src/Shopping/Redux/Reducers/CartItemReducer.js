
// const initialCartState = 1;

// const cartItemReducer = (state = initialCartState, action) => {
//     switch (action.type) {
//         case "plus_item": 
//         const plusCartItem = state.cart.map((item) => {
//             if (item._id === action.payload._id) {
//                 action.payload.quantity+=1
//                 item = action.payload
//             }
                
//             return item;
//         })
//             return {
//                 cart :plusCartItem
//             }
//         case "minus_item":
//             const minusCartItem = state.cart.map((item) => {
//                 if (item._id === action.payload._id) {
//                     action.payload.quantity-=1
//                     item = action.payload
//                 }
                    
//                 return item;
//             })               
//             return {
//                 cart:minusCartItem
//             }
//         default: 
//             return state  
//     }       
// }    

// export default cartItemReducer