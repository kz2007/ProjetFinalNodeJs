import { combineReducers } from "redux";
import rootReducer from "./rootReducer";

const reducers = combineReducers({
    allProducts: rootReducer
})

export default reducers