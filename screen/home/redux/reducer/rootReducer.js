import {locationReducer} from './location'
import {counter} from './counter';
import {combineReducers} from 'redux'

const RootReducer=combineReducers({

    locationReducer:locationReducer,
    counter: counter
})


export default RootReducer;