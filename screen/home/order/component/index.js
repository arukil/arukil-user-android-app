import React from 'react'
import { Text, View, TouchableOpacity, StatusBar ,PermissionsAndroid} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import GoogleApiKey from '../../../config';
import Geolocation from 'react-native-geolocation-service';
import Geocoder from 'react-native-geocoding';
import TopBar from './TopBar';
import styles from '../style/index';
import { connect } from 'react-redux'
import Modal from 'react-native-modal';
import Region from '../region/component/Location'
import { ScrollView } from 'react-native-gesture-handler';

function Index(props) {

    const [location, setLocation] = React.useState({
        shortname: '',
        longname: ' ',
        latitude: 0,
        longitude: 0
    });
    const [currentLatLng, setCurrentLatLng] = React.useState({
        latitude: 0,
        longitude: 0,
    });
    const [modalVisible, setModalVisible] = React.useState(false);

    React.useEffect(() => {
        if (Object.keys(props.data).length !== 0) {
            setLocation({
                shortname: props.data.address_components[0].short_name,
                longname: props.data.formatted_address,
                latitude: props.data.geometry.location.lat,
                longitude: props.data.geometry.location.lng,
            });
        }
    }, [props.data]);


    const modalVisibleHandler = (value) => {
        return value === false ? setModalVisible(value) : null
    }

    const geocoder = async (latitude, longitude) => {
        await Geocoder.init(GoogleApiKey)
        await Geocoder.from(latitude, longitude)
            .then(json => {
                var addressComponent = json.results[0];
                props.CURRENT_LOCATION(addressComponent)
                return;
            })
            .catch(error => console.log(error));
    }


    const getLocation=async()=>{
        const chckLocationPermission =await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
        if (chckLocationPermission){
        Geolocation.getCurrentPosition(pos => {
            const coords = {
                latitude: pos.coords.latitude,
                longitude: pos.coords.longitude
            }
            setCurrentLatLng({
                latitude: coords.latitude,
                longitude: coords.longitude
            });
            return geocoder(coords.latitude, coords.longitude);
        },
            err => {
                alert("Fetching the Position failed, please check location is enable!");
            },
            { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
        );
        }
        else{
            const granted =await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                {
                    'title': ' Arukil App required Location permission',
                    'message': 'We required Location permission in order to get device location ' +
                        'Please grant us.'
                }
            )
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                alert("You've access for the location");
            } else {
                alert("You don't have access for the location");
            }
        }
    }

    React.useEffect(() => {
        
         getLocation();
        
    }, []);

    const modalPopup = <Modal isVisible={modalVisible} onBackButtonPress={() => setModalVisible(false)}
        onBackdropPress={() => setModalVisible(false)} animationOutTiming={500} style={styles.bottomModal}>
        <View style={styles.modal} >
            <Region data={location} currentLatLng={currentLatLng} HandleParentFunc={modalVisibleHandler} />
        </View>
    </Modal>

    return (

        <View style={styles.container}>
            <View style={styles.header}>
                    <TouchableOpacity activeOpacity={0.7} style={styles.location} onPress={() => setModalVisible(true)}>
                        <MaterialCommunityIcons name='map-marker' color={'#e91e63'} size={30} />
                        <View style={styles.locationTextContainer}>
                            <Text style={styles.primaryLocationText} numberOfLines={1}>{location.shortname}</Text>
                            <Text style={styles.SecondaryLocationText} numberOfLines={1}>{location.longname}</Text>
                        </View>
                    </TouchableOpacity>
                    <TouchableOpacity activeOpacity={0.7} style={styles.offer} >
                        <MaterialCommunityIcons name='sale' color={'green'} size={20} />
                        <Text style={styles.offerText}>Offer</Text>
                    </TouchableOpacity>
            </View>
            
            <View style={styles.body}>
                <TouchableOpacity style={styles.searchBar} activeOpacity={0.7} onPress={() => props.navigation.navigate('Search')}>
                    <MaterialCommunityIcons name='magnify' size={18} />
                    <Text style={styles.searchBarText}>Search...</Text>
                </TouchableOpacity>
                <View style={styles.listView}>
                    <TopBar nav={props.navigation} />
                </View>
            </View>
            {modalVisible ? modalPopup : null}

        </View>
    )
}


const mapStateToProps = (state) => {
    return {
        data: state.locationReducer.location
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        CURRENT_LOCATION: (data) => {
            dispatch({ type: 'CURRENT_LOCATION', data })
        }
    };
}


export default connect(mapStateToProps, mapDispatchToProps)(Index);