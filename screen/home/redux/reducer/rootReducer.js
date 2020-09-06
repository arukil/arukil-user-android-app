import {locationReducer} from './location'
import {selectedItem  ,bucket} from './cart';
import {combineReducers} from 'redux'
import { personalcare } from './grocery';

const RootReducer=combineReducers({
  
    locationReducer:locationReducer,
    personalcare:personalcare,
    selectedItem: selectedItem,
    bucket:bucket,

})


export default RootReducer;