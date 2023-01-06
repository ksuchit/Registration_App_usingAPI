

const initialAllProductsReducer={
    allProducts:[]
}

const allProductsReducer=(state=initialAllProductsReducer,action)=>{
    switch(action.type){
        case 'ADD_ALL_PRODUCTS':
            action.payload.map((item)=>state.allProducts.push(item))
            return{
                allProducts:state.allProducts
            }
        default:
            return state
            
    }
}

export default allProductsReducer;