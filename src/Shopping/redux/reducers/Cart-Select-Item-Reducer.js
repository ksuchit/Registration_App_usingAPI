
const initialSelectItemState={
    selectedItem:[]
}

const CartSelectItemReducer=(state=initialSelectItemState,action)=>{

    switch(action.type){
        
        case 'SELECT-ITEM':
            let updatedArr=[];
            console.log(state)
            if(state.selectedItem.find((data)=>data._id===action.payload._id))
             updatedArr=state.selectedItem.filter((item)=>item._id!==action.payload._id)
            else
             updatedArr=[...state.selectedItem,action.payload]

            return {
                selectedItem:updatedArr
            }
        
        case 'SELECT-ALL-ITEMS':
            return{
                selectedItem:action.payload
            }

        case 'DISELECT-ALL-ITEMS':
            return{
                selectedItem:[]
            }
        default:
            return state
    }
}

export default CartSelectItemReducer;