import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import { connect } from 'react-redux';
import Recyclerview from './recyclerview';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

function Index(props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <View style={styles.location}>
                    <TouchableOpacity activeOpacity={1} onPress={() => props.navigation.pop()}
                        style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', width: '65%' }}>
                        <MaterialCommunityIcons name='arrow-left' size={22} color={'#4f4f4f'}/>
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
                <Recyclerview />
            </View>
        </View>
    )
}



const mapStateToProps = (state) => {
    return {
        location: state.locationReducer.location
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        CURRENT_LOCATION: (data) => {
            dispatch({ type: 'CURRENT_LOCATION', data })
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
    }
})
