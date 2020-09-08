import React from 'react'
import Recyclerview from './recyclerview';
import { View } from 'react-native';
import Cart from '../helper/vf_helper/cart';
import { connect } from 'react-redux'


function Vegetable(props) {
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', }}>
            <Recyclerview />
            <Cart />
        </View>
    )
}



export default Vegetable;

