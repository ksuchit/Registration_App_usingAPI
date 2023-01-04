
const initialFavItemState={
    favorite:[]
}

const FavoriteReducer=(state=initialFavItemState,action)=>{

    switch(action.type){
        
        case 'ADD_TO_FAVORITE':
            return{
                favorite: [...state.favorite,action.payload]
            }
        case 'REMOVE_FROM_FAVORITE':
            const updatedFav=state.favorite.filter((item)=>item._id!==action.payload._id)
            return{
                favorite:updatedFav
            }
        default:
            return state
    }
}

export default FavoriteReducer;