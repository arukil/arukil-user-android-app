import {locationReducer} from './location'
import { bucket} from './cart';
import {combineReducers} from 'redux'
import { personalcare } from './grocery';

const RootReducer=combineReducers({
  
    locationReducer:locationReducer,
    personalcare:personalcare,
    bucket:bucket,

})


export default RootReducer;