import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as Animation from 'react-native-animatable';

function AddCartContainer(props) {


    React.useEffect(() => {
        var totalPrice = 0, totalWeight = 0;
        if (props.bucket.length > 0) {
            for (let index = 0; index < props.bucket.length; index++) {
                totalPrice = totalPrice + props.bucket[index].totalPrice;
                totalWeight = totalWeight + props.bucket[index].netWeight;
            }
            totalWeight = totalWeight.toFixed(2);
            return props.TOTAL_WEIGHT_PRICE({
                totalPrice,
                totalWeight,
            })
        }
    }, [props.bucket])


    return (
        props.bucket.length > 0 ?
            <TouchableOpacity style={styles.cart} animation={'fadeInUp'} activeOpacity={0.9}
                onPress={() => props.navigation.navigate('Cart')} >
                <Text style={{ color: '#fff', fontWeight: '700' }}>{props.bucket.length} item |
                <MaterialCommunityIcons name='currency-inr' size={15} color={'#fff'} />{props.twp.totalPrice + ' | ' + props.twp.totalWeight + ' Kg'}
                </Text>
                <View style={styles.rightcart} >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '700' }}>View Cart </Text>
                    <MaterialCommunityIcons name='chevron-right' size={20} color={'#fff'} />
                </View>
            </TouchableOpacity> : null

    )
}

const mapStateToProps = state => {
    return {
        bucket: state.bucket.item,
        twp: state.twp.pw
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

        ADD_TO_BUCKET: (data) => {
            dispatch({ type: 'ADD_TO_BUCKET', data })
        },
        BUCKET_RESET: () => {
            dispatch({ type: 'BUCKET_RESET' })
        },
        TOTAL_WEIGHT_PRICE: (data) => {
            dispatch({ type: 'TOTAL_WEIGHT_PRICE', data })
        },

    };
}


export default connect(mapStateToProps, mapDispatchToProps)(AddCartContainer)

const styles = StyleSheet.create({
    cart: {
        paddingHorizontal: 5,
        paddingVertical: 15,
        backgroundColor: '#009c02',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightcart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },
})
