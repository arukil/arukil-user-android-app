import {locationReducer} from './location'
import {selectedItem  ,bucket} from './cart';
import {combineReducers} from 'redux'

const RootReducer=combineReducers({
  
    locationReducer:locationReducer,
    selectedItem: selectedItem,
    bucket:bucket,

})


export default RootReducer;