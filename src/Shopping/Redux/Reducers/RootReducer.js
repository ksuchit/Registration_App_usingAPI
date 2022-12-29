import { combineReducers } from "redux";
import cartReducer from "./CartReducer";
import FavoriteReducer from "./FavoriteReducer";
const rootReducer = combineReducers({
    cartReducer,FavoriteReducer
})

export default rootReducer;