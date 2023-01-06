import { combineReducers } from "redux";
import cartReducer from "./Cart-Reducer";
import FavoriteReducer from "./Favorite-Reducer";
import CartSelectItemReducer from './Cart-Select-Item-Reducer'
import allProductsReducer from './All-Products-Reducer'

const rootReducer = combineReducers({
    cartReducer,FavoriteReducer,CartSelectItemReducer,allProductsReducer
})

export default rootReducer;