

const initialFavItemState={
    sellerProducts:[]
}

const sellerProducts=(state=initialFavItemState,action)=>{

    switch(action.type){
        case 'ADD-ALL-SELLER-PRODUCTS':
        return {
           sellerProducts:action.payload 
        }
        default:
            return state
    }
}

export default sellerProducts;