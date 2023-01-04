import { combineReducers } from "redux";
import cartReducer from "./Cart-Reducer";
import FavoriteReducer from "./Favorite-Reducer";
import CartSelectItemReducer from './Cart-Select-Item-Reducer'
const rootReducer = combineReducers({
    cartReducer,FavoriteReducer,CartSelectItemReducer
})

export default rootReducer;