import React from 'react';
import { TouchableOpacity, ScrollView, StyleSheet, Text, Dimensions, Image, ActivityIndicator, View } from 'react-native';
import Swiper from 'react-native-swiper'
import axios from 'axios'
import { offerImage, item } from './data'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const SCREEN_WIDTH = (Dimensions.get('window').width - 20) / 3.5;
const SCREEN_HEIGHT = (Dimensions.get('window').height / 5.8);

function Grocery(props) {

    const [isLoading, setIsLoading] = React.useState(true);

    React.useEffect(() => {
        setIsLoading(false);
    }, [])

    return (
        !isLoading ?
            <ScrollView style={styles.container}
                showsVerticalScrollIndicator={false}
            >
                <View style={{
                    flexDirection: 'row', alignItems: 'center',  justifyContent:'space-between' , height:60, width:'74%'
                }}>
                    <MaterialCommunityIcons name='moped' size={28} color={'#e91'} />
                    <Text style={{ fontSize: 16, color: '#999' }}>Delivery timing: 9 Am to 7 Pm </Text>
                </View>
                <View style={styles.sliderContainer}>
                    <Swiper
                        activeDotColor={'#e91e63'}
                        autoplay={true}
                        dotStyle={{ width: 5, height: 5, top: 20 }}
                        activeDotStyle={{ width: 5, height: 5, top: 20 }}>
                        {offerImage.map((image, index) =>
                            <View style={styles.slide} key={index}>
                                <Image
                                    source={{ uri: image }}
                                    resizeMode="cover"
                                    style={styles.sliderImage}
                                />
                            </View>
                        )}
                    </Swiper>
                </View>

                <View style={styles.title}>
                    <Text style={styles.primaryTitle}>Categories</Text>
                    <Text style={styles.secondaryTitle}>Browse products by categories</Text>
                </View>

                <View style={styles.body}>{
                    item.map((res, index) =>
                        <TouchableOpacity activeOpacity={0.7} style={[styles.card, { marginLeft: (index % 3) === 0 ? 0 : 15 }]} onPress={() =>
                            props.navigation.navigate(res.route, {
                                item: res
                            })
                        } key={res.name}>
                            <Image source={{ uri: res.image }} resizeMode='contain' style={styles.image} />
                            <Text style={styles.name} numberOfLines={2} >{res.name} </Text>
                        </TouchableOpacity >
                    )}
                </View>
            </ScrollView>
            :
            <ActivityIndicator size="large" color="#e91e63" style={styles.loader} />

    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    sliderContainer: {
        width: '100%',
        height: 148,
        justifyContent: 'center',
        alignSelf: 'center',
    },
    slide: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'transparent',
        borderRadius: 5,
    },
    sliderImage: {
        height: '100%',
        width: '100%',
        alignSelf: 'center',
        borderRadius: 5,
    },
    loader: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: '#ffffff',
    },
    title: {
        marginTop: 6,
        padding: 10,
    },
    primaryTitle: {
        color: '#4f4f4f',
        fontSize: 17,
        fontWeight: '700'
    },
    secondaryTitle: {
        color: '#999',
        fontSize: 12
    },
    body: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
    },
    card: {
        width: SCREEN_WIDTH,
        height: SCREEN_HEIGHT,
        justifyContent: 'space-around',
        backgroundColor: '#fafdff',
        borderColor: '#c7ebfc',
        alignItems: 'center',
        borderColor: '#ddd',
        borderWidth: 0.4,
        marginTop: 10,
        borderRadius: 5,
    },
    image: {
        height: '60%',
        aspectRatio: 1
    },
    name: {
        fontSize: 12,
        textAlign: 'center',
        color: '#646769',
        fontWeight: '700'
    },

});

export default Grocery;












    // await axios.get('https://arukil.herokuapp.com/api/products/grocery')
        //     .then(response => {
        //         const res = response.data.data;
        //         return this.setState({
        //             list: res,
        //             isLoading: false
        //         });
        //     }).catch(error => {
        //         console.log(error)
        //     })




// class Grocery extends React.Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             isLoading: true,
//             list: [],
//         };
//     }


//     async componentDidMount() {

//         return this.setState({
//             list: mainpage,
//             isLoading: false
//         });
//     }



//     renderItem = ({ item }) => {
//         return (
//             <TouchableOpacity activeOpacity={0.7} style={styles.card} onPress={() =>
//                 this.props.navigation.navigate(item.route, {
//                     item: item
//                 })
//             }>
//                 <View style={styles.innerCard}>
//                     <Image source={{ uri: item.image }} resizeMode='contain' style={styles.listImage} />
//                     <Text style={styles.listName} numberOfLines={2} >{item.name} </Text>
//                 </View>

//             </TouchableOpacity >
//         )
//     }


//     render() {

//         const slider = offerImage.map((image, index) =>
//             <View style={styles.slide} key={index}>
//                 <Image
//                     source={{ uri: image }}
//                     resizeMode="cover"
//                     style={styles.sliderImage}
//                 />
//             </View>
//         )

//         return (
//             !this.state.isLoading ?
//                 <View style={styles.container} >
//                     <View style={styles.sliderContainer}>
//                         <Swiper
//                             activeDotColor={'#e91e63'}
//                             autoplay={true}
//                             dotStyle={{ width: 5, height: 5, top: 20 }}
//                             activeDotStyle={{ width: 5, height: 5, top: 20 }}>
//                             {slider}
//                         </Swiper>
//                     </View>
//                     <FlatList
//                         style={styles.body}
//                         data={this.state.list}
//                         renderItem={this.renderItem}
//                         keyExtractor={(item, index) => index.toString()}
//                         showsVerticalScrollIndicator={false}
//                         numColumns={3}
//                     />
//                 </View>
//                 :
//                 <View style={styles.loader}>
//                     <ActivityIndicator size="large" color="#e91e63" />
//                 </View>
//         );
//     }
// }