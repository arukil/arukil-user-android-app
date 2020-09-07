import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import BottomTabNavigator from './bottomTabNavigator';
import Topbar from '../order/grocery/topbar';
import Search from '../order/helper/search';
import GetLocation from '../region/component/getLocation';


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


                <Stack.Screen name="Search" component={Search} options={{
                    headerShown: false,
                }}
                />
                <Stack.Screen name="GetLocation" component={GetLocation} options={{
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






