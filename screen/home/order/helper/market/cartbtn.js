import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Counter from "react-native-counters";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'


function CartAddBtn(props) {

    const [state, setstate] = React.useState({
        quantity: 0,
    })

    React.useEffect(() => {
           
    }, []);

    return (
        <>
            {state.quantity === 0 ?
                <TouchableOpacity style={styles.button} activeOpacity={1} onPress={() => props.ADD_ITEM(props.data)}>
                    <Text style={{ fontSize: 10, color: '#e91e63' }}>ADD</Text>
                    <MaterialCommunityIcons name='plus' color={'#e91e63'} />
                </TouchableOpacity>
                :
                <Counter
                    min={0}
                    onChange={(val) => this.setState({ quantity: val })}
                    start={1}
                    max={5}
                />}
        </>
    )
}









const mapStateToProps = state => {
    return {
        item: state.selectedItem.item,
        bucket: state.bucket.item
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        ADD_ITEM: (data) => {
            dispatch({ type: 'ADD_ITEM', data })
        },
        ADD_BUCKET: (data) => {
            dispatch({ type: 'ADD_BUCKET', data })
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(CartAddBtn)






const styles = StyleSheet.create({
    button: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        flexDirection: 'row',
        width: 80,
        height: 30,
        borderWidth: 0.5,
        borderRadius: 1,
        borderColor: '#ddd',
        backgroundColor: '#ffffff',
        elevation: 1,
    },

})
