import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Counter from "react-native-counters";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function cart() {
    const [state, setstate] = React.useState(true)


     function btnHandler(val)
      {
         return  val===0 ?setstate(true):null;
      }

    return (
        state ?
            <TouchableOpacity style={styles.button} activeOpacity={0.7} onPress={() => setstate(false)}>
                <MaterialCommunityIcons name='plus' color={'#e91e63'} />
                <Text style={{ fontSize: 10, color: '#e91e63' }}>ADD</Text>
            </TouchableOpacity>
            :
            <Counter
                min={0}
                onChange={(val)=>btnHandler(val)}
                start={1}
            />
    )
}

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
        elevation: 1
    },
})
