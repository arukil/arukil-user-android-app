import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Modal from 'react-native-modal';
import { connect } from 'react-redux'


function ModalView(props) {

    const [ismodelVisible, setModelVisible] = React.useState(false);
    
    React.useEffect(() => {
        Object.keys(props.item).length > 0 ? setModelVisible(true) : setModelVisible(false)
    }, [props.item]);


    const passDataToReduxHandler = async () => {

        let obj = await props.bucket.find(({ name }) => name === props.item.name)
        if (obj) {
            await Object.assign(obj, { quantity: obj.quantity + 1 });
            return props.ITEM_RESET({});
        }
        else {
            await Object.assign(props.item, { quantity: 1, type: 'vegetable' });
            await props.ADD_TO_BUCKET(props.item)
            return props.ITEM_RESET({});
        }
    }

    return (

        <Modal isVisible={ismodelVisible} onBackButtonPress={() => props.ITEM_RESET({})}
            onSwipeComplete={() => props.ITEM_RESET({})} animationOutTiming={500} swipeDirection='down' onBackdropPress={() => props.ITEM_RESET({})} style={styles.bottomModal}>
            <View style={styles.modal} >
                <Text style={{ padding: 10, backgroundColor: '#e9f2f7', fontSize: 16 }}>{props.item.name}</Text>
                <Text style={{ marginLeft: 10, fontSize: 16 }}>Available Quantities</Text>

                <View style={{ padding: 20, borderTopWidth: 3, borderColor: '#f5f5f5' }}>
                    <TouchableOpacity activeOpacity={0.9} style={{ padding: 12, backgroundColor: 'green', justifyContent: 'center', alignItems: 'center' }}
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
        justifyContent: 'space-between'
    },
})
