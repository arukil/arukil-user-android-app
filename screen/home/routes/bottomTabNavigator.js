import React from 'react'
import { View, Text } from 'react-native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Order from '../order/Landed/index';
import Nearby from '../nearby/component/index'
import History from '../history/component/index';
import Account from '../account/component/index';

const Tab = createMaterialBottomTabNavigator();

export default function BottomTabNavigator() {
    return (
        <Tab.Navigator
            initialRouteName="Order"
            activeColor="#e91e63"
            shifting={true}
        >
            <Tab.Screen
                name="Order"
                component={Order}
                options={{
                    tabBarLabel: 'Order',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="shopping-outline" color={focused ? color : '#999'} size={26} />
                    ),
                }}
            />
            {/* <Tab.Screen
                name="Nearby"
                component={Nearby}
                options={{
                    tabBarLabel: 'nearby',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="map-marker-circle" color={focused ? color : '#999'} size={26} />
                    ),
                }}
            />
            <Tab.Screen
                name="History"
                component={History}
                options={{
                    tabBarLabel: 'History',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="history" color={focused ? color : '#999'} size={26} />
                    ),
                }}
            /> */}
            <Tab.Screen
                name="Account"
                component={Account}
                options={{
                    tabBarLabel: 'Account',
                    tabBarColor: '#fff',
                    tabBarIcon: ({ color, focused }) => (
                        <MaterialCommunityIcons name="account-circle" color={focused ? color : '#999'} size={26} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}







