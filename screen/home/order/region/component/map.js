import React from 'react'
import { View, Text, TouchableOpacity, Image, Dimensions, StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import Geocoder from 'react-native-geocoding';
import GoogleApiKey from '../../../../config';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux'
import Geolocation from 'react-native-geolocation-service';



let { width, height } = Dimensions.get('window');
const ASPECT_RATIO = width / (2 * (height / 3));
const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const Map = (props) => {

    let map = null;

    const [initialregion, setInitialRegion] = React.useState({
        latitude: props.data.latitude,
        longitude: props.data.longitude,
        latitudeDelta: LATITUDE_DELTA,
        longitudeDelta: LONGITUDE_DELTA,
    })


    const [address, setAddress] = React.useState({})

    const geocoder = async (latitude, longitude) => {
        await Geocoder.init(GoogleApiKey)
        await Geocoder.from(latitude, longitude)
            .then(json => {
                var addressComponent = json.results[0];
                setAddress(addressComponent)
                return;
            })
            .catch(error => console.log(error));
    }


    const gotToMyLocation = () => {

        Geolocation.getCurrentPosition(pos => {
            map ?
                map.animateToRegion({
                    latitude: pos.coords.latitude, longitude: pos.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA
                })
                :
                setInitialRegion({
                    latitude: pos.coords.latitude, longitude: pos.coords.longitude,
                    latitudeDelta: LATITUDE_DELTA, longitudeDelta: LONGITUDE_DELTA
                })
            return;
        },
            err => {
                alert("Fetching the Position failed, please check location is enable!");
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );

    }


    React.useEffect(() => {
        props.data.latitude === 0 && props.data.longitude === 0 ? gotToMyLocation() : null;
    }, [])


    const location_redux_update = () => {
        props.CURRENT_LOCATION(address)
        return props.nav.pop();
    }

    return (
        <View style={styles.container}>
            <View style={{ flex: 5 }}>
                {initialregion.latitude > 0 && initialregion.longitude > 0 ?
                    <MapView style={{ flex: 1 }}
                        provider={PROVIDER_GOOGLE}
                        ref={(val) => { map = val; }}
                        initialRegion={initialregion}
                        showsMyLocationButton={false}
                        loadingEnabled={true}
                        showsUserLocation={true}
                        showsCompass={false}
                        onRegionChangeComplete={(marker) => geocoder(marker.latitude, marker.longitude)}
                    >
                    </MapView> : null}
              
                <Image source={require('../../../../assets/image/mapmarker.png')} style={styles.marker} />
                <TouchableOpacity style={styles.locationButton} activeOpacity={0.7} onPress={() => gotToMyLocation()}>
                    <MaterialCommunityIcons name='crosshairs-gps' size={20} style={styles.locationButtonIcon} />
                </TouchableOpacity>

            </View>
            <View style={styles.body}>

                <TouchableOpacity style={styles.input}>
                    <View style={styles.inputContainer}>
                        <MaterialCommunityIcons name='map-marker' size={35} color={'#e91e63'} />
                        <Text numberOfLines={2} style={styles.inputText}>{address.formatted_address}</Text>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.7} style={styles.button} onPress={() => location_redux_update()}>
                    <MaterialCommunityIcons name='arrow-right' size={25} color={'#fff'} />
                </TouchableOpacity>
            </View>
        </View >

    )
}



const mapDispatchToProps = (dispatch) => {
    return {
        CURRENT_LOCATION: (data) => {
            dispatch({ type: 'CURRENT_LOCATION', data })
        }
    };
}

export default connect(null, mapDispatchToProps)(Map);


const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#fcfcfc'
    },
    body: {
        flex: 1,
        paddingHorizontal: 5,
        backgroundColor: '#fff',
        justifyContent: 'center',
        flexDirection: 'row',
        alignItems: 'center'
    },
    title: {
        fontSize: 18,
    },
    input: {

        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputContainer: {
        width: '80%',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    inputText: {
        fontSize: 15,
        color: "#827e7e",
        fontWeight: '600'
    },
    locationButton: {
        alignItems: 'center',
        justifyContent: 'center',
        position: 'absolute',
        backgroundColor: "#fff",
        bottom: '10%',
        right: 20,
        borderRadius: 10,
        elevation: 15,

    },
    locationButtonIcon: {
        padding: 10,
        color: "#505451"
    },
    button: {
        width: 60,
        height: 60,
        borderRadius: 50,
        backgroundColor: '#000',
        alignItems: 'center',
        justifyContent: 'center',
        elevation: 15
    },
    buttonText: {
        color: '#fff',
        fontSize: 15,
    },
    marker: {
        width: 30,
        height: 40,
        position: 'absolute',
        top: '43.5%',
        left: '45.8%'
    },
    backButton: {
        position: 'absolute', top: 5, padding: 10
    }
})
