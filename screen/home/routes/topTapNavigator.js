import React from 'react'
import Grocery from '../order/grocery/index';
import Vegetable from '../order/vegetable/index';
import Fruit from '../order/fruit/index';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

function MyTabs() {
    return (
        <Tab.Navigator
            initialRouteName="Grocery"
            tabBarOptions={{
                activeTintColor: '#e91e63',
                labelStyle: { fontSize: 15 },
                style: { backgroundColor: '#fff', elevation: 0, height: 45 },
                indicatorStyle: {
                    borderBottomWidth: 2,
                    borderColor: '#e91e63',
                },
            }}
        >
            <Tab.Screen
                name="Grocery"
                component={Grocery}
                options={{ tabBarLabel: 'Grocery', }}
                indicatorStyle={{ color: '#e91e63' }}

            />
            <Tab.Screen
                name="Vegetable"
                component={Vegetable}
                options={{ tabBarLabel: 'Vegetable' }}
            />
            <Tab.Screen
                name="Fruit"
                component={Fruit}
                options={{ tabBarLabel: 'Fruit' }}
            />
        </Tab.Navigator>
    );
}


export default MyTabs











// import React from 'react'
// import { StyleSheet,Text, View, ScrollView, TouchableOpacity, Dimensions } from 'react-native'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Grocery from './grocery';
// import Vegetable from './vegetable';
// import Fruit from './fruit';

// const selectedColor = '#e91e63';
// const unSelectedColor = '#999';

// export default function TopBar(props) {

//     const [section, setSection] = React.useState('Grocery');

//     const selectionHandler = () => {

//         if (section === 'Grocery') {
//             return <Grocery navigation={props.navigation} />
//         }
//         else if (section === 'Vegetable') {
//             return <Vegetable/>
//         }
//         else if (section === 'Fruit') {
//             return <Fruit />
//         }
//     }

//     const TopBar = ['Grocery', 'Vegetable', 'Fruit'].map((type, index) => {
//         return <TouchableOpacity activeOpacity={0.7} style={styles.topBar}
//             onPress={() => setSection(type)} key={index}>
//             <Text style={[styles.text, { color: section === type ? selectedColor : unSelectedColor }]}>
//                 {type}</Text>
//         </TouchableOpacity>
//     });


//     return (
//         <View style={styles.container}>
//             <View style={styles.header}>
//                 <ScrollView horizontal={true} style={styles.scrollView}>{TopBar}</ScrollView>
//             </View>
//             <View style={styles.body}>
//                 {selectionHandler()}
//            </View>
//         </View>
//     )
// }



// const width = Dimensions.get('window').width/16;

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//     },
//     header: {
//         flexDirection: 'row',
//     },
//     text: {
//         fontSize: 18,
//     },
//     body: {
//         flex: 1,
//         marginTop:5
//     },
//     topBar:{
//         paddingTop:14,
//         paddingRight:width,
//         paddingBottom:10,

//     },
// })

