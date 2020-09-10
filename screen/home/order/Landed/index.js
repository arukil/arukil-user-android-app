import React from 'react'
import { Text, View, TouchableOpacity, SafeAreaView, PermissionsAndroid } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleApiKey from '../../../config';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import TopTapNavigator from '../../routes/topTapNavigator';
import styles from './style';
import { connect } from 'react-redux'


const Index = (props) => {


    React.useEffect(() => {
        Object.keys(props.location).length > 0 && Object.keys(props.userLocation).length === 0 ?
            props.USER_CURRENT_LOCATION(props.location) : null;
    }, [props.location]);


    const geocoder = async (latitude, longitude) => {
        await Geocoder.init(GoogleApiKey)
        await Geocoder.from(latitude, longitude)
            .then(json => {
                var addressComponent = json.results[0];
                props.GET_LOCATION(addressComponent)
                return;
            })
            .catch(error => console.log(error));
    }

    const _getLocation = async () => {
        const chckLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission) {
            await Geolocation.getCurrentPosition(pos => { return geocoder(pos.coords.latitude, pos.coords.longitude) },
                err => { alert("Fetching the Position failed, please check location is enable!"); },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 1000 }
            );
        }
        else {
            const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': ' Arukil App required Location permission',
                    'message': 'We required Location permission in order to get device location ' +
                        'Please grant us.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                return getLocation();
            } else {
                alert("You don't have access for the location");
            }
        }
    }

    React.useEffect(() => {
        _getLocation();
    }, []);



    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity activeOpacity={0.7} style={styles.location} onPress={() =>
                    props.navigation.navigate('GetLocation')
                }>
                    <MaterialCommunityIcons name='map-marker' color={'#e91e63'} size={30} />
                    <View style={styles.locationTextContainer}>
                        {Object.keys(props.location).length > 0 ?
                            <>
                                <Text style={styles.primaryLocationText} numberOfLines={1}>{props.location.address_components[0].short_name}</Text>
                                <Text style={styles.SecondaryLocationText} numberOfLines={1}>{props.location.formatted_address}</Text>
                            </>
                            : <Text style={{ fontSize: 18, color: '#4f4f4f' }}>Loading...</Text>
                        }
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={1} style={styles.search} onPress={() => props.navigation.navigate('Search')}>
                    <MaterialCommunityIcons name='magnify' color={'#999'} size={25} />
                </TouchableOpacity>
            </View>

            <View style={styles.body}>
                <TopTapNavigator />
            </View>
        </SafeAreaView>

    )
}


const mapStateToProps = (state) => {
    return {
        location: state.locationReducer.location,
        userLocation: state.userLocationReducer.userLocation

    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        GET_LOCATION: (data) => {
            dispatch({ type: 'GET_LOCATION', data })
        },
        USER_CURRENT_LOCATION: (data) => {
            dispatch({ type: 'USER_CURRENT_LOCATION', data })
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Index);














// import React from 'react'
// import { Text, View, TouchableOpacity, SafeAreaView, PermissionsAndroid } from 'react-native'
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import GoogleApiKey from '../../../config';
// import Geolocation from 'react-native-geolocation-service';
// import Geocoder from 'react-native-geocoding';
// import TopTapNavigator from '../../routes/topTapNavigator';
// import styles from './style';
// import { connect } from 'react-redux'


// function Index(props) {

//     const [location, setLocation] = React.useState({
//         shortname: '',
//         longname: ' ',
//         latitude: 0,
//         longitude: 0
//     });
//     const [currentLatLng, setCurrentLatLng] = React.useState({
//         latitude: 0,
//         longitude: 0,
//     });


//     React.useEffect(() => {
//         if (Object.keys(props.data).length !== 0) {
//             setLocation({
//                 shortname: props.data.address_components[0].short_name,
//                 longname: props.data.formatted_address,
//                 latitude: props.data.geometry.location.lat,
//                 longitude: props.data.geometry.location.lng,
//             });
//         }
//     }, [props.data]);



//     const geocoder = async (latitude, longitude) => {
//         await Geocoder.init(GoogleApiKey)
//         await Geocoder.from(latitude, longitude)
//             .then(json => {
//                 var addressComponent = json.results[0];
//                 props.CURRENT_LOCATION(addressComponent)
//                 return;
//             })
//             .catch(error => console.log(error));
//     }



//     const getLocation = async () => {
//         const chckLocationPermission = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
//         if (chckLocationPermission) {
//             Geolocation.getCurrentPosition(pos => {
//                 const coords = {
//                     latitude: pos.coords.latitude,
//                     longitude: pos.coords.longitude
//                 }
//                 setCurrentLatLng({
//                     latitude: coords.latitude,
//                     longitude: coords.longitude
//                 });
//                 return geocoder(coords.latitude, coords.longitude);
//             },
//                 err => {
//                     alert("Fetching the Position failed, please check location is enable!");
//                 },
//                 { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
//             );  
//         }
//         else {
//             const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//                 {
//                     'title': ' Arukil App required Location permission',
//                     'message': 'We required Location permission in order to get device location ' +
//                         'Please grant us.'
//                 }
//             )
//             if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//                 return getLocation();
//             } else {
//                 alert("You don't have access for the location");
//             }
//         }
//     }

//     React.useEffect(() => {
//         getLocation();
//     }, []);



//     return (

//         <SafeAreaView style={styles.container}>
//             <View style={styles.header}>
//                 <TouchableOpacity activeOpacity={0.7} style={styles.location} onPress={() => 
//                         props.navigation.navigate('GetLocation' ,{
//                             location:location,
//                             currentLatLng:currentLatLng
//                         })

//                  }>
//                     <MaterialCommunityIcons name='map-marker' color={'#e91e63'} size={30} />
//                     <View style={styles.locationTextContainer}>
//                         <Text style={styles.primaryLocationText} numberOfLines={1}>{location.shortname}</Text>
//                         <Text style={styles.SecondaryLocationText} numberOfLines={1}>{location.longname}</Text>
//                     </View>
//                 </TouchableOpacity>
//                 <TouchableOpacity activeOpacity={1} style={styles.search}  onPress={()=>props.navigation.navigate('Search')}>
//                     <MaterialCommunityIcons name='magnify' color={'#999'} size={25} />
//                 </TouchableOpacity>
//             </View>

//             <View style={styles.body}>
//                 <TopTapNavigator navigation={props.navigation} />
//             </View>
//         </SafeAreaView>

//     )
// }


// const mapStateToProps = (state) => {
//     return {
//         data: state.locationReducer.location
//     }
// }

// const mapDispatchToProps = (dispatch) => {
//     return {
//         CURRENT_LOCATION: (data) => {
//             dispatch({ type: 'CURRENT_LOCATION', data })
//         }
//     };
// }


// export default connect(mapStateToProps, mapDispatchToProps)(Index);