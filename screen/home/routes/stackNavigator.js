import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './bottomTabNavigator';
import Topbar from '../order/grocery/component/topbar';
import Singlebar from '../order/grocery/component/singlebar';
import Search from '../order/helper/search';
import GetLocation from '../region/component/getLocation';
import Map from '../region/component/map';
import Cart from '../order/cart/index';

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


                <Stack.Screen name="Topbar" component={Topbar} options={{
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

                <Stack.Screen name="Singlebar" component={Singlebar} options={{
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
                    headerShown: true,
                    title:false,
                    headerStyle: {
                        elevation: 0,
                    },
                }}
                />
                <Stack.Screen name="Cart" component={Cart} options={{
                    headerShown: true,
                    title:'Confirm order',
                    headerTitleStyle: {
                        fontSize: 15,
                        fontWeight: '700',
                        color: '#5e5b54',
                    },
                    headerStyle: {
                        elevation: 0,
                        borderBottomWidth:0.3

                    },

                }}
                />
                <Stack.Screen name="GetLocation" component={GetLocation} options={{
                    headerShown: true,
                    title:false,
                    headerStyle: {
                        elevation: 0,
                    },
                }}
                />
                <Stack.Screen name="Map" component={Map} options={{
                    headerShown: true,
                    headerTransparent: true,
                    title: false
                }}
                />




            </Stack.Navigator>
        </NavigationContainer>
    )
};



export default StackNavigator;






