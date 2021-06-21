import { combineReducers } from "redux";
import taskReducer from "./mainReducer";

const allReducers = combineReducers({
   data : taskReducer
})
export default allReducers;