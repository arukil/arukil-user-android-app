import React from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleApiKey from '../../../../config';
import Geocoder from 'react-native-geocoding';
import AsyncStorage from '@react-native-community/async-storage';
import { connect } from 'react-redux'
import Map from './map'


function Location(props) {

    const [address, setAddress] = React.useState('');
    const [predictions, setPredictions] = React.useState([]);
    const [mapVisible, setMapVisible] = React.useState(false);
    const [mapData, setMapData] = React.useState({
        latitude: 0,
        longitude: 0,
    });

    const suggestion = async (address) => {

        const apiUrl = `https://maps.googleapis.com/maps/api/place/autocomplete/json?key=${GoogleApiKey}
        &input=${address}&location=${props.currentLatLng.latitude},${props.currentLatLng.longitude}&radius=5000`;
        try {
            const result = await fetch(apiUrl);
            const json = await result.json();
            setPredictions(json.predictions);
            return;
        }
        catch (err) {
            console.error(err);
        }
    }

    const geocoder = async (params) => {
        await Geocoder.init(GoogleApiKey)
        await Geocoder.from(params).then(
            response => {
                const { lat, lng } = response.results[0].geometry.location;
                setMapData({ latitude: lat, longitude: lng });
                return setMapVisible(true);
            },
            error => {console.error(error);}
        );
    }


    const mapHandler = (params) => {
        return Object.keys(params).length > 0 ? geocoder(params.description):setMapVisible(true);
    }



    React.useEffect(() => {
        address.length >= 3 ? suggestion(address) : null;
    }, [address])


    const prediction = predictions.map(prediction =>
        <TouchableOpacity activeOpacity={0.7} onPress={() => mapHandler(prediction)}
            style={styles.suggestions} key={prediction.id}>
            <MaterialCommunityIcons name="map-marker" size={20} color="#999" />
            <View style={styles.predictionsContent}>
                <Text style={styles.predictionMainText} numberOfLines={1}>
                    {prediction.structured_formatting.main_text}</Text>
                {prediction.structured_formatting.secondary_text != null ?
                    <Text style={styles.predictionSecondaryText} numberOfLines={1}>
                        {prediction.structured_formatting.secondary_text}</Text>
                    : null}
            </View>
        </TouchableOpacity>
    );

    return (
        !mapVisible ?
            <View style={styles.container}>
                <TouchableOpacity activeOpacity={0.7} onPress={() => props.HandleParentFunc(false)}>
                    <MaterialCommunityIcons name='close' size={22} />
                </TouchableOpacity>

                <View style={styles.search} activeOpacity={0.7}>
                    <MaterialCommunityIcons name='magnify' size={20} style={styles.searchIcon} />
                    <TextInput placeholder='search for your loctaion...' style={styles.InputField}
                        onChangeText={(text) => setAddress(text)}
                        value={address}
                    />
                    {address.length > 0 ?
                        <TouchableOpacity activeOpacity={0.7} onPress={() => setAddress('')}>
                            <MaterialCommunityIcons name='close' size={20} style={styles.searchIcon} />
                        </TouchableOpacity>
                        : null}
                </View>
                <View style={styles.body}>
                    <TouchableOpacity style={styles.currentLocation} onPress={() => mapHandler({})}>
                        <MaterialCommunityIcons name='crosshairs-gps' size={20} color='#e91e63' />
                        <Text style={styles.currentLocationText}>use current Location</Text>
                    </TouchableOpacity>
                    {address.length >= 3 ? prediction :
                        <View style={styles.savedLocation}>

                        </View>
                    }
                </View>
            </View>

            : <Map data={mapData}  HandleParentFunc={props.HandleParentFunc} />

    )
}


export default connect()(Location);

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fcfcfc',
        paddingHorizontal: 10,
        paddingVertical: 15,
    },
    search: {
        marginTop: 10,
        borderWidth: 0.35,
        borderColor: '#999',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-evenly',
        borderRadius: 5,
    },
    searchIcon: {
        color: '#999',
    },
    InputField: {
        width: '80%',
    },
    body: {
        flex: 1,
    },
    suggestions: {
        width: '95%',
        flexDirection: 'row',
        alignItems: 'center',
    },
    predictionsContent: {
        padding: 15,
    },
    predictionSecondaryText: {
        color: '#999',
        marginTop: 2
    },
    currentLocation: {
        flexDirection: 'row',
        width: '60%',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
    },
    currentLocationText: {
        color: '#e91e63',
        padding: 10,
        fontSize: 18,
    },
    savedLocation: {

    }
})













// import React from 'react';
// import { StyleSheet, Text, View, TextInput, ScrollView } from 'react-native';
// import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

// const Tab = createMaterialTopTabNavigator();

// function Feed()
// {
//     return <Text>surya</Text>
// }

// function Notifications()
// {
//     return <Text>surya</Text>
// }

// function Profile()
// {
//     return <Text>surya</Text>
// }

// function Profil()
// {
//     return <Text>surya</Text>
// }

// function Profie()
// {
//     return <Text>surya</Text>
// }

// export default function MyTabs() {
//   return (


//     <Tab.Navigator 
//       initialRouteName="Feed"
//       tabBarOptions={{
//         activeTintColor: '#e91e63',
//         labelStyle: { fontSize: 12 },
//         style: { backgroundColor: 'powderblue' },
//       }}
//     >
//       <Tab.Screen
//        style={{width:10}}
//         name="Feed"
//         component={Feed}
//         options={{ tabBarLabel: 'Home' }}
//       />
//       <Tab.Screen
//         name="Notifications"
//         component={Notifications}
//         options={{ tabBarLabel: 'Updates' }}
//       />
//       <Tab.Screen
//         name="Profile"
//         component={Profile}
//         options={{ tabBarLabel: 'Profile' }}
//       />
//       <Tab.Screen
//         name="Profil"
//         component={Profil}
//         options={{ tabBarLabel: 'Profile' }}
//       />
//       <Tab.Screen
//         name="Profie"
//         component={Profie}
//         options={{ tabBarLabel: 'Profile' }}
//       />
//     </Tab.Navigator>

//   );
// }