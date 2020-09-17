import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList ,TouchableHighlight} from 'react-native'
import { connect } from 'react-redux';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Counter from "react-native-counters";
import _ from 'lodash'



function Index(props) {


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

    const renderItem = ({ item, index }) => {
        const { name, image, flavour, price, weight, totalPrice, netWeight, quantity } = item;

        return (
            <View style={styles.listView}>
                <Image source={{ uri: image }} resizeMode='center' style={styles.image} />
                <View style={styles.listContent}>
                    {!flavour ?
                        <Text style={styles.listname} numberOfLines={2}>{name}{' ('}{weight + ')'}</Text>
                        :
                        <Text style={{ color: '#4f4f4f' }} numberOfLines={1}>{flavour}</Text>
                    }
                    <View style={styles.subdiv}>
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
            <View style={styles.body}>
                <FlatList
                    data={props.bucket}
                    renderItem={renderItem}
                    keyExtractor={(item, index) => index.toString()}
                    initialNumToRender={4}
                    maxToRenderPerBatch={3}
                    removeClippedSubviews={false}
                    showsVerticalScrollIndicator={false}
                    key={props.bucket.length}
                />
            </View>

            <View style={styles.footer}>
                <View style={styles.location}>
                    <View style={{ width: '80%' }}>
                        <Text style={{ color: '#4f4f4f', fontWeight: '700', fontSize: 14 }}>
                            <MaterialCommunityIcons name='checkbox-marked-circle' size={15} color={'green'} />Delivery Address</Text>
                        <Text numberOfLines={1} style={{ fontSize: 12, color: '#4f4f4f' }} >{props.location.formatted_address}</Text>
                    </View>
                    <TouchableOpacity style={{ padding: 5 }} activeOpacity={0.7} onPress={() => props.navigation.navigate('GetLocation')}>
                        <Text style={{ color: '#E91E63', textDecorationLine: 'underline' }}  >Change</Text>
                    </TouchableOpacity>
                  
                </View>
                <TouchableOpacity style={styles.paybtn} activeOpacity={0.9} >
                    <Text style={{ color: '#fff', fontWeight: '700', fontSize: 15 }} >
                        <Text>Pay</Text>
                        <MaterialCommunityIcons name='currency-inr' size={15} color={'#fff'} />
                        <Text>{props.twp.totalPrice}</Text>
                    </Text>
                </TouchableOpacity>
                
            </View>
        </View>
    )
}

const mapStateToProps = (state) => {
    return {
        location: state.locationReducer.location,
        bucket: state.bucket.item,
        twp: state.twp.pw
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
        backgroundColor: '#fcfcfc'
    },
    footer: {
        flex: 0.22,
        paddingVertical: 10,
        paddingHorizontal: 10,
        backgroundColor: '#ffffff',
        justifyContent: 'space-between',
        borderTopWidth: 2,
        borderColor: '#f5f5f5'
    },
    location: {
        height: '50%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderColor: '#f5f5f5',
        borderBottomWidth: 1,
    },
    paybtn: {
        backgroundColor: '#009c02',
        padding: 12,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 5
    },
    body: {
        flex: 1
    },
    listView: {
        width: '100%',
        height: 110,
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
