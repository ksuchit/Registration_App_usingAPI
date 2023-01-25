
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
        case 'DESELECT-ITEM':
            const arr=state.selectedItem.filter((item)=>item._id!==action.payload._id)
            return {
                selectedItem:arr
            }
        case 'SELECT-ALL-ITEMS':
            return{
                selectedItem:action.payload
            }

        case 'DISELECT-ALL-ITEMS':
            return{
                selectedItem:[]
            }
        case 'SELECT-BUY-ONE-ITEM':
            return {
                selectedItem:[action.payload]
            }
        case "CHANGE-QUANTITY":
            const changeArr = state.selectedItem.map((item) => {
                if (item._id === action.payload.item._id) {
                    item.quantity=action.payload.quantity
                }
                return item
            })
            return {
                selectedItem:changeArr
            }
        default:
            return state
    }
}

export default CartSelectItemReducer;