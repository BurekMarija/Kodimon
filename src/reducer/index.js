import pobjednikReducer from "./pobjednik";
import logsReducer from "./logsReducer";
import { combineReducers } from "redux";

const allReducers = combineReducers({
  logsReducer: logsReducer,
  pobjednikReducer: pobjednikReducer,
});
export default allReducers;
