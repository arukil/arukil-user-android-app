import React from 'react'
import { View, Text } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Order from './order/component/index';
import Nearby from './nearby/component/index'
import History from './history/component/index';
import Account from './account/component/index';

import ProductList from './order/common/component/productList';
import Search from './order/common/component/search';
import Vegetable from './order/component/vegetable';
import Location from './order/region/component/Location';


const Tab = createMaterialBottomTabNavigator();

function BottomTabNavigator() {
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
            <Tab.Screen
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
            />
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




const Stack = createStackNavigator();

function StackNavigator() {
    return (

        <NavigationContainer>

            <Stack.Navigator screenOptions={{
                headerShown: true,

            }}>

                <Stack.Screen name='Index' component={BottomTabNavigator} options={{
                    title: false,
                    headerShown: false
                }}
                />


                <Stack.Screen name="Vegetable" component={Vegetable} options={{
                    headerShown: true,
                }}
                />

                <Stack.Screen name="ProductList" component={ProductList} options={{
                    headerTransparent: false,
                    headerTitleStyle: {
                        fontSize: 16,
                        fontWeight: '700',
                        color: '#5e5b54'
                    },
                    headerStyle: {
                        elevation: 0,
                    },
                }}
                />

                <Stack.Screen name="Search" component={Search} options={{
                    headerShown: false,
                }}
                />
                  <Stack.Screen name="Location" component={Location} options={{
                    headerShown: true,
                    headerTransparent: true,
                    title:false
                }}
                />




            </Stack.Navigator>
        </NavigationContainer>
    )
};



export default StackNavigator;






