import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Counter from "react-native-counters";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'


function CartAddBtn(props) {

    const item = props.data;

    const [quantity, setQuantity] = React.useState(0)

    React.useEffect(() => {
         
      console.log(props.bucket)
    }, [props.bucket]);


    const selecterHandler = async (item) => {
        let obj = await props.bucket.find(({ name }) => name === item.name)
        if (obj) {
            await Object.assign(obj, { quantity: obj.quantity + 1 });
            return setQuantity(obj.quantity);
        }
        else {
            await props.ADD_TO_BUCKET({
                name: item.name,
                image: item.image,
                quantity: 1,
                price: item.available[0].price,
                weight: item.available[0].weight,
                type: item.type
            })
            return setQuantity(1);
        }

    }

    return (

        quantity === 0  ?
            <TouchableOpacity activeOpacity={1} onPress={() => selecterHandler(item)} style={styles.btnContainer}>
                <View style={styles.button}>
                    <Text style={{ fontSize: 10, color: '#e91e63' }}>ADD</Text>
                    <MaterialCommunityIcons name='plus' color={'#e91e63'} />
                </View>
            </TouchableOpacity>
            :
            <Counter
                min={0}
                onChange={() => selecterHandler(item)}
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
