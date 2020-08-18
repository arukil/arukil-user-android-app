import React from 'react'
import { StyleSheet, Text, View ,Image} from 'react-native'

export default function Index() {
    return (
        <View style={{flex:1 ,justifyContent:'center',alignItems:"center" ,backgroundColor:'#ffffff'}}>
           <Image source={require('../../../assets/image/comingsoon-min.jpg')} style={{width:'90%',height:'50%'}}/>
        </View>
    )
}

const styles = StyleSheet.create({})
