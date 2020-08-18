import React from 'react'
import { Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
import Grocery from './grocery';
import Vegetable from './vegetable';
import Bakery from './bakery';
import Fruit from './fruit';
import Meat from './meat';
import styles from '../style/topBar';

const selectedColor = '#e91e63';
const unSelectedColor = '#999';

export default function TopBar(props) {

    const [section, setSection] = React.useState('Grocery');

    const selectionHandler = () => {

        if (section === 'Grocery') {
            return <Grocery nav={props.nav} />
        }
        else if (section === 'Vegetable') {
            return <Vegetable />
        }
        else if (section === 'Bakery') {
            return <Bakery />
        }
        else if (section === 'Meat') {
            return <Meat />
        }
        else if (section === 'Fruit') {
            return <Fruit />
        }
    }

    const TopBar = ['Grocery', 'Vegetable', 'Bakery', 'Meat', 'Fruit'].map((type, index) => {
        return <TouchableOpacity activeOpacity={0.7} style={styles.topBar}
            onPress={() => setSection(type)} key={index}>
            <Text style={[styles.text, { color: section === type ? selectedColor : unSelectedColor }]}>
                {type}</Text>
        </TouchableOpacity>
    });


    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <ScrollView horizontal={true} style={styles.scrollView}>{TopBar}</ScrollView>
            </View>
            <View style={styles.body}>{selectionHandler()}</View>
        </View>
    )
}
