import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Counter from "react-native-counters";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'


function CartAddBtn(props) {

    const item = props.data;

    const [quantity, setQuantity] = React.useState(0)

    React.useEffect(() => {


    }, [])

    const selecterHandler = async (item, val) => {
        console.log(props.bucket)
        let obj = await props.bucket.find(({ name }) => name === item.name)
        if (obj) {
            console.log(obj.name + ' ' + obj.quantity)
            await Object.assign(obj, { quantity: val });
            if (obj.quantity === 0) {
                props.REMOVE_FROM_BUCKET(obj)
            }
            return;
        }
        else {
            await props.ADD_TO_BUCKET({
                brand: item.brand ? item.brand : '',
                name: item.name,
                image: item.image,
                quantity: val,
                price: item.available[0].price,
                weight: item.available[0].weight,
                type: item.type
            })
            return;
        }
    }

    return (

        !props.bucket.find(({ name, brand }) => name === item.name && brand === item.brand) ?
            <TouchableOpacity activeOpacity={1} onPress={() => selecterHandler(item, 1)} style={styles.btnContainer}>
                <View style={styles.button}>
                    <Text style={{ fontSize: 10, color: '#e91e63' }}>ADD</Text>
                    <MaterialCommunityIcons name='plus' color={'#e91e63'} />
                </View>
            </TouchableOpacity>
            :
            <Counter
                min={0}
                onChange={(val) => selecterHandler(item, val)}
                start={1}
                max={5}
            />
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
        REMOVE_FROM_BUCKET: (data) => {
            dispatch({ type: 'REMOVE_FROM_BUCKET', data })
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(CartAddBtn)


const styles = StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
    },
    button: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: 80,
        height: 28,
        borderWidth: 0.5,
        borderRadius: 5,
        borderColor: '#ddd',
        backgroundColor: '#ffffff',
        elevation: 1,
    },

})
