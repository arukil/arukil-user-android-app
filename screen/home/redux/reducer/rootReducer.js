import {locationReducer ,userLocationReducer} from './location'
import { bucket , twp} from './cart';
import {combineReducers} from 'redux'
import { personalcare } from './grocery';

const RootReducer=combineReducers({
  
    locationReducer:locationReducer,
    userLocationReducer:userLocationReducer,
    personalcare:personalcare,
    bucket:bucket,
    twp:twp

})


export default RootReducer;