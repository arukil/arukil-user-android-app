import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native'
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Counter from "react-native-counters";
import _ from 'lodash'



function Index(props) {

    const [list, setList] = React.useState([])
    const [bool, setbool] = React.useState(true)

    const selecterHandler = async (item, val, index) => {

        let arr = props.bucket;
        let obj = props.bucket[index]
        if (val === 0) {
            return props.REMOVE_FROM_BUCKET(obj)
        }
        else {
            arr[index] = {
                ...obj,
                quantity: val,
                totalPrice: obj.price * val,
                netWeight: item.calculate * val
            }
            return props.UPDATE_TO_BUCKET(arr)

        }
    }


    React.useEffect(() => {
        setList(props.bucket)
    }, [props.bucket])

    React.useEffect(() => {
        setList(props.bucket)
    }, [])




    const renderItem = ({ item, index }) => {
        const { name, image, flavour, price, weight, totalPrice, netWeight, quantity } = item;

        return (
            <View style={styles.listView}>
                <Image source={{ uri: image }} resizeMode='center' style={styles.image} />
                <View style={styles.listContent}>
                    {!flavour ?
                        <Text style={styles.listname} numberOfLines={1}>{name}</Text>
                        :
                        <Text style={{ color: '#4f4f4f' }} numberOfLines={1}>{flavour}</Text>
                    }
                    <View style={styles.subdiv}>
                        <Text style={{ color: '#999' }}>{weight}</Text>
                        <Counter
                            start={quantity}
                            onChange={(val) => selecterHandler(item, val, index)}
                            max={5}
                            min={0}
                        />
                        <Text style={styles.price}>
                            <MaterialCommunityIcons name='currency-inr' size={15} color={'#000'} />
                            {totalPrice}
                        </Text>
                    </View>
                </View>
            </View>
        )
    };








    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.location}>
                    <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.pop()}
                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '65%' }}>
                        <MaterialCommunityIcons name='arrow-left' size={22} color={'#4f4f4f'} />
                        <Text style={{ color: '#4f4f4f', fontWeight: '700', fontSize: 16 }}>
                            Delivery Address
                        </Text>
                    </TouchableOpacity>
                    <Text numberOfLines={2} style={{ fontSize: 12, color: '#4f4f4f', paddingTop: 5 }} >{props.location.formatted_address}</Text>
                </View>
                <TouchableOpacity style={styles.changeLocation} activeOpacity={0.7} onPress={() => props.navigation.navigate('GetLocation')}>
                    <Text style={{ color: '#E91E63', padding: 5 }} >Change</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.body}>
                <FlatList
                    extraData={list}
                    data={list}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={4}
                    maxToRenderPerBatch={3}
                    removeClippedSubviews={false}
                    showsVerticalScrollIndicator={false}
                    key={list.length}

                />
            </View>
        </View>
    )
}



const mapStateToProps = (state) => {
    return {
        location: state.locationReducer.location,
        bucket: state.bucket.item

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        CURRENT_LOCATION: (data) => {
            dispatch({ type: 'CURRENT_LOCATION', data })
        },
        ADD_TO_BUCKET: (data) => {
            dispatch({ type: 'ADD_TO_BUCKET', data })
        },
        UPDATE_TO_BUCKET: (data) => {
            dispatch({ type: 'UPDATE_TO_BUCKET', data })
        },
        REMOVE_FROM_BUCKET: (data) => {
            dispatch({ type: 'REMOVE_FROM_BUCKET', data })
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Index)

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff'
    },
    header: {
        padding: 10,
        backgroundColor: '#eefcf4',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    location: {
        width: '70%'
    },
    body: {
        flex: 1
    },
    listView: {
        width: '100%',
        height: 120,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderBottomWidth: 0.2,
        borderColor: '#ddd',
    },
    listContent: {
        width: '65%',
        height: '80%',
        justifyContent: 'space-around',
    },
    image: {
        width: '25%',
        height: '55%',
        borderRadius: 5,
        aspectRatio: 1
    },
    listname: {
        width: '90%',
        fontSize: 14,
        fontWeight: '600',
        color: '#4f4f4f'
    },
    overlayBtn: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '70%',
        padding: 4,
        borderWidth: 0.25,
        borderRadius: 5,
    },
    subdiv: {
        width: '95%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    price: {
        fontSize: 15,
        fontWeight: '700',
        color: '#5e5b54'
    },
})
