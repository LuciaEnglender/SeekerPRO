import { combineReducers } from "redux";
import rootReducer from "../reducer";
import rootReducerPostulante from "../reducer/indexP";
import rootReducerLanding from "../reducer/indexL";

export default combineReducers({
  rootReducer,
  rootReducerPostulante,
  rootReducerLanding,
});
