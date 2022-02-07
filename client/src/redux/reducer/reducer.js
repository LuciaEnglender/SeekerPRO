import {combineReducers} from 'redux'
import rootReducer from '../reducer'
import rootReducerPostulante from '../reducer/indexP'


export default combineReducers({
    rootReducer, 
    rootReducerPostulante
})