import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import * as Animation from 'react-native-animatable';

function AddCartContainer(props) {

    const [totalprice, setPrice] = React.useState(0)

    React.useEffect(() => {
        setPrice(0)
        // props.bucket.map(({ price, quantity }) => setPrice( += (price * quantity)))

    }, [props.bucket])



 


    return (

        props.bucket.length > 0 ? <TouchableOpacity style={styles.cart}  activeOpacity={0.9} onPress={() => props.navigation.navigate('Cart')}>
            <Text style={{ color: '#fff' }}>{props.bucket.length} item.{}10 Kg.
            <MaterialCommunityIcons name='currency-inr' size={15} color={'#fff'} />566</Text>
            <View style={styles.rightcart} >
                <Text style={{ color: '#fff', fontSize: 16 ,fontWeight:'bold' }}>View Cart </Text>
                <MaterialCommunityIcons name='chevron-right' size={18} color={'#fff'} />
            </View>
        </TouchableOpacity> : null

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
        backgroundColor: '#009c02',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    rightcart: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        padding: 10,
    },
})
