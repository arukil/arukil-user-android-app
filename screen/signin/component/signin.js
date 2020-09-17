import React from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'

export default function Signin(props) {
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={require('../../assets/image/Splash.jpg')} resizeMode={'contain'}  style={{ width: '35%', height: '25%' }} />
            </View>
            <View style={styles.footer}>
                <Text style={styles.heading}>Order Groceries at your fingertips</Text>
                <TouchableOpacity style={styles.phonenumberContainer} onPress={() => props.navigation.navigate('Phonenumber')} activeOpacity={0.7}>
                    <Image source={require('../../assets/image/flag.png')} style={{ width: 35, height: 25, borderRadius: 4 }} />
                    <Text style={{ fontSize: 20, color: '#292929' }}>+91</Text>
                    <Text style={{ fontSize: 20, color: '#999' }}>Enter your mobile number</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7}>
                    <Text style={{ color: '#999', fontSize: 12, textAlign: 'center' }}>Before moving , please read our
                     <Text style={{ textDecorationLine: 'underline' }}> Terms{' & '}Conditions</Text>
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5f5f5'
    },
    header: {
        flex: 0.75,
        backgroundColor: '#e91e63',
        alignItems: 'center',
        justifyContent: 'center'
    },
    footer: {
        flex: 0.25,
        paddingVertical: 20,
        paddingHorizontal: 15,
        justifyContent: 'space-between'
    },
    heading: {
        fontSize: 22,
        color: '#292929',
    },
    phonenumberContainer: {
        padding: 5,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'

    }

})
