import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity,} from 'react-native'
import Modal from 'react-native-modal';
import { connect } from 'react-redux'
import { CheckBox } from 'react-native-elements'
import Counter from "react-native-counters";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


function ModalView(props) {

    const [ismodelVisible, setModelVisible] = React.useState(true);
    const [selected, setSelected] = React.useState(false);

    React.useEffect(() => {
        Object.keys(props.item).length > 0 ? setModelVisible(true) : setModelVisible(false)
    }, [props.item])

    const passDataToReduxHandler = async () => {

        let obj = await props.bucket.find(({ name }) => name === props.item.name)
        if (obj) {

            // await Object.assign(obj, { quantity: obj.quantity + 1 });
            // return props.ITEM_RESET({});
        }
        else {
            // await Object.assign(props.item.quantity,0);
            await props.ADD_TO_BUCKET({
                name: props.item.name,
                image: props.item.image,
                quantity: 1,
                price: props.item.price
            })
            return props.ITEM_RESET({});
        }
    }

    const AvailableQuantity = props.item.available.map((val, index) => {
        return <TouchableOpacity style={{ width: '95%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '' }} key={index}>
            <CheckBox
                containerStyle={{ backgroundColor: '#fff', borderWidth: 0 }}
                onPress={() => setSelected(true)}
                title={val.weight}
                checkedColor={'#e91e63'}
                checkedIcon='dot-circle-o'
                uncheckedIcon='circle-o'
                checked={selected}
                textStyle={{ color: '#999' }}
            />

            <Text><MaterialCommunityIcons name='currency-inr' size={15} color={'#000'} /> {val.price}</Text>
        </TouchableOpacity>

    })




    return (

        <Modal isVisible={ismodelVisible} onBackButtonPress={() => props.ITEM_RESET({})}
            onSwipeComplete={() => props.ITEM_RESET({})} animationOutTiming={500} swipeDirection='down' onBackdropPress={() => props.ITEM_RESET({})} style={styles.bottomModal}>
            <View style={styles.modal} >
                <Text style={{ padding: 10, backgroundColor: '#e8f0ff', fontSize: 18 }}>{props.item.name}</Text>
                {AvailableQuantity}
                <View style={{ padding: 15, borderTopWidth: 3, borderColor: '#f5f5f5', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Counter />
                    <TouchableOpacity activeOpacity={0.9} style={{ width: '60%', height: 45, backgroundColor: '#009C0F', justifyContent: 'center', alignItems: 'center' }}
                        onPress={() => passDataToReduxHandler()}>
                        <Text style={{ color: '#fff' }}>Add Item</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
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
        ITEM_RESET: (data) => {
            dispatch({ type: 'ITEM_RESET', data })
        },
        ADD_TO_BUCKET: (data) => {
            dispatch({ type: 'ADD_TO_BUCKET', data })
        },



    };
}


export default connect(mapStateToProps, mapDispatchToProps)(ModalView)






const styles = StyleSheet.create({

    bottomModal: {
        justifyContent: 'flex-end',
        margin: 0,
    },
    modal: {
        flex: 0.45,
        backgroundColor: '#fff',
        borderColor: 'rgba(0, 0, 0, 0.1)',
        justifyContent: 'space-between',
    },
})
