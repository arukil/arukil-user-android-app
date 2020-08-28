import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as Animation from 'react-native-animatable';

function AddCartContainer(props) {
    return (

        props.bucket.length > 0 ? <Animation.View style={styles.cart} animation={'fadeInUp'}>
            <Text style={{ color: '#fff' }}>{props.bucket.length} item. 10 Kg. 
            <MaterialCommunityIcons name='currency-inr' size={15} color={'#fff'} />566</Text>
            <TouchableOpacity style={styles.rightcart} onPress={() => props.BUCKET_RESET()}>
                <Text style={{ color: '#fff', fontSize: 16 }}>View Cart </Text>
                <MaterialCommunityIcons name='chevron-right' size={18} color={'#fff'} />
            </TouchableOpacity>
        </Animation.View> : null

    )
}

const mapStateToProps = state => {
    return {
        bucket: state.bucket.item
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        ADD_TO_BUCKET: (data) => {
            dispatch({ type: 'ADD_TO_BUCKET', data })
        },
        BUCKET_RESET: () => {
            dispatch({ type: 'BUCKET_RESET' })
        }



    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCartContainer)

const styles = StyleSheet.create({
    cart: {
        padding: 5,
        backgroundColor: '#e91e63',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    rightcart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding:10,
    },
})
