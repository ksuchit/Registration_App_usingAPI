import { legacy_createStore as createStore} from 'redux'
import rootReducer from "./Shopping/redux/reducers/Root-Reducer";


const store = createStore(rootReducer,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());

export default store;