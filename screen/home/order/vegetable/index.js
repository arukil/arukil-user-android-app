import React from 'react'
import Recyclerview from './recyclerview';
import { View } from 'react-native';
import Cart from '../helper/cart';


function Vegetable(props) {
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', }}>
            <Recyclerview />
            <Cart navigation={props.navigation}/>
        </View>
    )
}



export default Vegetable;

