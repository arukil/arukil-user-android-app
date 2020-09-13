import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as Animation from 'react-native-animatable';

function AddCartContainer(props) {

    const [wp, setWp] = React.useState({
        price: 0,
        Weight: 0
    });

    React.useEffect(() => {
        if (props.bucket.length > 0) {
            var totalPrice = 0, netWeight = 0;
            for (let index = 0; index < props.bucket.length; index++) {
                totalPrice = totalPrice + props.bucket[index].totalPrice;
                netWeight = netWeight + props.bucket[index].netWeight;
            }
            setWp({
                price: totalPrice,
                Weight: netWeight
            })
        }
    }, [props.bucket])



    return (
        props.bucket.length > 0 ?
            <TouchableOpacity style={styles.cart} animation={'fadeInUp'} activeOpacity={0.9}
                onPress={() => props.navigation.navigate('Cart')} >
                <Text style={{ color: '#fff' }}>{props.bucket.length} item | 
                <MaterialCommunityIcons name='currency-inr' size={15} color={'#fff'} />{wp.price + ' | ' + wp.Weight + ' Kg'}
                </Text>
                <View style={styles.rightcart} >
                    <Text style={{ color: '#fff', fontSize: 16, fontWeight: '800' }}>View Cart </Text>
                    <MaterialCommunityIcons name='chevron-right' size={18} color={'#fff'} />
                </View>
            </TouchableOpacity> : null

    )
}

const mapStateToProps = state => {
    return {
        bucket: state.bucket.item,
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
