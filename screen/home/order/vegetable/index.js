import React from 'react'
import Recyclerview from './recyclerview';
import { View } from 'react-native';
import Cart from '../helper/vf_helper/cart';
import Quantitycard from '../helper/vf_helper/quantitycard';
import { connect } from 'react-redux'


function Vegetable(props) {
    return (
        <View style={{ flex: 1, backgroundColor: '#ffffff', }}>
            <Recyclerview />
            <Cart />
            {Object.keys(props.item).length > 0 ? <Quantitycard /> : null}
        </View>
    )
}


const mapStateToProps = state => {
    return {
        item: state.selectedItem.item,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ADD_ITEM: (data) => {
            dispatch({ type: 'ADD_ITEM', data })
        },
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Vegetable);

