import React, { useState } from 'react';
import { Text, View, TouchableOpacity, Alert, StyleSheet, ActivityIndicator } from 'react-native';
import OTPInputView from '@twotalltotems/react-native-otp-input'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { Button, Overlay } from 'react-native-elements';
import axios from 'axios'
const Verify = (props) => {

    const [code, setCode] = useState(0);
    const [visible, setVisible] = useState(false);


    const onSubmit = async (code) => {

        if (isNaN(code) || code.length != 4) {
            Alert.alert('Enter valid otp');
        }
        else {
            setVisible(true)
            try {
                const data = {
                    url: 'https://arukil.herokuapp.com/api/users/phonenumber/verify',
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json;charset=UTF-8'
                    },
                    data: {
                        phonenumber: props.route.params.phonenumber,
                        code: code,
                    }
                };
                let response = await axios(data);
                let res =await response.data;
                console.log(res)
                if (res.status) {
                    setVisible(false)
                    // return props.navigation.navigate('Verify', {
                    //     phonenumber: phonenumber,
                    // });
                    console.log(res)
                }
                else {
                    setVisible(false)
                    return Alert.alert(
                        'Otp is invaild '
                    );
                }
            } catch (error) {
                console.error(error);
            }
        }

    }



    return (

        <View style={styles.container}>
            <View style={styles.body}>

                <View style={styles.header}>
                    <Text style={styles.title}>Please enter the 4-digit code sent to you </Text>
                    <OTPInputView
                        style={{ width: '70%', height: 40 }}
                        pinCount={4}
                        autoFocusOnLoad={true}
                        keyboardType='number-pad'
                        codeInputFieldStyle={styles.codeInputFieldStyle}
                        codeInputHighlightStyle={{ borderColor: "#000", backgroundColor: '#fff' }}
                        onCodeFilled={(code) => onSubmit(code)}
                        onCodeChanged={code => setCode(code)}
                    />
                </View>
            </View>

            <View style={styles.footer}>
                <TouchableOpacity activeOpacity={0.8} >
                    <Text style={styles.resend}>I didn't receive a code</Text>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} onPress={() => onSubmit(code)} style={styles.button}>
                    <MaterialCommunityIcons name={'arrow-right'} size={25} color={'#fff'} />
                </TouchableOpacity>
            </View>
            <Overlay isVisible={visible}>
                <ActivityIndicator size={'large'} color='#e91e63' />
            </Overlay>
        </View>

    );
}

export default Verify



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#ffffff',
        paddingHorizontal: 15,

    },
    header: {
        flex: 0.5,
        justifyContent: 'space-between',
    },
    body: {
        flex: 0.4,
        justifyContent: 'space-between',
    },
    title: {
        color: '#000',
        fontSize: 20,
    },
    footer: {
        flex: 0.1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    codeInputFieldStyle: {
        fontSize: 18,
        width: 40,
        height: 40,
        color: '#000',
    },
    resend: {
        color: '#2e69d9',
        fontSize: 16,
        width: '100%'
    },
    button: {

        width: 60,
        height: 60,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',

    },
})

